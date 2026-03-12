export function catmullRomPath(points, closed = true) {
  if (!points || points.length < 2) return '';
  if (points.length === 2) return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}${closed ? ' Z' : ''}`;
  const n = points.length;
  const pt = (i) => closed ? points[((i % n) + n) % n] : points[Math.max(0, Math.min(n - 1, i))];
  let d = `M ${pt(0).x.toFixed(1)} ${pt(0).y.toFixed(1)}`;
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const p0 = pt(i - 1), p1 = pt(i), p2 = pt(i + 1), p3 = pt(i + 2);
    const c1x = p1.x + (p2.x - p0.x) / 6; const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6; const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  if (closed) d += ' Z';
  return d;
}
export function getLimbPoints(layer, time) {
  const kfs = layer?.limbKeyframes;
  if (!kfs || kfs.length === 0) return layer?.points || [];
  if (time <= kfs[0].time) return kfs[0].points;
  if (time >= kfs[kfs.length - 1].time) return kfs[kfs.length - 1].points;
  for (let i = 0; i < kfs.length - 1; i++) {
    if (time >= kfs[i].time && time <= kfs[i + 1].time) {
      const t = (time - kfs[i].time) / (kfs[i + 1].time - kfs[i].time);
      const a = kfs[i].points, b = kfs[i + 1].points;
      const len = Math.min(a.length, b.length);
      return Array.from({ length: len }, (_, j) => ({ x: a[j].x + ((b[j]?.x ?? a[j].x) - a[j].x) * t, y: a[j].y + ((b[j]?.y ?? a[j].y) - a[j].y) * t }));
    }
  }
  return layer.points;
}
export function sculptPoints(points, mx, my, dx, dy, radius = 60) {
  return points.map(pt => { const dist = Math.hypot(pt.x - mx, pt.y - my); if (dist >= radius) return pt; const t = 1 - dist / radius; const w = t * t * t; return { x: pt.x + dx * w, y: pt.y + dy * w }; });
}
