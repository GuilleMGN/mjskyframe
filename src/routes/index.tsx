import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { QuotePanel } from "@/components/site/quote-panel";
import { ContactForm } from "@/components/site/contact-form";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

const WORK = [
  {
    src: "/images/work-skyline.jpg",
    title: "City plates",
    tag: "Stock",
    span: "md:col-span-2",
  },
  {
    src: "/images/work-hotel.jpg",
    title: "Resort marketing",
    tag: "Hospitality",
    span: "",
  },
  {
    src: "/images/work-warehouse.jpg",
    title: "Site due diligence",
    tag: "Development",
    span: "",
  },
  {
    src: "/images/work-construction.jpg",
    title: "Progress update",
    tag: "Development",
    span: "",
  },
  {
    src: "/images/work-neighborhood.jpg",
    title: "Listing context",
    tag: "Real estate",
    span: "",
  },
  {
    src: "/images/work-plaza.jpg",
    title: "Venue marketing",
    tag: "Events",
    span: "md:col-span-2",
  },
];

const SERVICES = [
  {
    title: "Real estate photography",
    copy: "Listings need more than a kitchen. Aerial stills show lot lines, neighbours, commute, and how the house sits on the land — the context that moves Ontario buyers.",
  },
  {
    title: "Hotels, resorts, and venues",
    copy: "Hospitality still sells from the ground. We shoot the property, the grounds, and the event space so a hotel, inn, farm, or racetrack looks like a destination, not a pin on a map.",
  },
  {
    title: "Development and due diligence",
    copy: "Land, progress, and portfolio updates for builders and owners. Recurring flyovers that prove what changed — without a slide deck of excuses.",
  },
  {
    title: "Stock, municipal, and conservation",
    copy: "City plates, water, and nature for businesses, municipalities, and conservation authorities. Clean footage you can license, not leftover vacation clips.",
  },
];

const STEPS = [
  { n: "01", title: "Brief", copy: "Site, dates, stills or film, and who has to buy the result." },
  { n: "02", title: "Plan", copy: "Transport Canada airspace, shot list, and a weather window that is not a prayer." },
  { n: "03", title: "Fly", copy: "Two operators. One flies. One watches the frame." },
  { n: "04", title: "Deliver", copy: "Selects in 48 hours. Graded film on the date we locked." },
];

function Home() {
  return (
    <div id="top" className="min-h-screen bg-bg text-fg">
      <SiteHeader />

      <main>
        <section className="relative min-h-[100svh] pt-16">
          <img
            src="/images/hero-campus.jpg"
            alt="Aerial of a commercial campus at blue hour"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,13,14,0.92),rgba(12,13,14,0.35)_45%,rgba(12,13,14,0.4))]" />
          <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-end px-5 pb-16 pt-24">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
              Aerial for Ontario
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] tracking-tight text-fg sm:text-6xl md:text-7xl">
              The shot from above that sells the ground.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-fg/80 sm:text-lg">
              MJ Skyframe is Matthew and Josh. We fly listings, hotels, venues, farms, and
              developments across Ontario — the context a ground camera cannot fake.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#contact">Book a shoot</a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a href="#work">See the work</a>
              </Button>
            </div>
            <a
              href="#work"
              className="mt-12 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-fg"
            >
              Scroll the reel
              <ArrowDownRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Selected work</p>
              <h2 className="mt-3 font-display text-4xl text-fg sm:text-5xl">Work that shows the lot, not the living room.</h2>
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {WORK.map((item) => (
              <figure key={item.src} className={`group overflow-hidden rounded-xl ${item.span}`}>
                <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] group-hover:scale-[1.03]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-[linear-gradient(to_top,rgba(12,13,14,0.85),transparent)] px-4 py-4">
                    <span className="text-sm font-medium text-fg">{item.title}</span>
                    <span className="text-xs text-muted-foreground">{item.tag}</span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </section>

        <section id="services" className="border-y border-border bg-surface/40">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Services</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl text-fg sm:text-5xl">
              Built for realtors, hotels, venues, and developers.
            </h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
              {SERVICES.map((s) => (
                <article key={s.title} className="bg-bg p-6 sm:p-8">
                  <h3 className="font-display text-2xl text-fg">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Process</p>
            <h2 className="mt-3 font-display text-4xl text-fg sm:text-5xl">Four beats. No circus.</h2>
            <ol className="mt-10 grid gap-6">
              {STEPS.map((step) => (
                <li key={step.n} className="grid grid-cols-[auto_1fr] gap-4 border-t border-border pt-5">
                  <span className="font-display text-2xl text-accent">{step.n}</span>
                  <div>
                    <h3 className="text-base font-medium text-fg">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{step.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <QuotePanel />
        </section>

        <section id="about" className="border-t border-border">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center">
            <img
              src="/images/about-drone.jpg"
              alt="Cinema drone over a city at dusk"
              className="aspect-[16/10] w-full rounded-xl object-cover"
            />
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">The studio</p>
              <h2 className="mt-3 font-display text-4xl text-fg sm:text-5xl">Matthew and Josh. One frame, two seats.</h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                A part-time studio with a full brief. Matthew runs the camera. Josh runs the
                airspace. We fly for Ontario realtors, inns, event spaces, farms, municipalities,
                and small businesses that need the overhead to look like a production.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Transport Canada RPAS. Insured. No stunts over crowds. If weather or airspace says
                no, we rebook — we do not deliver garbage just to keep the invoice.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-border bg-surface/40">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Contact</p>
              <h2 className="mt-3 font-display text-4xl text-fg sm:text-5xl">Give us the site. We will give you a window.</h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                Tell us the location, the date window, and whether you need listing stills, hospitality
                film, a venue, or a progress pass. We reply with a hard number — not a discovery call
                that wastes an hour.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
