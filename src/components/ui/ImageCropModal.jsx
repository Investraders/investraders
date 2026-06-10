import React, { useState, useRef, useCallback, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * ImageCropModal
 * Props:
 *   src        — object URL of the image to crop
 *   aspect     — desired aspect ratio (e.g. 1 for square, 16/9, undefined = free)
 *   onConfirm  — (blob) => void   called with cropped image blob
 *   onCancel   — () => void
 */
export default function ImageCropModal({ src, aspect, onConfirm, onCancel }) {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  const [imgLoaded, setImgLoaded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);

  // Natural dimensions of the image
  const [naturalSize, setNaturalSize] = useState({ w: 1, h: 1 });

  // Fixed crop area size (display)
  const CROP_W = 320;
  const CROP_H = aspect ? Math.round(CROP_W / aspect) : 320;

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.onload = () => {
      setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
      setImgLoaded(true);
      setOffset({ x: 0, y: 0 });
      setZoom(1);
    };
    img.src = src;
    imgRef.current = img;
  }, [src]);

  // Draw preview on canvas
  useEffect(() => {
    if (!imgLoaded || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = CROP_W;
    canvas.height = CROP_H;

    const scale = (CROP_W / naturalSize.w) * zoom;
    const drawW = naturalSize.w * scale;
    const drawH = naturalSize.h * scale;
    const cx = CROP_W / 2 + offset.x;
    const cy = CROP_H / 2 + offset.y;

    ctx.clearRect(0, 0, CROP_W, CROP_H);
    ctx.drawImage(imgRef.current, cx - drawW / 2, cy - drawH / 2, drawW, drawH);
  }, [imgLoaded, zoom, offset, naturalSize, CROP_W, CROP_H]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };
  const handleMouseMove = useCallback((e) => {
    if (!dragging) return;
    setOffset({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  }, [dragging]);
  const handleMouseUp = () => setDragging(false);

  // Touch support
  const handleTouchStart = (e) => {
    const t = e.touches[0];
    setDragging(true);
    dragStart.current = { x: t.clientX - offset.x, y: t.clientY - offset.y };
  };
  const handleTouchMove = useCallback((e) => {
    if (!dragging) return;
    const t = e.touches[0];
    setOffset({ x: t.clientX - dragStart.current.x, y: t.clientY - dragStart.current.y });
  }, [dragging]);

  const handleConfirm = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => onConfirm(blob), 'image/jpeg', 0.92);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div className="fixed inset-0 z-[110] bg-black/90 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="font-semibold text-base">Adjust Photo</h2>
          <button onClick={onCancel} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Crop canvas */}
        <div className="flex items-center justify-center bg-gray-100 p-4">
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-xl cursor-grab active:cursor-grabbing select-none"
            style={{ width: CROP_W, height: CROP_H }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setDragging(false)}
          >
            {imgLoaded ? (
              <canvas ref={canvasRef} className="block" style={{ width: CROP_W, height: CROP_H }} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                Loading…
              </div>
            )}
            {/* Crop grid overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
              backgroundSize: `${CROP_W/3}px ${CROP_H/3}px`,
              boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.5)',
            }} />
          </div>
        </div>

        {/* Zoom controls */}
        <div className="px-5 py-3 flex items-center gap-3 border-t">
          <button onClick={() => setZoom((z) => Math.max(z - 0.1, 0.3))} className="p-1.5 rounded-lg hover:bg-gray-100">
            <ZoomOut className="w-4 h-4 text-muted-foreground" />
          </button>
          <input
            type="range"
            min="0.3"
            max="3"
            step="0.05"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="flex-1 accent-blue-600"
          />
          <button onClick={() => setZoom((z) => Math.min(z + 0.1, 3))} className="p-1.5 rounded-lg hover:bg-gray-100">
            <ZoomIn className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={() => { setZoom(1); setOffset({ x: 0, y: 0 }); }}
            className="p-1.5 rounded-lg hover:bg-gray-100 ml-1"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground pb-1">
          Drag to reposition · Use slider to zoom
        </p>

        {/* Actions */}
        <div className="flex gap-3 px-5 pb-5">
          <Button variant="outline" className="flex-1 rounded-xl" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="flex-1 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white" onClick={handleConfirm}>
            <Check className="w-4 h-4 mr-1" /> Apply
          </Button>
        </div>
      </div>
    </div>
  );
}