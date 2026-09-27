import { useEffect, useMemo, useState } from "react";
import { Play, X } from "lucide-react";
import {
  GALLERY,
  type GalleryItem,
  type GalleryPhoto,
  youtubeEmbed,
  youtubeId,
  youtubeThumb,
} from "@/lib/gallery";

type Filter = "all" | "photo" | "video";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "photo", label: "Stills" },
  { id: "video", label: "Film" },
];

export function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const [playing, setPlaying] = useState<string | null>(null);
  const [open, setOpen] = useState<GalleryPhoto | null>(null);

  const items = useMemo(
    () => (filter === "all" ? GALLERY : GALLERY.filter((item) => item.kind === filter)),
    [filter],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={`h-11 rounded-md border px-4 text-sm transition-colors duration-[var(--motion-quick)] ${
              filter === item.id
                ? "border-accent bg-surface text-fg"
                : "border-border text-muted-foreground hover:text-fg"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((item) =>
          item.kind === "photo" ? (
            <PhotoTile key={item.src} item={item} onOpen={setOpen} />
          ) : (
            <VideoTile
              key={item.youtube}
              item={item}
              active={playing === item.youtube}
              onPlay={() => setPlaying(item.youtube)}
            />
          ),
        )}
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-bg/90 p-4"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
        >
          <button
            type="button"
            className="absolute right-4 top-20 inline-flex h-11 w-11 items-center justify-center rounded-md text-fg"
            aria-label="Close"
            onClick={() => setOpen(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <figure className="max-h-[85svh] max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <img
              src={open.src}
              alt={open.alt}
              className="max-h-[80svh] w-full rounded-xl object-contain"
            />
            <figcaption className="mt-3 flex items-center justify-between text-sm">
              <span className="text-fg">{open.title}</span>
              <span className="text-muted-foreground">{open.tag}</span>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}

function PhotoTile({
  item,
  onOpen,
}: {
  item: GalleryPhoto;
  onOpen: (item: GalleryPhoto) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group overflow-hidden rounded-xl text-left"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <img
          src={item.src}
          alt={item.alt}
          className="h-full w-full object-cover transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-[linear-gradient(to_top,rgba(12,13,14,0.85),transparent)] px-4 py-4">
          <span className="text-sm font-medium text-fg">{item.title}</span>
          <span className="text-xs text-muted-foreground">{item.tag}</span>
        </div>
      </div>
    </button>
  );
}

function VideoTile({
  item,
  active,
  onPlay,
}: {
  item: Extract<GalleryItem, { kind: "video" }>;
  active: boolean;
  onPlay: () => void;
}) {
  const id = youtubeId(item.youtube);

  if (active) {
    return (
      <div className="overflow-hidden rounded-xl bg-surface">
        <div className="relative aspect-video">
          <iframe
            title={item.title}
            src={youtubeEmbed(id)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm font-medium text-fg">{item.title}</span>
          <span className="text-xs text-muted-foreground">{item.tag}</span>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onPlay}
      className="group overflow-hidden rounded-xl text-left"
    >
      <div className="relative aspect-video overflow-hidden bg-surface">
        <img
          src={youtubeThumb(id)}
          alt=""
          className="h-full w-full object-cover transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-bg/35" />
        <span className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg/80 text-fg">
          <Play className="h-5 w-5 fill-current" />
        </span>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 py-4">
          <span className="text-sm font-medium text-fg">{item.title}</span>
          <span className="text-xs text-muted-foreground">{item.tag}</span>
        </div>
      </div>
    </button>
  );
}
