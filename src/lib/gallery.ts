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

/**
 * Reels are vertical (9:16) media. A reel is either a vertical photo (`src` + `alt`)
 * or a vertical video (`youtube` link, Shorts links work; optional `poster` thumbnail).
 *
 * Example — add inside GALLERY below:
 *   { kind: "reel", src: "/images/my-vertical.jpg", alt: "Aerial of ...", title: "...", tag: "..." },
 *   { kind: "reel", youtube: "https://youtube.com/shorts/XXXXXXXXXXX", title: "...", tag: "..." },
 */
export type GalleryReelPhoto = {
  kind: "reel";
  src: string;
  title: string;
  tag: string;
  alt: string;
};

export type GalleryReelVideo = {
  kind: "reel";
  youtube: string;
  poster?: string;
  title: string;
  tag: string;
};

export type GalleryReel = GalleryReelPhoto | GalleryReelVideo;

export type GalleryItem = GalleryPhoto | GalleryVideo | GalleryReel;

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
  {
    kind: "photo",
    src: "/images/beach-skyline.JPG",
    title: "Beach Shoreline",
    tag: "Tourism",
    alt: "Aerial of a long sandy beach and calm blue water stretching to the horizon",
  },
  {
    kind: "photo",
    src: "/images/chick-fil-a.JPG",
    title: "Chick-fil-A Restaurant",
    tag: "Commercial",
    alt: "Aerial of a restaurant, its rooftop, drive-thru lane and parking lot at dusk",
  },
  {
    kind: "photo",
    src: "/images/golf-course-1.JPG",
    title: "Golf Course and Pond",
    tag: "Recreation",
    alt: "Aerial of a golf course with a pond, bunkers and greens beside a highway and neighbourhood",
  },
  {
    kind: "photo",
    src: "/images/neighbourhood-1.JPG",
    title: "Neighbourhood in Autumn",
    tag: "Real Estate",
    alt: "Aerial of a residential neighbourhood with fall foliage at sunset",
  },
  {
    kind: "photo",
    src: "/images/farm-land.JPG",
    title: "Farmland and Creek",
    tag: "Agriculture",
    alt: "Aerial of planted farm fields with a creek winding through them",
  },
  {
    kind: "photo",
    src: "/images/work-warehouse-1.JPG",
    title: "Commercial Property",
    tag: "Commercial",
    alt: "Aerial of a red commercial building and its parking lot in the evening",
  },
  {
    kind: "photo",
    src: "/images/penninsula.JPG",
    title: "Historic Fort on the Water",
    tag: "Tourism",
    alt: "Aerial of a historic fort with grassy earthworks on a peninsula along the lakeshore",
  },
  {
    kind: "photo",
    src: "/images/fairy-lake-boardwalk.JPG",
    title: "Fairy Lake Boardwalk",
    tag: "Conservation",
    alt: "Aerial of a boardwalk along a still waterway surrounded by autumn trees",
  },
  {
    kind: "photo",
    src: "/images/city-skyline.JPG",
    title: "River and City Skyline",
    tag: "Cityscape",
    alt: "Aerial of a wide river, industrial waterfront and a distant city skyline",
  },
  {
    kind: "photo",
    src: "/images/volleyball-night.JPG",
    title: "Volleyball Court at Night",
    tag: "Recreation",
    alt: "Aerial of a lit sand volleyball court at night",
  },
  {
    kind: "photo",
    src: "/images/tractor-farm-2.JPG",
    title: "Tractor at Work",
    tag: "Agriculture",
    alt: "Aerial of a tractor pulling a trailer across a field with crews working the rows",
  },
  {
    kind: "photo",
    src: "/images/golf-course-2.JPG",
    title: "Golf Course Fairways",
    tag: "Recreation",
    alt: "Aerial of golf course fairways, a pond and cart paths under a cloudy sky",
  },
  {
    kind: "photo",
    src: "/images/work-warehouse-2.JPG",
    title: "Industrial Building",
    tag: "Commercial",
    alt: "Aerial of an industrial building with garage doors and rooftop solar panels",
  },
  {
    kind: "photo",
    src: "/images/farmland-2.JPG",
    title: "Field and Waterway",
    tag: "Agriculture",
    alt: "Top-down aerial of a waterway curving between two cultivated fields",
  },
  {
    kind: "photo",
    src: "/images/cedarview-community-church.JPG",
    title: "Cedarview Community Church",
    tag: "Community",
    alt: "Aerial of a church building and parking lot surrounded by autumn trees",
  },
  {
    kind: "photo",
    src: "/images/forest.JPG",
    title: "Forest Canopy",
    tag: "Conservation",
    alt: "Aerial looking down on a dense mixed forest canopy",
  },
  {
    kind: "photo",
    src: "/images/river-roadside.JPG",
    title: "River and Highway",
    tag: "Landscape",
    alt: "Aerial of a highway running alongside a narrow river and forest",
  },
  {
    kind: "photo",
    src: "/images/gas-station.JPG",
    title: "Roadside Service Station",
    tag: "Commercial",
    alt: "Aerial of a gas station and shops beside a busy road with fall foliage behind",
  },
  {
    kind: "photo",
    src: "/images/neighbourhood-2.JPG",
    title: "Residential Intersection",
    tag: "Real Estate",
    alt: "Aerial of homes and a street intersection in a suburban neighbourhood",
  },
  {
    kind: "photo",
    src: "/images/farmland-3.JPG",
    title: "Field Rows",
    tag: "Agriculture",
    alt: "Aerial of long crop rows running to the horizon across a large field",
  },
  {
    kind: "photo",
    src: "/images/open-sea.JPG",
    title: "Open Water",
    tag: "Landscape",
    alt: "Aerial of open water under a cloudy sky",
  },
  {
    kind: "photo",
    src: "/images/work-warehouse-3.JPG",
    title: "Industrial Warehouse",
    tag: "Commercial",
    alt: "Aerial of a long industrial warehouse with multiple bay doors",
  },
  {
    kind: "photo",
    src: "/images/farmland-1.JPG",
    title: "Crop Rows",
    tag: "Agriculture",
    alt: "Top-down aerial of green crop rows across a field",
  },
  {
    kind: "photo",
    src: "/images/drive-thru.JPG",
    title: "Drive-Thru Entrance",
    tag: "Commercial",
    alt: "Aerial of a building's drive-thru entrance and parking area",
  },
  {
    kind: "photo",
    src: "/images/dusk-skyline.jpg",
    title: "Dusk Over the City",
    tag: "Cityscape",
    alt: "Aerial of a distant city's lights under an orange dusk horizon",
  },
  {
    kind: "photo",
    src: "/images/work-neighborhood.jpg",
    title: "Lakefront Homes",
    tag: "Real Estate",
    alt: "Aerial of lakefront homes with a floatplane and boat moored at the docks",
  },
  {
    kind: "photo",
    src: "/images/demolition-derby.jpg",
    title: "Demolition Derby Night",
    tag: "Events",
    alt: "Aerial of cars colliding in a demolition derby with a crowd in the grandstand",
  },
  {
    kind: "reel",
    src: "/images/tobermory-property-2.jpg",
    title: "Waterfront Property",
    tag: "Real Estate",
    alt: "Vertical aerial of a lakefront house on a rocky shoreline with forest and open water behind it",
  },
  {
    kind: "reel",
    src: "/images/westfield-river.jpg",
    title: "River Paddleboarder",
    tag: "Recreation",
    alt: "Vertical aerial of a paddleboarder on a calm river lined with trees under a bright blue sky",
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

/**
 * Small preview version of a photo, used for grid tiles. For `/images/foo.JPG` this is
 * `/images/thumbs/foo.jpg`. The full-size original is still what opens full-screen.
 * If a thumbnail doesn't exist yet, <ThumbImage> falls back to the original automatically.
 */
export function thumbSrc(src: string): string {
  const name = src.split("/").pop() ?? src;
  return `/images/thumbs/${name.replace(/\.[^.]+$/, "")}.jpg`;
}
