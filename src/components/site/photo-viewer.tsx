import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { thumbSrc, type GalleryPhoto } from "@/lib/gallery";
import { Watermark } from "@/components/site/watermark";

/** What the viewer needs for each photo (works for wide photos and vertical reel photos). */
export type ViewerImage = Pick<GalleryPhoto, "src" | "alt" | "title" | "tag">;

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 1.5;
const DOUBLE_TAP_ZOOM = 2.5;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

// Fullscreen helpers (with the older WebKit-prefixed names for Safari).
type FsDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => void;
  webkitFullscreenEnabled?: boolean;
};
type FsElement = HTMLElement & { webkitRequestFullscreen?: () => void };

const fullscreenElement = () => {
  const doc = document as FsDocument;
  return doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
};
const fullscreenSupported = () => {
  const doc = document as FsDocument;
  return Boolean(doc.fullscreenEnabled || doc.webkitFullscreenEnabled);
};

type View = { s: number; x: number; y: number };

const BUTTON =
  "inline-flex h-10 w-10 items-center justify-center rounded-full text-fg transition-colors hover:bg-white/10 disabled:opacity-40 sm:h-11 sm:w-11";

/**
 * Full-screen photo viewer: previous/next (buttons, arrow keys, swipe), zoom (buttons, +/- keys,
 * mouse wheel, double-click, pinch), drag to pan while zoomed, and a fullscreen toggle.
 */
export function PhotoViewer({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: ViewerImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const image = images[index];
  const count = images.length;

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  const [view, setView] = useState<View>({ s: 1, x: 0, y: 0 });
  const viewRef = useRef<View>(view);
  const [dragging, setDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  // Show the small thumbnail right away, then the full-size photo once it has loaded.
  const [loaded, setLoaded] = useState<ReadonlySet<string>>(() => new Set());
  const shown = loaded.has(image.src) ? image.src : thumbSrc(image.src);

  const commit = useCallback((next: View) => {
    viewRef.current = next;
    setView(next);
  }, []);

  const go = useCallback(
    (step: number) => {
      if (count < 2) return;
      commit({ s: 1, x: 0, y: 0 });
      onIndexChange((index + step + count) % count);
    },
    [commit, count, index, onIndexChange],
  );

  // How far the photo may be dragged at a given zoom level (so it can't leave the screen).
  const limits = useCallback((scale: number) => {
    const stage = stageRef.current;
    const photo = photoRef.current;
    if (!stage || !photo) return { mx: 0, my: 0 };
    return {
      mx: Math.max(0, (photo.offsetWidth * scale - stage.clientWidth) / 2),
      my: Math.max(0, (photo.offsetHeight * scale - stage.clientHeight) / 2),
    };
  }, []);

  // Zoom to `next`, keeping the point (cx, cy) — measured from the stage centre — fixed.
  const zoomAt = useCallback(
    (next: number, cx = 0, cy = 0) => {
      const current = viewRef.current;
      const clamped = clamp(next, MIN_ZOOM, MAX_ZOOM);
      const s = clamped < 1.02 ? MIN_ZOOM : clamped;
      if (s === current.s) return;
      const k = s / current.s;
      const { mx, my } = limits(s);
      commit(
        s === MIN_ZOOM
          ? { s, x: 0, y: 0 }
          : {
              s,
              x: clamp(cx - (cx - current.x) * k, -mx, mx),
              y: clamp(cy - (cy - current.y) * k, -my, my),
            },
      );
    },
    [commit, limits],
  );

  const toggleFullscreen = useCallback(() => {
    const doc = document as FsDocument;
    if (fullscreenElement()) {
      (doc.exitFullscreen ?? doc.webkitExitFullscreen)?.call(doc);
      return;
    }
    const el = rootRef.current as FsElement | null;
    if (!el) return;
    try {
      const result = (el.requestFullscreen ?? el.webkitRequestFullscreen)?.call(el);
      if (result instanceof Promise) result.catch(() => {});
    } catch {
      // Fullscreen blocked by the browser; the viewer still fills the page.
    }
  }, []);

  // Load the full-size file for the current photo, then warm up the next one.
  useEffect(() => {
    let live = true;
    const showFull = () => {
      if (!live) return;
      setLoaded((prev) => (prev.has(image.src) ? prev : new Set(prev).add(image.src)));
      const next = images[(index + 1) % count];
      if (next && next.src !== image.src) new Image().src = next.src;
    };
    const full = new Image();
    full.onload = showFull;
    full.src = image.src;
    // Already cached (e.g. seen before): go straight to full size.
    if (full.complete && full.naturalWidth > 0) showFull();
    return () => {
      live = false;
    };
  }, [count, image.src, images, index]);

  // Lock page scroll while open, focus the viewer, and leave fullscreen when closing.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setCanFullscreen(fullscreenSupported());
    rootRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      if (fullscreenElement()) {
        const doc = document as FsDocument;
        (doc.exitFullscreen ?? doc.webkitExitFullscreen)?.call(doc);
      }
    };
  }, []);

  useEffect(() => {
    const sync = () => setIsFullscreen(Boolean(fullscreenElement()));
    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync);
    return () => {
      document.removeEventListener("fullscreenchange", sync);
      document.removeEventListener("webkitfullscreenchange", sync);
    };
  }, []);

  // Keyboard shortcuts.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      switch (event.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          go(1);
          break;
        case "ArrowLeft":
          go(-1);
          break;
        case "+":
        case "=":
          zoomAt(viewRef.current.s * ZOOM_STEP);
          break;
        case "-":
        case "_":
          zoomAt(viewRef.current.s / ZOOM_STEP);
          break;
        case "0":
          zoomAt(1);
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        default:
          return;
      }
      event.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose, toggleFullscreen, zoomAt]);

  // Mouse wheel / trackpad zoom (needs a non-passive listener so the page doesn't scroll).
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const rect = stage.getBoundingClientRect();
      zoomAt(
        viewRef.current.s * Math.exp(-event.deltaY * 0.002),
        event.clientX - (rect.left + rect.width / 2),
        event.clientY - (rect.top + rect.height / 2),
      );
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  // Pointer gestures: swipe to change photo, drag to pan when zoomed, pinch to zoom.
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; scale: number } | null>(null);
  const pan = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);
  const tap = useRef<{ x: number; y: number; moved: boolean; backdrop: boolean } | null>(null);

  const startPanFrom = (point: { x: number; y: number }) => {
    const { s, x, y } = viewRef.current;
    pan.current = s > 1 ? { x: point.x, y: point.y, vx: x, vy: y } : null;
    setDragging(s > 1);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    // A mouse is always a single pointer; drop any stale entry (e.g. released outside the window).
    if (event.pointerType === "mouse") pointers.current.clear();
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y) || 1, scale: viewRef.current.s };
      pan.current = null;
      tap.current = null;
      setDragging(true);
    } else if (pointers.current.size === 1) {
      tap.current = {
        x: event.clientX,
        y: event.clientY,
        moved: false,
        backdrop: !(event.target as HTMLElement).closest("[data-photo]"),
      };
      startPanFrom({ x: event.clientX, y: event.clientY });
    }
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pinch.current && pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const rect = event.currentTarget.getBoundingClientRect();
      zoomAt(
        (pinch.current.scale * Math.hypot(a.x - b.x, a.y - b.y)) / pinch.current.dist,
        (a.x + b.x) / 2 - (rect.left + rect.width / 2),
        (a.y + b.y) / 2 - (rect.top + rect.height / 2),
      );
      return;
    }

    const t = tap.current;
    if (t && Math.hypot(event.clientX - t.x, event.clientY - t.y) > 8) t.moved = true;

    const p = pan.current;
    if (p) {
      const { s } = viewRef.current;
      const { mx, my } = limits(s);
      commit({
        s,
        x: clamp(p.vx + event.clientX - p.x, -mx, mx),
        y: clamp(p.vy + event.clientY - p.y, -my, my),
      });
    }
  };

  const onPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.delete(event.pointerId)) return;

    if (pointers.current.size > 0) {
      // One finger left after a pinch: carry on panning from where it is.
      pinch.current = null;
      tap.current = null;
      startPanFrom([...pointers.current.values()][0]);
      return;
    }

    const t = tap.current;
    pinch.current = null;
    pan.current = null;
    tap.current = null;
    setDragging(false);
    if (!t || event.type !== "pointerup") return;

    const dx = event.clientX - t.x;
    const dy = event.clientY - t.y;
    if (viewRef.current.s === 1 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      go(dx < 0 ? 1 : -1);
    } else if (!t.moved && t.backdrop) {
      onClose();
    }
  };

  const onDoubleClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;
    if (viewRef.current.s > 1) {
      zoomAt(1);
      return;
    }
    const rect = stage.getBoundingClientRect();
    zoomAt(
      DOUBLE_TAP_ZOOM,
      event.clientX - (rect.left + rect.width / 2),
      event.clientY - (rect.top + rect.height / 2),
    );
  };

  const zoomed = view.s > 1.001;

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      className="fixed inset-0 z-[60] bg-black/95 outline-none"
      role="dialog"
      aria-modal="true"
      aria-label={`${image.title} — photo viewer`}
    >
      {/* Photo stage */}
      <div
        ref={stageRef}
        className="absolute inset-0 flex items-center justify-center overflow-hidden pb-20 pt-14"
        style={{ touchAction: "none" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        <div
          ref={photoRef}
          data-photo
          onDoubleClick={onDoubleClick}
          className={`relative select-none ${dragging ? "" : "transition-transform duration-150 ease-out"} ${
            zoomed ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"
          }`}
          style={{ transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.s})` }}
        >
          <img
            src={shown}
            alt={image.alt}
            draggable={false}
            onError={() => {
              // No thumbnail for this photo: use the full-size file instead.
              if (shown !== image.src) {
                setLoaded((prev) => new Set(prev).add(image.src));
              }
            }}
            className="block max-h-[calc(100svh-9rem)] max-w-[100vw] rounded-sm object-contain"
          />
          <Watermark className="right-3 top-3 sm:text-sm" />
        </div>
      </div>

      {/* Caption + close */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-4 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),transparent)] px-4 py-3 sm:px-6">
        <div className="min-w-0 pt-1">
          <p className="truncate text-sm font-medium text-fg">{image.title}</p>
          <p className="truncate text-xs text-muted-foreground">{image.tag}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className={`${BUTTON} pointer-events-auto shrink-0`}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Side arrows (larger screens) */}
      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg/70 text-fg backdrop-blur transition-colors hover:bg-bg md:inline-flex"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg/70 text-fg backdrop-blur transition-colors hover:bg-bg md:inline-flex"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      ) : null}

      {/* Bottom toolbar */}
      <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center px-3">
        <div className="flex items-center gap-0.5 rounded-full border border-border bg-bg/80 px-1.5 py-1 backdrop-blur sm:gap-1 sm:px-2">
          {count > 1 ? (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={BUTTON}>
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span
                className="min-w-[3.5rem] px-1 text-center text-xs tabular-nums text-muted-foreground sm:text-sm"
                aria-live="polite"
              >
                {index + 1} / {count}
              </span>
              <button type="button" onClick={() => go(1)} aria-label="Next photo" className={BUTTON}>
                <ChevronRight className="h-5 w-5" />
              </button>
              <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
            </>
          ) : null}
          <button
            type="button"
            onClick={() => zoomAt(view.s / ZOOM_STEP)}
            disabled={view.s <= MIN_ZOOM}
            aria-label="Zoom out"
            className={BUTTON}
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => zoomAt(1)}
            aria-label="Reset zoom"
            className="inline-flex h-10 min-w-[3rem] items-center justify-center rounded-full px-1 text-xs tabular-nums text-fg transition-colors hover:bg-white/10 sm:h-11 sm:text-sm"
          >
            {Math.round(view.s * 100)}%
          </button>
          <button
            type="button"
            onClick={() => zoomAt(view.s * ZOOM_STEP)}
            disabled={view.s >= MAX_ZOOM}
            aria-label="Zoom in"
            className={BUTTON}
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          {canFullscreen ? (
            <>
              <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                className={BUTTON}
              >
                {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
