import { useCallback, useMemo, useState } from "react";
import { Play } from "lucide-react";
import {
  GALLERY,
  type GalleryPhoto,
  type GalleryReel,
  type GalleryReelVideo,
  type GalleryVideo,
  youtubeEmbed,
  youtubeId,
  youtubeThumb,
} from "@/lib/gallery";
import { Watermark } from "@/components/site/watermark";
import { ThumbImage } from "@/components/site/thumb-image";
import { PhotoViewer, type ViewerImage } from "@/components/site/photo-viewer";

type Filter = "all" | "photo" | "video" | "reel";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "photo", label: "Photos" },
  { id: "video", label: "Videos" },
  { id: "reel", label: "Reels" },
];

type LightboxImage = ViewerImage;
type ReelPhoto = Extract<GalleryReel, { src: string }>;

/** One slot in the photo grid: a single photo/video, or two vertical reel photos sharing a slot. */
type Cell =
  | { kind: "item"; item: GalleryPhoto | GalleryVideo }
  | { kind: "pair"; reels: ReelPhoto[] };

// In the "All" view, vertical reel photos go two to a slot. The first pair lands in the second
// row of the grid, then another pair every few rows.
const PAIR_FIRST_AT = 5;
const PAIR_EVERY = 9;

export function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const [playing, setPlaying] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { cells, reelsBelow } = useMemo(() => {
    const items = filter === "all" ? GALLERY : GALLERY.filter((item) => item.kind === filter);
    const wide = items.filter((item): item is GalleryPhoto | GalleryVideo => item.kind !== "reel");
    const reels = items.filter((item): item is GalleryReel => item.kind === "reel");

    const cells: Cell[] = wide.map((item) => ({ kind: "item", item }));
    let reelsBelow = reels;

    if (filter === "all") {
      // Reel photos pair up inside the grid; reel videos (if any) get their own row below.
      const photos = reels.filter((item): item is ReelPhoto => "src" in item);
      reelsBelow = reels.filter((item) => "youtube" in item);
      for (let i = 0, at = PAIR_FIRST_AT; i < photos.length; i += 2, at += PAIR_EVERY) {
        cells.splice(Math.min(at, cells.length), 0, { kind: "pair", reels: photos.slice(i, i + 2) });
      }
    }
    return { cells, reelsBelow };
  }, [filter]);

  // Every photo in the order shown, for the viewer's next/previous.
  const viewable = useMemo<ViewerImage[]>(() => {
    const out: ViewerImage[] = [];
    for (const cell of cells) {
      if (cell.kind === "pair") out.push(...cell.reels);
      else if (cell.item.kind === "photo") out.push(cell.item);
    }
    for (const reel of reelsBelow) if ("src" in reel) out.push(reel);
    return out;
  }, [cells, reelsBelow]);

  const openPhoto = useCallback(
    (item: ViewerImage) => {
      const index = viewable.findIndex((photo) => photo.src === item.src);
      if (index >= 0) setOpenIndex(index);
    },
    [viewable],
  );
  const closeViewer = useCallback(() => setOpenIndex(null), []);

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

      {cells.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cells.map((cell) =>
            cell.kind === "pair" ? (
              <ReelPairTile
                key={cell.reels.map((reel) => reel.src).join("|")}
                reels={cell.reels}
                onOpen={openPhoto}
              />
            ) : cell.item.kind === "photo" ? (
              <PhotoTile key={cell.item.src} item={cell.item} onOpen={openPhoto} />
            ) : (
              <VideoTile
                key={cell.item.youtube}
                item={cell.item}
                active={playing === cell.item.youtube}
                onPlay={() => setPlaying(cell.item.youtube)}
              />
            ),
          )}
        </div>
      ) : null}

      {reelsBelow.length > 0 ? (
        <div className={cells.length > 0 ? "mt-12" : "mt-8"}>
          {filter === "all" ? (
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-accent">Reels</p>
          ) : null}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {reelsBelow.map((item) =>
              "youtube" in item ? (
                <ReelVideoTile
                  key={item.youtube}
                  item={item}
                  active={playing === item.youtube}
                  onPlay={() => setPlaying(item.youtube)}
                />
              ) : (
                <ReelPhotoTile key={item.src} item={item} onOpen={openPhoto} />
              ),
            )}
          </div>
        </div>
      ) : null}

      {cells.length === 0 && reelsBelow.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">Nothing here yet. Check back soon.</p>
      ) : null}

      {openIndex !== null && viewable[openIndex] ? (
        <PhotoViewer
          images={viewable}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={closeViewer}
        />
      ) : null}
    </>
  );
}

function PhotoTile({
  item,
  onOpen,
}: {
  item: GalleryPhoto;
  onOpen: (item: LightboxImage) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group overflow-hidden rounded-xl text-left"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <ThumbImage
          src={item.src}
          alt={item.alt}
          className="h-full w-full object-cover transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] group-hover:scale-[1.03]"
        />
        <Watermark />
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
  item: GalleryVideo;
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

function ReelPhotoTile({
  item,
  onOpen,
}: {
  item: Extract<GalleryReel, { src: string }>;
  onOpen: (item: LightboxImage) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group overflow-hidden rounded-xl text-left"
    >
      <div className="relative aspect-[9/16] overflow-hidden bg-surface">
        <ThumbImage
          src={item.src}
          alt={item.alt}
          className="h-full w-full object-cover transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] group-hover:scale-[1.03]"
        />
        <Watermark className="right-2 top-2" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-0.5 bg-[linear-gradient(to_top,rgba(12,13,14,0.85),transparent)] px-3 py-3">
          <span className="text-sm font-medium text-fg">{item.title}</span>
          <span className="text-xs text-muted-foreground">{item.tag}</span>
        </div>
      </div>
    </button>
  );
}

function ReelVideoTile({
  item,
  active,
  onPlay,
}: {
  item: GalleryReelVideo;
  active: boolean;
  onPlay: () => void;
}) {
  const id = youtubeId(item.youtube);

  if (active) {
    return (
      <div className="overflow-hidden rounded-xl bg-surface">
        <div className="relative aspect-[9/16]">
          <iframe
            title={item.title}
            src={youtubeEmbed(id)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
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
      <div className="relative aspect-[9/16] overflow-hidden bg-surface">
        <img
          src={item.poster ?? youtubeThumb(id)}
          alt=""
          className="h-full w-full object-cover transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-bg/35" />
        <span className="absolute left-1/2 top-1/2 inline-flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg/80 text-fg">
          <Play className="h-4 w-4 fill-current" />
        </span>
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-0.5 px-3 py-3">
          <span className="text-sm font-medium text-fg">{item.title}</span>
          <span className="text-xs text-muted-foreground">{item.tag}</span>
        </div>
      </div>
    </button>
  );
}

/** One grid slot holding two vertical reel photos side by side (one if there is an odd one out). */
function ReelPairTile({
  reels,
  onOpen,
}: {
  reels: ReelPhoto[];
  onOpen: (item: LightboxImage) => void;
}) {
  if (reels.length === 1) {
    return (
      <div className="flex aspect-[16/10] justify-center overflow-hidden rounded-xl bg-surface">
        <div className="aspect-[9/16] h-full">
          <ReelHalf item={reels[0]} onOpen={onOpen} />
        </div>
      </div>
    );
  }
  return (
    <div className="grid aspect-[16/10] grid-cols-2 gap-1 overflow-hidden rounded-xl">
      {reels.map((item) => (
        <ReelHalf key={item.src} item={item} onOpen={onOpen} />
      ))}
    </div>
  );
}

function ReelHalf({ item, onOpen }: { item: ReelPhoto; onOpen: (item: LightboxImage) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group relative h-full w-full overflow-hidden bg-surface text-left"
    >
      <ThumbImage
        src={item.src}
        alt={item.alt}
        className="h-full w-full object-cover transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] group-hover:scale-[1.03]"
      />
      <Watermark className="right-2 top-2" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-0.5 bg-[linear-gradient(to_top,rgba(12,13,14,0.85),transparent)] px-3 py-3">
        <span className="text-sm font-medium text-fg">{item.title}</span>
        <span className="text-xs text-muted-foreground">{item.tag}</span>
      </div>
    </button>
  );
}
