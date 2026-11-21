import { thumbSrc } from "@/lib/gallery";

/** Shows the small thumbnail of a photo, and falls back to the full-size file if none exists. */
export function ThumbImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={thumbSrc(src)}
      alt={alt}
      draggable={false}
      loading="lazy"
      decoding="async"
      className={className}
      onError={(event) => {
        const img = event.currentTarget;
        if (img.dataset.fallback !== "1") {
          img.dataset.fallback = "1";
          img.src = src;
        }
      }}
    />
  );
}
