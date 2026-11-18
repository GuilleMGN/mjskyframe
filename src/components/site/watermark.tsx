/**
 * Subtle "@mjskyframe" mark laid over a photo. Place it inside a `relative` container
 * that wraps the image. It never blocks clicks and can't be selected as text.
 */
export function Watermark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute right-3 top-3 select-none text-[11px] font-medium tracking-[0.08em] text-white/55 [text-shadow:0_1px_3px_rgba(0,0,0,0.55)] sm:text-xs ${className}`}
    >
      @mjskyframe
    </span>
  );
}
