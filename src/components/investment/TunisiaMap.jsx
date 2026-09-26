import React, { useRef, useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Info } from 'lucide-react';
import { formatMTND, formatNumber } from '@/lib/investment';

const MIN_LAT = 30.2, MAX_LAT = 37.6, MIN_LNG = 7.4, MAX_LNG = 11.7;
const W = 760, H = 1000;

const project = (lat, lng) => ({
  x: ((lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * W,
  y: ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * H,
});

const OUTLINE = [
  [37.35, 9.55], [37.10, 8.95], [36.90, 8.55], [36.50, 8.25], [35.60, 8.30],
  [34.80, 8.10], [34.00, 7.55], [32.60, 7.50], [31.60, 7.80], [30.85, 8.20],
  [30.24, 9.55], [31.30, 10.10], [32.15, 11.30], [33.10, 11.55], [33.55, 11.00],
  [33.85, 10.35], [34.65, 10.75], [35.45, 10.55], [36.10, 10.55], [36.50, 10.75],
  [36.85, 10.45], [37.30, 9.95],
];

const outlinePath =
  OUTLINE.map(([la, ln], i) => {
    const p = project(la, ln);
    return `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(' ') + ' Z';

const lerp = (a, b, f) => Math.round(a + (b - a) * f);
const densityColor = (t) => {
  const c1 = [186, 230, 253];
  const c2 = [12, 74, 110];
  return `rgb(${lerp(c1[0], c2[0], t)},${lerp(c1[1], c2[1], t)},${lerp(c1[2], c2[2], t)})`;
};

export default function TunisiaMap({ governorates = [], stats = {}, selectedId, onSelect, projects = [], alwaysShowLabels = false, showHint = true, heightClass = 'h-[460px] sm:h-[600px] lg:h-[680px]', fullHeight = false }) {
  const svgRef = useRef(null);
  const [view, setView] = useState({ x: 0, y: 0, w: W, h: H });
  const [hovered, setHovered] = useState(null);
  const drag = useRef(null);

  const zoom = W / view.w;
  const maxCount = Math.max(1, ...governorates.map((g) => stats[g.id]?.count || 0));

  const zoomBy = (factor, focus) => {
    setView((v) => {
      const newW = Math.min(W, Math.max(W / 6, v.w / factor));
      const scale = newW / v.w;
      const newH = v.h * scale;
      const fx = focus ? focus.x : v.x + v.w / 2;
      const fy = focus ? focus.y : v.y + v.h / 2;
      return { x: fx - (fx - v.x) * scale, y: fy - (fy - v.y) * scale, w: newW, h: newH };
    });
  };

  const svgPoint = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    return { x: view.x + px * view.w, y: view.y + py * view.h };
  };

  const onWheel = (e) => {
    e.preventDefault();
    zoomBy(e.deltaY < 0 ? 1.2 : 1 / 1.2, svgPoint(e));
  };

  const onMouseDown = (e) => { drag.current = { startX: e.clientX, startY: e.clientY, view }; };
  const onMouseMove = (e) => {
    if (!drag.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const ratio = view.w / rect.width;
    const dx = (e.clientX - drag.current.startX) * ratio;
    const dy = (e.clientY - drag.current.startY) * ratio;
    setView({ ...drag.current.view, x: drag.current.view.x - dx, y: drag.current.view.y - dy });
  };
  const endDrag = () => { drag.current = null; };
  const reset = () => setView({ x: 0, y: 0, w: W, h: H });

  const hoveredGov = governorates.find((g) => g.id === hovered);
  const hoveredStats = hovered ? stats[hovered] : null;

  return (
    <div className={fullHeight ? 'relative w-full h-full' : 'relative w-full'}>
      <svg
        ref={svgRef}
        viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
        className={`w-full ${heightClass} rounded-2xl select-none cursor-grab active:cursor-grabbing`}
        style={{ background: 'radial-gradient(ellipse at 55% 35%, #ecfeff 0%, #f8fafc 55%, #eef2f7 100%)' }}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={() => { endDrag(); setHovered(null); }}
      >
        <defs>
          <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0891b2" strokeWidth="1" opacity="0.08" />
          </pattern>
        </defs>

        <rect x={view.x} y={view.y} width={view.w} height={view.h} fill="url(#grid)" />

        <path d={outlinePath} fill="url(#landGrad)" stroke="#0e7490" strokeWidth={2 / zoom} strokeLinejoin="round" />

        {governorates.map((g) => {
          const p = project(g.latitude, g.longitude);
          const s = stats[g.id] || { count: 0, investment: 0 };
          const t = s.count / maxCount;
          const r = 7 + Math.min(20, Math.sqrt(s.count) * 2.4);
          const sel = selectedId === g.id;
          const hov = hovered === g.id;
          const showLabel = alwaysShowLabels || zoom > 1.25 || sel || hov;
          return (
            <g
              key={g.id}
              transform={`translate(${p.x},${p.y}) scale(${1 / zoom})`}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered(g.id)}
              onClick={(e) => { e.stopPropagation(); onSelect && onSelect(g.id); }}
            >
              {(sel || hov) && <circle r={r + 7} fill="none" stroke={sel ? '#d4af37' : '#0891b2'} strokeWidth={2} opacity={0.75} />}
              <circle r={r} fill={densityColor(t)} stroke={sel ? '#d4af37' : '#ffffff'} strokeWidth={sel ? 3 : 1.5} />
              {showLabel && (
                <text y={r + 14} textAnchor="middle" fontSize="12" fontWeight="600" fill="#0f172a"
                  style={{ paintOrder: 'stroke', stroke: '#ffffff', strokeWidth: 3.5 }}>
                  {g.name}
                </text>
              )}
            </g>
          );
        })}

        {/* Project spots */}
        {projects.map((p) => {
          if (p.latitude == null || p.longitude == null) return null;
          const pt = project(p.latitude, p.longitude);
          return (
            <g key={p.id} transform={`translate(${pt.x},${pt.y}) scale(${1 / zoom})`} className="pointer-events-none">
              <circle r="4" fill="#d4af37" stroke="#ffffff" strokeWidth="1.2" opacity="0.95" />
            </g>
          );
        })}
      </svg>

      {/* Hover info card */}
      {hoveredGov && (
        <div className="absolute top-3 left-3 rounded-xl border bg-card/95 backdrop-blur px-4 py-3 shadow-lg pointer-events-none max-w-[220px]">
          <div className="text-sm font-bold">{hoveredGov.name}</div>
          <div className="text-xs text-muted-foreground">{hoveredGov.region}</div>
          <div className="mt-1.5 text-sm">
            <span className="font-bold text-primary">{formatNumber(hoveredStats?.count || 0)}</span>
            <span className="text-muted-foreground"> investment-ready projects</span>
          </div>
          <div className="text-xs text-muted-foreground">{formatMTND(Math.round(hoveredStats?.investment || 0))} required</div>
        </div>
      )}

      {/* Zoom controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-2">
        <button onClick={() => zoomBy(1.4)} className="w-9 h-9 rounded-lg border bg-card/95 backdrop-blur flex items-center justify-center hover:bg-muted transition-colors" aria-label="Zoom in">
          <ZoomIn className="w-4 h-4" />
        </button>
        <button onClick={() => zoomBy(1 / 1.4)} className="w-9 h-9 rounded-lg border bg-card/95 backdrop-blur flex items-center justify-center hover:bg-muted transition-colors" aria-label="Zoom out">
          <ZoomOut className="w-4 h-4" />
        </button>
        <button onClick={reset} className="w-9 h-9 rounded-lg border bg-card/95 backdrop-blur flex items-center justify-center hover:bg-muted transition-colors" aria-label="Reset view">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 rounded-xl border bg-card/95 backdrop-blur px-3 py-2">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Project density</div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">Low</span>
          <div className="h-2 w-24 rounded-full" style={{ background: 'linear-gradient(90deg, #bae6fd, #0c4a6e)' }} />
          <span className="text-[10px] text-muted-foreground">High</span>
        </div>
      </div>

      {/* Hint */}
      {showHint && (
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[11px] text-muted-foreground bg-card/95 backdrop-blur rounded-lg px-2.5 py-1.5 border">
          <Info className="w-3.5 h-3.5" /> Scroll to zoom · Drag to pan · Click to explore
        </div>
      )}
    </div>
  );
}