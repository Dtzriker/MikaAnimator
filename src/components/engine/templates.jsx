import { PEOPLE_PACK } from './peoplePack';
export const TEMPLATES = [
  {
    id: 'floating_shapes', name: 'Floating Shapes', emoji: '🫧', description: 'Colourful clay bubbles drift and sway with soft physics', bg: '#0F0F23', duration: 4000,
    objects: [
      { id: 'f1', name: 'Float 1', type: 'circle', color: '#4DFFB8', secondColor: '#4DC4FF', depth: 0, keyframes: [
        { id: 'k1', time: 0, x: 250, y: 320, width: 60, height: 60, borderRadius: 50, opacity: 0, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'clay3d', easing: 'spring' },
        { id: 'k2', time: 400, x: 250, y: 270, width: 60, height: 60, borderRadius: 50, opacity: 1, rotation: 5, rotateX: 20, rotateY: -10, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'clay3d', easing: 'bounce' },
        { id: 'k3', time: 2000, x: 260, y: 240, width: 60, height: 60, borderRadius: 50, opacity: 1, rotation: -5, rotateX: 15, rotateY: 5, gradientAngle: 150, mode: 'clay3d', easing: 'smooth' },
        { id: 'k4', time: 4000, x: 240, y: 220, width: 60, height: 60, borderRadius: 50, opacity: 0.8, rotation: 8, rotateX: 20, rotateY: -5, gradientAngle: 135, mode: 'clay3d', easing: 'smooth' },
      ] },
      { id: 'f2', name: 'Float 2', type: 'blob', color: '#C44DFF', secondColor: '#FF6B9D', depth: 0, keyframes: [
        { id: 'k1', time: 200, x: 427, y: 350, width: 90, height: 85, borderRadius: 42, opacity: 0, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'clay3d', easing: 'bounce' },
        { id: 'k2', time: 600, x: 427, y: 270, width: 90, height: 85, borderRadius: 42, opacity: 1, rotation: -8, rotateX: -15, rotateY: 15, scaleX: 0.9, scaleY: 1.1, gradientAngle: 155, mode: 'clay3d', easing: 'spring' },
        { id: 'k3', time: 2500, x: 430, y: 250, width: 90, height: 85, borderRadius: 42, opacity: 1, rotation: 6, rotateX: -10, rotateY: -15, gradientAngle: 135, mode: 'clay3d', easing: 'smooth' },
        { id: 'k4', time: 4000, x: 420, y: 240, width: 90, height: 85, borderRadius: 42, opacity: 0.9, rotation: -6, rotateX: -15, rotateY: 10, gradientAngle: 145, mode: 'clay3d', easing: 'smooth' },
      ] }
    ]
  },
  {
    id: 'funny_people_ad', name: 'Funny People Ad', emoji: '🎭', description: 'Demo people pack showing walk cycles, sprites and sound cues', bg: '#111320', duration: 6500,
    objects: PEOPLE_PACK.slice(0, 3).map((p, i) => ({ ...p, id: `ad-${i}`, name: `${p.name} Demo`, keyframes: [
      { ...p.keyframes[0], id: `a${i}1`, time: 0, x: 160 + i*220, y: 280, width: 110, height: 170, mode: 'clay3d' },
      { ...p.keyframes[0], id: `a${i}2`, time: 2200, x: 260 + i*160, y: 280, width: 110, height: 170, mode: 'clay3d' },
      { ...p.keyframes[0], id: `a${i}3`, time: 4200, x: 240 + i*180, y: 260, width: 130, height: 190, mode: 'clay3d' },
      { ...p.keyframes[0], id: `a${i}4`, time: 6500, x: 250 + i*170, y: 260, width: 130, height: 190, mode: 'clay3d' }
    ] })),
    sounds: [{ id: 'laugh', name: 'Cartoon Hit', start: 1800, duration: 1200, kind: 'demo' }, { id: 'music', name: 'Bouncy Loop', start: 0, duration: 6500, kind: 'demo' }]
  }
];
