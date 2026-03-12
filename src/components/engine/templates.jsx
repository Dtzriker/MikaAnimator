export const TEMPLATES = [
  {
    id: 'product_reveal',
    name: 'Product Reveal',
    emoji: '✨',
    description: 'A floating blob morphs into a product card with a bouncy entrance',
    bg: '#0D0A2E',
    duration: 3000,
    objects: [
      {
        id: 'bg-blob',
        name: 'BackgroundBlob',
        type: 'blob',
        color: '#7B61FF',
        secondColor: '#C44DFF',
        depth: -2,
        keyframes: [
          { id: 'k1', time: 0, x: 427, y: 240, width: 0, height: 0, borderRadius: 50, opacity: 0, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'clay3d', easing: 'spring' },
          { id: 'k2', time: 400, x: 427, y: 240, width: 200, height: 200, borderRadius: 50, opacity: 0.3, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1.2, scaleY: 0.8, gradientAngle: 135, mode: 'clay3d', easing: 'bounce' },
          { id: 'k3', time: 800, x: 427, y: 240, width: 320, height: 280, borderRadius: 40, opacity: 0.25, rotation: 5, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 155, mode: 'clay3d', easing: 'smooth' },
        ]
      },
      {
        id: 'main-shape',
        name: 'MainShape',
        type: 'circle',
        color: '#FF6B9D',
        secondColor: '#FF8C42',
        depth: 0,
        keyframes: [
          { id: 'k1', time: 0, x: 427, y: 300, width: 0, height: 0, borderRadius: 50, opacity: 0, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'clay3d', easing: 'spring' },
          { id: 'k2', time: 300, x: 427, y: 240, width: 120, height: 120, borderRadius: 50, opacity: 1, rotation: -15, rotateX: 20, rotateY: -10, scaleX: 1.3, scaleY: 0.7, gradientAngle: 135, mode: 'clay3d', easing: 'bounce' },
          { id: 'k3', time: 600, x: 427, y: 240, width: 80, height: 80, borderRadius: 50, opacity: 1, rotation: 0, rotateX: 15, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'clay3d', easing: 'spring' },
          { id: 'k4', time: 1400, x: 427, y: 220, width: 80, height: 80, borderRadius: 50, opacity: 1, rotation: 5, rotateX: 10, rotateY: 10, scaleX: 1, scaleY: 1, gradientAngle: 160, mode: 'clay3d', easing: 'spring' },
          { id: 'k5', time: 1700, x: 427, y: 240, width: 280, height: 160, borderRadius: 16, opacity: 1, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'flat2d', easing: 'overshoot' },
        ]
      },
      {
        id: 'label',
        name: 'Label',
        type: 'text',
        color: '#FFFFFF',
        secondColor: null,
        depth: 1,
        text: '✦ NEW',
        keyframes: [
          { id: 'k1', time: 0, x: 427, y: 340, width: 200, height: 48, borderRadius: 0, opacity: 0, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'flat2d', easing: 'smooth' },
          { id: 'k2', time: 1800, x: 427, y: 340, width: 200, height: 48, borderRadius: 0, opacity: 0, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'flat2d', easing: 'spring' },
          { id: 'k3', time: 2200, x: 427, y: 340, width: 200, height: 48, borderRadius: 0, opacity: 1, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'flat2d', easing: 'spring' },
        ]
      },
    ]
  },
  {
    id: 'logo_pop',
    name: 'Logo Pop',
    emoji: '💥',
    description: 'Shapes burst from center, settle into a logo lockup',
    bg: '#0A1628',
    duration: 2500,
    objects: [
      {
        id: 'circle1',
        name: 'Circle A',
        type: 'circle',
        color: '#4DFFB8',
        secondColor: '#4DC4FF',
        depth: 0,
        keyframes: [
          { id: 'k1', time: 0, x: 427, y: 240, width: 0, height: 0, borderRadius: 50, opacity: 0, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'clay3d', easing: 'spring' },
          { id: 'k2', time: 200, x: 427, y: 240, width: 100, height: 100, borderRadius: 50, opacity: 1, rotation: 0, rotateX: 30, rotateY: -20, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'clay3d', easing: 'bounce' },
          { id: 'k3', time: 600, x: 310, y: 220, width: 70, height: 70, borderRadius: 50, opacity: 1, rotation: 10, rotateX: 15, rotateY: -10, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'clay3d', easing: 'spring' },
        ]
      },
      {
        id: 'circle2',
        name: 'Circle B',
        type: 'circle',
        color: '#FF6B9D',
        secondColor: '#C44DFF',
        depth: 0,
        keyframes: [
          { id: 'k1', time: 0, x: 427, y: 240, width: 0, height: 0, borderRadius: 50, opacity: 0, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'clay3d', easing: 'spring' },
          { id: 'k2', time: 250, x: 427, y: 240, width: 120, height: 120, borderRadius: 50, opacity: 1, rotation: 0, rotateX: -20, rotateY: 20, scaleX: 1.2, scaleY: 0.8, gradientAngle: 135, mode: 'clay3d', easing: 'bounce' },
          { id: 'k3', time: 650, x: 544, y: 220, width: 90, height: 90, borderRadius: 50, opacity: 1, rotation: -10, rotateX: -15, rotateY: 10, scaleX: 1, scaleY: 1, gradientAngle: 160, mode: 'clay3d', easing: 'spring' },
        ]
      },
      {
        id: 'center-badge',
        name: 'Badge',
        type: 'badge',
        color: '#FFD700',
        secondColor: null,
        depth: 1,
        text: 'CLAY',
        keyframes: [
          { id: 'k1', time: 600, x: 427, y: 260, width: 0, height: 0, borderRadius: 14, opacity: 0, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'flat2d', easing: 'overshoot' },
          { id: 'k2', time: 900, x: 427, y: 260, width: 90, height: 36, borderRadius: 14, opacity: 1, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1.2, scaleY: 0.8, gradientAngle: 135, mode: 'flat2d', easing: 'bounce' },
          { id: 'k3', time: 1100, x: 427, y: 260, width: 90, height: 36, borderRadius: 14, opacity: 1, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'flat2d', easing: 'spring' },
        ]
      },
    ]
  },
  {
    id: 'ui_morph',
    name: 'UI Morph',
    emoji: '🔮',
    description: 'Clay blobs morph into a clean UI card with glassmorphism',
    bg: '#060D2E',
    duration: 3500,
    objects: [
      {
        id: 'blob1',
        name: 'Blob A',
        type: 'blob',
        color: '#7B61FF',
        secondColor: '#C44DFF',
        depth: -1,
        keyframes: [
          { id: 'k1', time: 0, x: 300, y: 200, width: 20, height: 20, borderRadius: 50, opacity: 0, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'clay3d', easing: 'spring' },
          { id: 'k2', time: 300, x: 300, y: 200, width: 120, height: 110, borderRadius: 45, opacity: 0.9, rotation: -10, rotateX: 20, rotateY: -15, scaleX: 1.2, scaleY: 0.9, gradientAngle: 135, mode: 'clay3d', easing: 'bounce' },
          { id: 'k3', time: 900, x: 300, y: 220, width: 100, height: 100, borderRadius: 45, opacity: 0.8, rotation: 5, rotateX: 15, rotateY: -10, scaleX: 1, scaleY: 1, gradientAngle: 145, mode: 'clay3d', easing: 'smooth' },
          { id: 'k4', time: 1600, x: 427, y: 240, width: 300, height: 180, borderRadius: 20, opacity: 1, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'flat2d', easing: 'overshoot' },
        ]
      },
      {
        id: 'blob2',
        name: 'Blob B',
        type: 'blob',
        color: '#FF6B9D',
        secondColor: '#FF8C42',
        depth: -1,
        keyframes: [
          { id: 'k1', time: 100, x: 560, y: 280, width: 20, height: 20, borderRadius: 50, opacity: 0, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'clay3d', easing: 'spring' },
          { id: 'k2', time: 450, x: 560, y: 280, width: 130, height: 120, borderRadius: 42, opacity: 0.9, rotation: 12, rotateX: -20, rotateY: 15, scaleX: 0.8, scaleY: 1.2, gradientAngle: 155, mode: 'clay3d', easing: 'bounce' },
          { id: 'k3', time: 1000, x: 550, y: 270, width: 110, height: 105, borderRadius: 42, opacity: 0.7, rotation: -5, rotateX: -15, rotateY: 10, scaleX: 1, scaleY: 1, gradientAngle: 165, mode: 'clay3d', easing: 'smooth' },
          { id: 'k4', time: 1700, x: 427, y: 240, width: 0, height: 0, borderRadius: 20, opacity: 0, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'flat2d', easing: 'overshoot' },
        ]
      },
      {
        id: 'card-title',
        name: 'Card Title',
        type: 'text',
        color: '#FFFFFF',
        secondColor: null,
        depth: 1,
        text: 'MotionClay ✦',
        keyframes: [
          { id: 'k1', time: 1700, x: 427, y: 225, width: 260, height: 48, borderRadius: 0, opacity: 0, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 0.5, gradientAngle: 135, mode: 'flat2d', easing: 'spring' },
          { id: 'k2', time: 2100, x: 427, y: 225, width: 260, height: 48, borderRadius: 0, opacity: 1, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'flat2d', easing: 'spring' },
        ]
      },
      {
        id: 'cta-btn',
        name: 'CTA Button',
        type: 'button',
        color: '#7B61FF',
        secondColor: null,
        depth: 1,
        text: 'Get Started →',
        keyframes: [
          { id: 'k1', time: 2000, x: 427, y: 280, width: 0, height: 44, borderRadius: 22, opacity: 0, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'flat2d', easing: 'overshoot' },
          { id: 'k2', time: 2400, x: 427, y: 280, width: 160, height: 44, borderRadius: 22, opacity: 1, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'flat2d', easing: 'bounce' },
        ]
      },
    ]
  },
  {
    id: 'floating_shapes',
    name: 'Floating Shapes',
    emoji: '🫧',
    description: 'Colourful clay bubbles drift and sway with soft physics',
    bg: '#0F0F23',
    duration: 4000,
    objects: [
      {
        id: 'f1',
        name: 'Float 1',
        type: 'circle',
        color: '#4DFFB8',
        secondColor: '#4DC4FF',
        depth: 0,
        keyframes: [
          { id: 'k1', time: 0, x: 250, y: 320, width: 60, height: 60, borderRadius: 50, opacity: 0, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'clay3d', easing: 'spring' },
          { id: 'k2', time: 400, x: 250, y: 270, width: 60, height: 60, borderRadius: 50, opacity: 1, rotation: 5, rotateX: 20, rotateY: -10, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'clay3d', easing: 'bounce' },
          { id: 'k3', time: 2000, x: 260, y: 240, width: 60, height: 60, borderRadius: 50, opacity: 1, rotation: -5, rotateX: 15, rotateY: 5, gradientAngle: 150, mode: 'clay3d', easing: 'smooth' },
          { id: 'k4', time: 4000, x: 240, y: 220, width: 60, height: 60, borderRadius: 50, opacity: 0.8, rotation: 8, rotateX: 20, rotateY: -5, gradientAngle: 135, mode: 'clay3d', easing: 'smooth' },
        ]
      },
      {
        id: 'f2',
        name: 'Float 2',
        type: 'blob',
        color: '#C44DFF',
        secondColor: '#FF6B9D',
        depth: 0,
        keyframes: [
          { id: 'k1', time: 200, x: 427, y: 350, width: 90, height: 85, borderRadius: 42, opacity: 0, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'clay3d', easing: 'bounce' },
          { id: 'k2', time: 600, x: 427, y: 270, width: 90, height: 85, borderRadius: 42, opacity: 1, rotation: -8, rotateX: -15, rotateY: 15, scaleX: 0.9, scaleY: 1.1, gradientAngle: 155, mode: 'clay3d', easing: 'spring' },
          { id: 'k3', time: 2500, x: 430, y: 250, width: 90, height: 85, borderRadius: 42, opacity: 1, rotation: 6, rotateX: -10, rotateY: -15, gradientAngle: 135, mode: 'clay3d', easing: 'smooth' },
          { id: 'k4', time: 4000, x: 420, y: 240, width: 90, height: 85, borderRadius: 42, opacity: 0.9, rotation: -6, rotateX: -15, rotateY: 10, gradientAngle: 145, mode: 'clay3d', easing: 'smooth' },
        ]
      },
      {
        id: 'f3',
        name: 'Float 3',
        type: 'circle',
        color: '#FFD700',
        secondColor: '#FF8C42',
        depth: 0,
        keyframes: [
          { id: 'k1', time: 400, x: 600, y: 320, width: 50, height: 50, borderRadius: 50, opacity: 0, rotation: 0, rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, gradientAngle: 135, mode: 'clay3d', easing: 'spring' },
          { id: 'k2', time: 800, x: 600, y: 260, width: 50, height: 50, borderRadius: 50, opacity: 1, rotation: 12, rotateX: 25, rotateY: 10, scaleX: 1.1, scaleY: 0.9, gradientAngle: 135, mode: 'clay3d', easing: 'bounce' },
          { id: 'k3', time: 3000, x: 590, y: 230, width: 50, height: 50, borderRadius: 50, opacity: 1, rotation: -8, rotateX: 20, rotateY: -10, gradientAngle: 155, mode: 'clay3d', easing: 'smooth' },
          { id: 'k4', time: 4000, x: 605, y: 210, width: 50, height: 50, borderRadius: 50, opacity: 0.9, rotation: 10, rotateX: 25, rotateY: 5, gradientAngle: 135, mode: 'clay3d', easing: 'smooth' },
        ]
      },
    ]
  },
];
