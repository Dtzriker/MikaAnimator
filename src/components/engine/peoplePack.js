const mkLayer = (id, color, points, z = 0) => ({ id, color, z, points, limbKeyframes: [{ time: 0, points }, { time: 500, points: points.map((p, i) => ({ x: p.x + (i % 2 ? 3 : -3), y: p.y + (i % 2 ? -2 : 2) })) }] });
const makePerson = (name, skin, shirt, pants, hair, accent) => ({
  id: Math.random().toString(36).slice(2),
  type: 'custom',
  name,
  color: shirt,
  secondColor: accent,
  depth: 1,
  walkCycle: { enabled: true, speed: 1 },
  spriteParts: {
    eyes: { live: true, tracks: [{ id: 'idle', name: 'Idle Eyes', mode: 'loop', frames: [] }, { id: 'blink', name: 'Blink', mode: 'live', frames: [] }] },
    mouth: { live: true, tracks: [{ id: 'idle', name: 'Idle Mouth', mode: 'loop', frames: [] }, { id: 'talk', name: 'Talk', mode: 'live', frames: [] }] }
  },
  layers: [
    mkLayer('leg-l', pants, [{x:40,y:120},{x:60,y:120},{x:58,y:190},{x:36,y:190}], -1),
    mkLayer('leg-r', pants, [{x:76,y:120},{x:96,y:120},{x:100,y:190},{x:78,y:190}], -1),
    mkLayer('body', shirt, [{x:28,y:42},{x:110,y:42},{x:122,y:126},{x:18,y:126}], 1),
    mkLayer('arm-l', skin, [{x:18,y:52},{x:34,y:54},{x:26,y:126},{x:10,y:124}], 0),
    mkLayer('arm-r', skin, [{x:104,y:54},{x:120,y:52},{x:126,y:124},{x:110,y:126}], 0),
    mkLayer('head', skin, [{x:34,y:0},{x:98,y:0},{x:108,y:44},{x:24,y:44}], 2),
    mkLayer('hair', hair, [{x:28,y:0},{x:100,y:0},{x:108,y:18},{x:20,y:18}], 3)
  ],
  keyframes: [{ id: Math.random().toString(36).slice(2), time: 0, x: 427, y: 240, width: 130, height: 190, borderRadius: 20, rotation: 0, opacity: 1, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'clay3d', easing: 'spring' }]
});
export const PEOPLE_PACK = [
  makePerson('Mika', '#f3c7a7', '#7B61FF', '#2d3559', '#18142d', '#FF6B9D'),
  makePerson('Noa', '#f5c9b2', '#4DC4FF', '#1f2a44', '#2a1b14', '#4DFFB8'),
  makePerson('Ari', '#dca885', '#FF8C42', '#24304f', '#3e271d', '#FFD700'),
  makePerson('Lia', '#efd0b8', '#FF6B9D', '#172544', '#1b0f1f', '#7B61FF'),
  makePerson('Rin', '#c78f6b', '#4DFFB8', '#2f223f', '#111', '#4DC4FF'),
  makePerson('Tao', '#f0be97', '#FFD700', '#324660', '#2c221f', '#FF8C42'),
  makePerson('Zee', '#9c6a53', '#C44DFF', '#1e2034', '#0d0d16', '#FF6B9D')
];
