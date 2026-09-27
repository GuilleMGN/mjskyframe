import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [{ title: "Work — MJ Skyframe" }],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <SiteHeader />
      <main className="pt-16">
        <section className="mx-auto max-w-6xl px-5 pb-10 pt-16">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Gallery</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-fg sm:text-6xl">
            Stills and film from above.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Click a still to open it. Play a film in place. Listing, hospitality, and
            development work from Ontario — stills we host here, films from our YouTube channel.
          </p>
        </section>
        <section className="mx-auto max-w-6xl px-5 pb-20">
          <GalleryGrid />
        </section>
        <section className="border-t border-border bg-surface/40">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-16 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-3xl text-fg sm:text-4xl">Need this over your site?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Listings, hotels, venues, developments. Give us the location and a date window.
              </p>
            </div>
            <Button asChild size="lg">
              <Link to="/" hash="contact">
                Book a shoot
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
