/**
 * MJ Skyframe gallery — this is the only file you need to edit
 * when you add stills or YouTube films.
 *
 * PHOTOS
 *   1. Drop a compressed JPEG/WebP into public/images/ (under ~1 MB each).
 *   2. Add a { kind: "photo", ... } object below.
 *   3. src is the public path, e.g. "/images/listing-oakville.jpg"
 *
 * VIDEOS
 *   1. Upload the film to your YouTube channel (public or unlisted).
 *   2. Paste the watch URL or the 11-character id into `youtube`.
 *   3. Add a { kind: "video", ... } object below.
 *
 * The two films below are public examples so the page is not empty.
 * Replace them with your own links when the channel is ready.
 */

export type GalleryPhoto = {
  kind: "photo";
  src: string;
  title: string;
  tag: string;
  alt: string;
};

export type GalleryVideo = {
  kind: "video";
  /** Full YouTube URL or the 11-character video id. */
  youtube: string;
  title: string;
  tag: string;
};

export type GalleryItem = GalleryPhoto | GalleryVideo;

export const GALLERY: GalleryItem[] = [
  {
    kind: "video",
    youtube: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    title: "Example reel — replace with yours",
    tag: "Film",
  },
  {
    kind: "photo",
    src: "/images/work-skyline.jpg",
    title: "City plates",
    tag: "Stock",
    alt: "Aerial of a city skyline at dusk",
  },
  {
    kind: "photo",
    src: "/images/work-hotel.jpg",
    title: "Resort marketing",
    tag: "Hospitality",
    alt: "Aerial of a hotel and grounds",
  },
  {
    kind: "video",
    youtube: "https://www.youtube.com/watch?v=H_t7kuIiRoo",
    title: "Example aerial — replace with yours",
    tag: "Film",
  },
  {
    kind: "photo",
    src: "/images/work-neighborhood.jpg",
    title: "Listing context",
    tag: "Real estate",
    alt: "Aerial of a neighbourhood and lot lines",
  },
  {
    kind: "photo",
    src: "/images/work-warehouse.jpg",
    title: "Site due diligence",
    tag: "Development",
    alt: "Aerial of an industrial site",
  },
  {
    kind: "photo",
    src: "/images/work-construction.jpg",
    title: "Progress update",
    tag: "Development",
    alt: "Aerial of a construction site",
  },
  {
    kind: "photo",
    src: "/images/work-plaza.jpg",
    title: "Venue marketing",
    tag: "Events",
    alt: "Aerial of a public plaza",
  },
];

export function youtubeId(input: string): string {
  const trimmed = input.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    const fromQuery = url.searchParams.get("v");
    if (fromQuery) return fromQuery;
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0] ?? trimmed;
    }
    const nested = url.pathname.match(/\/(?:embed|shorts|live)\/([\w-]{11})/);
    if (nested?.[1]) return nested[1];
  } catch {
    /* not a URL — fall through */
  }
  return trimmed;
}

export function youtubeThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function youtubeEmbed(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
}
