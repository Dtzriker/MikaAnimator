import { simulatePhysics, defaultPhysicsSettings } from './physicsEngine';
const lerp = (a, b, t) => a + (b - a) * t;
export const EASING_OPTIONS = [
  { value: 'spring', label: 'Spring' }, { value: 'bounce', label: 'Bounce' }, { value: 'elastic', label: 'Elastic' },
  { value: 'smooth', label: 'Smooth' }, { value: 'snappy', label: 'Snappy' }, { value: 'overshoot', label: 'Overshoot' }, { value: 'linear', label: 'Linear' },
];
const easingFns = {
  linear: t => t,
  smooth: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  snappy: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  spring: t => t <= 0 ? 0 : t >= 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI) / 3) + 1,
  bounce: t => { if (t < 1 / 2.75) return 7.5625 * t * t; if (t < 2 / 2.75) { const tt = t - 1.5 / 2.75; return 7.5625 * tt * tt + 0.75; } if (t < 2.5 / 2.75) { const tt = t - 2.25 / 2.75; return 7.5625 * tt * tt + 0.9375; } const tt = t - 2.625 / 2.75; return 7.5625 * tt * tt + 0.984375; },
  elastic: t => t <= 0 ? 0 : t >= 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * (2 * Math.PI) / 3),
  overshoot: t => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
};
export const applyEasing = (name, t) => (easingFns[name] || easingFns.smooth)(Math.max(0, Math.min(1, t)));
const lerpColor = (c1, c2, t) => { if (!c1 || !c2) return c1 || c2; try { const p = h => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)]; const [r1,g1,b1]=p(c1),[r2,g2,b2]=p(c2); const h = n => n.toString(16).padStart(2,'0'); return `#${h(Math.round(lerp(r1,r2,t)))}${h(Math.round(lerp(g1,g2,t)))}${h(Math.round(lerp(b1,b2,t)))}`; } catch { return c1; } };
const interpolateState = (a, b, t) => ({
  x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), width: lerp(a.width, b.width, t), height: lerp(a.height, b.height, t), rotation: lerp(a.rotation ?? 0, b.rotation ?? 0, t), opacity: lerp(a.opacity ?? 1, b.opacity ?? 1, t), borderRadius: lerp(a.borderRadius ?? 50, b.borderRadius ?? 50, t), rotateX: lerp(a.rotateX ?? 0, b.rotateX ?? 0, t), rotateY: lerp(a.rotateY ?? 0, b.rotateY ?? 0, t), scaleX: lerp(a.scaleX ?? 1, b.scaleX ?? 1, t), scaleY: lerp(a.scaleY ?? 1, b.scaleY ?? 1, t), gradientAngle: lerp(a.gradientAngle ?? 135, b.gradientAngle ?? 135, t), z: lerp(a.z ?? 0, b.z ?? 0, t), mode: t < 0.5 ? (a.mode ?? 'clay3d') : (b.mode ?? 'clay3d'), easing: a.easing, physics: a.physics, kfColor: (a.kfColor && b.kfColor) ? lerpColor(a.kfColor, b.kfColor, t) : (a.kfColor || b.kfColor || null), spriteLive: a.spriteLive || b.spriteLive || {}
});
export const getObjectStateAtTime = (obj, currentTimeMs, prevState = null, dtMs = 16, canvasHeight = 480) => {
  const kfs = [...(obj.keyframes || [])].sort((a, b) => a.time - b.time);
  if (!kfs.length) return null;
  const enrich = (kf) => ({ ...kf, color: kf.kfColor || obj.color, secondColor: obj.secondColor, depth: obj.depth ?? 0, materialTexture: obj.materialTexture || null, layers: obj.layers || null, spriteParts: obj.spriteParts || null, walkCycle: obj.walkCycle || null });
  let state;
  if (kfs.length === 1 || currentTimeMs <= kfs[0].time) state = enrich(kfs[0]);
  else if (currentTimeMs >= kfs[kfs.length - 1].time) state = enrich(kfs[kfs.length - 1]);
  else {
    for (let i = 0; i < kfs.length - 1; i++) {
      if (currentTimeMs >= kfs[i].time && currentTimeMs <= kfs[i + 1].time) {
        const localT = (currentTimeMs - kfs[i].time) / (kfs[i + 1].time - kfs[i].time);
        state = enrich(interpolateState(kfs[i], kfs[i + 1], applyEasing(kfs[i].easing || 'spring', localT)));
        break;
      }
    }
  }
  const physics = { ...defaultPhysicsSettings(), ...(state.physics || {}) };
  if (physics.useFloor) physics.floorY = canvasHeight * (physics.floorPct / 100);
  return simulatePhysics(state, prevState, dtMs, physics);
};
export const createKeyframe = (overrides = {}) => ({ id: Math.random().toString(36).slice(2), time: 0, x: 427, y: 240, width: 80, height: 80, rotation: 0, opacity: 1, borderRadius: 50, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'clay3d', easing: 'spring', physics: defaultPhysicsSettings(), spriteLive: {}, ...overrides });
const TYPE_DEFAULTS = { circle:{ color:'#FF6B9D', secondColor:'#C44DFF', width:80, height:80, borderRadius:50 }, blob:{ color:'#C44DFF', secondColor:'#FF6B9D', width:100, height:100, borderRadius:40 }, rect:{ color:'#4DFFB8', secondColor:'#4DC4FF', width:120, height:80, borderRadius:12 }, star:{ color:'#FFD700', secondColor:'#FF8C42', width:80, height:80, borderRadius:0 }, diamond:{ color:'#FF8C42', secondColor:'#FFD700', width:80, height:80, borderRadius:0 }, ring:{ color:'#4DC4FF', secondColor:null, width:80, height:80, borderRadius:50 }, button:{ color:'#7B61FF', secondColor:null, width:160, height:44, borderRadius:22 }, card:{ color:'#1E2B4A', secondColor:null, width:280, height:180, borderRadius:16 }, badge:{ color:'#FF4D6D', secondColor:null, width:70, height:28, borderRadius:14 }, text:{ color:'#FFFFFF', secondColor:null, width:200, height:48, borderRadius:0 } };
export const createObject = (type) => { const d = TYPE_DEFAULTS[type] || TYPE_DEFAULTS.circle; const text = type === 'text' ? 'Hello!' : type === 'button' ? 'Click Me' : type === 'badge' ? 'NEW' : ''; return { id: Math.random().toString(36).slice(2), name: type.charAt(0).toUpperCase() + type.slice(1), type, color: d.color, secondColor: d.secondColor, depth: 0, text, keyframes: [createKeyframe({ time: 0, x: 427, y: 240, width: d.width, height: d.height, borderRadius: d.borderRadius })] }; };
