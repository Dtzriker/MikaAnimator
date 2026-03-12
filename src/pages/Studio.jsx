import React, { useState, useEffect, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';
import Toolbar from '../components/studio/Toolbar';
import Canvas from '../components/studio/Canvas';
import Timeline from '../components/studio/Timeline';
import ObjectPanel from '../components/studio/ObjectPanel';
import PropertiesPanel from '../components/studio/PropertiesPanel';
import TemplateModal from '../components/studio/TemplateModal';
import ExportModal from '../components/studio/ExportModal';
import ObjectModeler from '../components/studio/ObjectModeler';
import ModelMaker from '../components/studio/ModelMaker';
import MaterialEditor from '../components/studio/MaterialEditor';
import { getObjectStateAtTime, createObject, createKeyframe } from '../components/engine/animationEngine';

const DEFAULT_BG = '#0D0A2E';
const DEFAULT_VIEWPORT = { width: 1080, height: 1920, name: 'Portrait' };
const STORAGE_KEY = 'motionclay-project-v1';
const demoSounds = [
  { id: 'demo-hit', name: 'Cartoon Hit', start: 400, duration: 900, kind: 'demo', muted: false },
  { id: 'demo-loop', name: 'Bouncy Loop', start: 0, duration: 3000, kind: 'demo', muted: false },
];

export default function Studio() {
  const [showTemplates, setShowTemplates] = useState(true);
  const [showExport, setShowExport] = useState(false);
  const [showModeler, setShowModeler] = useState(false);
  const [showModelMaker, setShowModelMaker] = useState(false);
  const [showMaterialEditor, setShowMaterialEditor] = useState(false);
  const [projectName, setProjectName] = useState('Untitled');
  const [objects, setObjects] = useState([]);
  const [sounds, setSounds] = useState(demoSounds);
  const [duration, setDuration] = useState(3000);
  const [background, setBackground] = useState(DEFAULT_BG);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedKfInfo, setSelectedKfInfo] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const rafRef = useRef(null); const lastTsRef = useRef(null); const currentTimeRef = useRef(0); const durationRef = useRef(duration); const selectedIdRef = useRef(selectedId); const prevStatesRef = useRef({});
  useEffect(() => { durationRef.current = duration; }, [duration]); useEffect(() => { currentTimeRef.current = currentTime; }, [currentTime]); useEffect(() => { selectedIdRef.current = selectedId; }, [selectedId]);

  useEffect(() => {
    const onKey = (e) => { const tag = document.activeElement?.tagName; if (tag === 'INPUT' || tag === 'TEXTAREA') return; if (e.code === 'Space') { e.preventDefault(); setIsPlaying(p => !p); } if (e.code === 'KeyR') { setIsPlaying(false); setCurrentTime(0); } if ((e.code === 'Delete' || e.code === 'Backspace') && selectedIdRef.current) { e.preventDefault(); handleDeleteObject(selectedIdRef.current); } };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      lastTsRef.current = null;
      const loop = (ts) => {
        if (lastTsRef.current === null) lastTsRef.current = ts;
        const dt = ts - lastTsRef.current; lastTsRef.current = ts;
        const next = currentTimeRef.current + dt;
        if (next >= durationRef.current) { currentTimeRef.current = 0; setCurrentTime(0); setIsPlaying(false); return; }
        currentTimeRef.current = next; setCurrentTime(next); rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isPlaying]);

  const states = {};
  objects.forEach(obj => {
    const prev = prevStatesRef.current[obj.id];
    const s = getObjectStateAtTime(obj, currentTime, prev, 16, viewport.height);
    if (s) s._currentTime = currentTime;
    states[obj.id] = s;
  });
  prevStatesRef.current = states;

  const selectedObj = objects.find(o => o.id === selectedId);
  const selectedKf = selectedObj && selectedKfInfo ? selectedObj.keyframes.find(k => k.id === selectedKfInfo.kfId) : null;

  const handleSelectTemplate = (template) => {
    setObjects(template.objects.map(o => ({ ...o, keyframes: o.keyframes.map(k => ({ ...k })) })));
    setSounds(template.sounds ? template.sounds.map(s => ({ ...s })) : demoSounds);
    setDuration(template.duration); setBackground(template.bg); setProjectName(template.name); setCurrentTime(0); setShowTemplates(false);
  };
  const handleBlankCanvas = () => { setObjects([]); setSounds(demoSounds); setDuration(3000); setBackground(DEFAULT_BG); setProjectName('Untitled'); setCurrentTime(0); setShowTemplates(false); };
  const handleAddObject = (type) => { const obj = createObject(type); obj.keyframes[0].x = 340 + Math.random() * 180; obj.keyframes[0].y = 170 + Math.random() * 140; setObjects(prev => [...prev, obj]); setSelectedId(obj.id); };
  const handleAddCustomObject = (obj) => { setObjects(prev => [...prev, obj]); setSelectedId(obj.id); };
  const handleAddPerson = (person) => { const clone = JSON.parse(JSON.stringify(person)); clone.id = Math.random().toString(36).slice(2); clone.name = `${person.name} ${Math.floor(Math.random()*100)}`; setObjects(prev => [...prev, clone]); setSelectedId(clone.id); };
  const handleDeleteObject = useCallback((id) => { setObjects(prev => prev.filter(o => o.id !== id)); setSelectedId(prev => prev === id ? null : prev); setSelectedKfInfo(prev => prev?.objId === id ? null : prev); }, []);
  const handleDuplicateObject = (id) => { const orig = objects.find(o => o.id === id); if (!orig) return; const copy = JSON.parse(JSON.stringify(orig)); copy.id = Math.random().toString(36).slice(2); copy.name = orig.name + ' Copy'; copy.keyframes = copy.keyframes.map(k => ({ ...k, id: Math.random().toString(36).slice(2), x: k.x + 20, y: k.y + 20 })); setObjects(prev => [...prev, copy]); setSelectedId(copy.id); };
  const handleUpdateObject = (id, patch) => setObjects(prev => prev.map(o => o.id === id ? { ...o, ...patch } : o));
  const handleDragObject = useCallback((objId, newX, newY) => { setObjects(prev => prev.map(obj => { if (obj.id !== objId) return obj; const kfs = [...obj.keyframes].sort((a,b)=>a.time-b.time); let targetIdx = 0, minDist = Infinity; kfs.forEach((kf,i) => { const d = Math.abs(kf.time - currentTimeRef.current); if (d < minDist) { minDist = d; targetIdx = i; } }); return { ...obj, keyframes: kfs.map((kf,i)=>i===targetIdx ? { ...kf, x:newX, y:newY } : kf) }; })); }, []);
  const handleAddKeyframe = (objId) => { const obj = objects.find(o => o.id === objId); if (!obj) return; if (obj.keyframes.find(k => Math.abs(k.time - currentTime) < 20)) return; const s = states[objId] || getObjectStateAtTime(obj, currentTime); const newKf = createKeyframe({ ...s, time: Math.round(currentTime), id: Math.random().toString(36).slice(2) }); setObjects(prev => prev.map(o => o.id === objId ? { ...o, keyframes: [...o.keyframes, newKf] } : o)); setSelectedKfInfo({ objId, kfId: newKf.id }); };
  const handleDeleteKeyframe = (objId, kfId) => { setObjects(prev => prev.map(o => o.id === objId ? { ...o, keyframes: o.keyframes.filter(k => k.id !== kfId) } : o)); if (selectedKfInfo?.kfId === kfId) setSelectedKfInfo(null); };
  const handleMoveKeyframe = (objId, kfId, newTime) => setObjects(prev => prev.map(o => o.id === objId ? { ...o, keyframes: o.keyframes.map(k => k.id === kfId ? { ...k, time: newTime } : k) } : o));
  const handleSelectKeyframe = (objId, kfId) => { setSelectedId(objId); setSelectedKfInfo({ objId, kfId }); };
  const handleUpdateKeyframe = (field, value) => { if (!selectedKfInfo) return; const { objId, kfId } = selectedKfInfo; setObjects(prev => prev.map(o => o.id === objId ? { ...o, keyframes: o.keyframes.map(k => k.id === kfId ? { ...k, [field]: value } : k) } : o)); };
  const handleAddSpriteFrames = async (part, fileList) => {
    if (!selectedObj || !fileList?.length) return;
    const files = Array.from(fileList);
    const frames = await Promise.all(files.map(file => new Promise(resolve => { const fr = new FileReader(); fr.onload = () => resolve({ id: Math.random().toString(36).slice(2), name: file.name, src: fr.result }); fr.readAsDataURL(file); })));
    setObjects(prev => prev.map(o => {
      if (o.id !== selectedObj.id) return o;
      const spriteParts = { ...(o.spriteParts || {}), [part]: { live: true, tracks: [{ id: 'user-'+part, name: 'User ' + part, mode: 'loop', frames }] } };
      return { ...o, spriteParts };
    }));
    toast.success(`${frames.length} ${part} frames added`);
  };
  const handleAddSound = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const audio = new Audio(url);
    audio.addEventListener('loadedmetadata', () => {
      setSounds(prev => [...prev, { id: Math.random().toString(36).slice(2), name: file.name, start: Math.round(currentTimeRef.current), duration: Math.round(audio.duration * 1000) || 1000, kind: 'upload', url, muted: false }]);
    });
  };
  const saveProject = () => { const data = { projectName, objects, sounds, duration, background, viewport }; localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); toast.success('Project saved locally'); };
  const loadProject = () => {
    const raw = localStorage.getItem(STORAGE_KEY); if (!raw) { toast.error('No saved project found'); return; }
    const data = JSON.parse(raw); setProjectName(data.projectName || 'Untitled'); setObjects(data.objects || []); setSounds(data.sounds || []); setDuration(data.duration || 3000); setBackground(data.background || DEFAULT_BG); setViewport(data.viewport || DEFAULT_VIEWPORT); setShowTemplates(false); toast.success('Project loaded');
  };
  const cycleViewport = () => { const views = [{ width:1080, height:1920, name:'Portrait' }, { width:1920, height:1080, name:'Landscape' }, { width:1080, height:1080, name:'Square' }]; const idx = views.findIndex(v => v.name === viewport.name); const next = views[(idx + 1) % views.length]; setViewport(next); toast.success(`Viewport: ${next.name}`); };
  const projectData = { projectName, objects, sounds, duration, background, viewport };

  return <div style={{ display:'flex', flexDirection:'column', height:'100vh', background:'#08081A', fontFamily:'Inter, system-ui, sans-serif', overflow:'hidden' }}>
    {showTemplates && <TemplateModal onSelect={handleSelectTemplate} onBlank={handleBlankCanvas} onClose={() => setShowTemplates(false)} />}
    {showExport && <ExportModal onClose={() => setShowExport(false)} projectName={projectName} projectData={projectData} />}
    {showModeler && <ObjectModeler onClose={() => setShowModeler(false)} onSave={handleAddCustomObject} />}
    {showModelMaker && <ModelMaker onClose={() => setShowModelMaker(false)} onSave={handleAddCustomObject} />}
    {showMaterialEditor && selectedObj && <MaterialEditor objType={selectedObj.type} existingData={selectedObj.materialTexture} onClose={() => setShowMaterialEditor(false)} onSave={(img) => { handleUpdateObject(selectedObj.id, { materialTexture: img }); setShowMaterialEditor(false); toast.success('Material saved to project'); }} />}
    <Toolbar onSave={saveProject} onLoad={loadProject} onViewport={cycleViewport} onExport={() => setShowExport(true)} projectName={projectName} onNameChange={setProjectName} duration={duration} onDurationChange={setDuration} onOpenModeler={() => setShowModeler(true)} onOpenModelMaker={() => setShowModelMaker(true)} />
    <div style={{ flex:1, display:'flex', overflow:'hidden' }}>
      <div style={{ width:182, flexShrink:0, borderRight:'1px solid rgba(255,255,255,0.07)', overflowY:'auto' }}><ObjectPanel objects={objects} selectedId={selectedId} onAdd={handleAddObject} onAddPerson={handleAddPerson} onSelect={(id) => { setSelectedId(id); setSelectedKfInfo(null); }} onDelete={handleDeleteObject} onDuplicate={handleDuplicateObject} /></div>
      <Canvas objects={objects} states={states} selectedId={selectedId} background={background} currentTime={currentTime} viewport={viewport} onSelectObject={(id) => { setSelectedId(id); if (!id) setSelectedKfInfo(null); }} onDragObject={handleDragObject} onResize={(id,w,h) => setObjects(prev => prev.map(o => { if (o.id !== id) return o; const kfs=[...o.keyframes].sort((a,b)=>a.time-b.time); let targetIdx=0,minDist=Infinity; kfs.forEach((kf,i)=>{ const d=Math.abs(kf.time-currentTimeRef.current); if(d<minDist){ minDist=d; targetIdx=i; }}); return { ...o, keyframes:kfs.map((kf,i)=> i===targetIdx ? { ...kf, width:Math.max(4,w), height:Math.max(4,h) } : kf) }; }))} onRotate={(id,deg) => setObjects(prev => prev.map(o => { if (o.id !== id) return o; const kfs=[...o.keyframes].sort((a,b)=>a.time-b.time); let targetIdx=0,minDist=Infinity; kfs.forEach((kf,i)=>{ const d=Math.abs(kf.time-currentTimeRef.current); if(d<minDist){ minDist=d; targetIdx=i; }}); return { ...o, keyframes:kfs.map((kf,i)=> i===targetIdx ? { ...kf, rotation:deg } : kf) }; }))} />
      <div style={{ width:220, flexShrink:0, borderLeft:'1px solid rgba(255,255,255,0.07)', overflowY:'auto', background:'#0C0C1A' }}><PropertiesPanel selectedObj={selectedObj} selectedKf={selectedKf} onUpdateKeyframe={handleUpdateKeyframe} onUpdateObject={handleUpdateObject} onOpenMaterial={() => setShowMaterialEditor(true)} onAddSpriteFrames={handleAddSpriteFrames} /></div>
    </div>
    <Timeline objects={objects} sounds={sounds} selectedId={selectedId} currentTime={currentTime} duration={duration} isPlaying={isPlaying} onSelectObject={(id)=>{ setSelectedId(id); setSelectedKfInfo(null); }} onTimeChange={setCurrentTime} onAddKeyframe={handleAddKeyframe} onDeleteKeyframe={handleDeleteKeyframe} onMoveKeyframe={handleMoveKeyframe} onSelectKeyframe={handleSelectKeyframe} selectedKeyframeId={selectedKfInfo} onPlay={() => setIsPlaying(p => !p)} onStop={() => { setIsPlaying(false); setCurrentTime(0); }} onAddSound={handleAddSound} onMoveSound={(id,start)=>setSounds(prev => prev.map(s => s.id===id ? { ...s, start } : s))} onToggleSound={(id)=>setSounds(prev => prev.map(s => s.id===id ? { ...s, muted: !s.muted } : s))} />
  </div>;
}
