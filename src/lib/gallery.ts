export type GalleryPhoto = {
  kind: "photo";
  src: string;
  title: string;
  tag: string;
  alt: string;
};

export type GalleryVideo = {
  kind: "video";
  youtube: string;
  title: string;
  tag: string;
};

export type GalleryItem = GalleryPhoto | GalleryVideo;

export const GALLERY: GalleryItem[] = [
  {
    kind: "video",
    youtube: "https://youtu.be/1yNUyskKDr4?si=zYZnHXoWj1AI5Tp3",
    title: "Ferris Wheel",
    tag: "Attractions",
  },
  {
    kind: "video",
    youtube: "https://youtu.be/gAOm2gWTzPM?si=LmR6cTxCFFUzD23u",
    title: "Demolition Derby",
    tag: "Events",
  },
  {
    kind: "photo",
    src: "/images/niagara-falls.jpg",
    title: "Niagara Falls",
    tag: "Cityscape",
    alt: "Aerial of a city skyline at night",
  },
  {
    kind: "photo",
    src: "/images/canadas-wonderland.jpg",
    title: "Canada's Wonderland",
    tag: "Attractions",
    alt: "Aerial of a park attraction",
  },
  {
    kind: "photo",
    src: "/images/westfield-river.png",
    title: "Westfield River",
    tag: "Conservation",
    alt: "Aerial of a river",
  },
  {
    kind: "photo",
    src: "/images/work-hotel.jpg",
    title: "Hillsburgh Pond",
    tag: "Conservation",
    alt: "Aerial of a pond",
  },
  {
    kind: "photo",
    src: "/images/floatplane-property.jpg",
    title: "Property Listing",
    tag: "Real Estate",
    alt: "Aerial of a backyard",
  },
  {
    kind: "photo",
    src: "/images/tobermory-property.jpg",
    title: "Airbnb Listing",
    tag: "Real Estate",
    alt: "Aerial of a resort",
  },
  {
    kind: "photo",
    src: "/images/corn-field.jpg",
    title: "Corn Field",
    tag: "Agriculture",
    alt: "Aerial of a farm",
  },
  {
    kind: "photo",
    src: "/images/tractor-farm.jpg",
    title: "Progress update",
    tag: "Agriculture",
    alt: "Aerial of a farm",
  },
  {
    kind: "photo",
    src: "/images/bruce-anchor-cruises.jpg",
    title: "Bruce Anchor",
    tag: "Tourism",
    alt: "Aerial of a tourist cruise",
  },
  {
    kind: "photo",
    src: "/images/tobermory-eclipse.jpg",
    title: "Bruce Anchor",
    tag: "Tourism",
    alt: "Aerial of a tourist cruise",
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
