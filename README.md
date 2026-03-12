# MotionClay

GitHub-ready Vite + React repo rebuilt from the supplied Base44 export and extended with a larger feature set.

## Included
- transform gizmo
- per-keyframe easing and keyframe colors
- optional per-keyframe physics toggles
- material painting editor
- custom model maker with layer editing and limb keyframes
- people pack (7 demo characters)
- sound timeline with uploads and demo cues
- sprite lanes for mouth / eyes with frame uploads and live toggles
- local project save / load
- canvas safe area / viewport guides
- WebM / GIF / JSON export foundations

## Notes
- The original Base44 auth shell is kept, but local development works with the included fallback app params.
- Export now works best for JSON and browser-based WebM capture. True production-grade MP4/MOV/4K transparency export normally needs a dedicated render backend or ffmpeg pipeline, so the repo ships a browser-first export path and clear extension points.

## Run
```bash
npm install
npm run dev
```
