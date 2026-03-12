export const GRAVITY = 980;
export function simulatePhysics(state, prevState, dtMs, settings = {}) {
  if (!settings?.enabled) return state;
  const dt = dtMs / 1000;
  const { gravity = 1, bounce = 0.6, floorY = null, friction = 0.95 } = settings;
  let vx = prevState?._vx ?? state._vx ?? 0;
  let vy = prevState?._vy ?? state._vy ?? 0;
  if (prevState) { vx += (state.x - prevState.x) / Math.max(dt, 0.016) * 0.03; }
  vy += GRAVITY * gravity * dt;
  let nx = state.x + vx * dt; let ny = state.y + vy * dt;
  let scaleX = state.scaleX ?? 1, scaleY = state.scaleY ?? 1;
  if (floorY !== null && ny >= floorY - state.height / 2) {
    ny = floorY - state.height / 2; vy = -Math.abs(vy) * bounce; vx *= friction; const squash = Math.min(0.35, Math.abs(vy) / 700); scaleX += squash; scaleY -= squash * 0.6;
  }
  return { ...state, x: nx, y: ny, scaleX, scaleY, _vx: vx, _vy: vy };
}
export const defaultPhysicsSettings = () => ({ enabled: false, gravity: 1, bounce: 0.6, friction: 0.95, floorY: null, useFloor: false, floorPct: 85 });
