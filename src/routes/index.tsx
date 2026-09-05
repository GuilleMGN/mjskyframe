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
    title: "Downtown campaign",
    tag: "Advertising",
    span: "md:col-span-2",
  },
  {
    src: "/images/work-hotel.jpg",
    title: "Coastal resort",
    tag: "Hospitality",
    span: "",
  },
  {
    src: "/images/work-warehouse.jpg",
    title: "Logistics yard",
    tag: "Industrial",
    span: "",
  },
  {
    src: "/images/work-construction.jpg",
    title: "Mid-rise progress",
    tag: "Construction",
    span: "",
  },
  {
    src: "/images/work-neighborhood.jpg",
    title: "New-home release",
    tag: "Real estate",
    span: "",
  },
  {
    src: "/images/work-plaza.jpg",
    title: "Retail plaza",
    tag: "Commercial",
    span: "md:col-span-2",
  },
];

const SERVICES = [
  {
    title: "Advertising film",
    copy: "Hero establishing shots, product in place, and the overhead that makes a 15-second spot look expensive.",
  },
  {
    title: "Listings and developments",
    copy: "Stills and a short walkthrough that sell the site, not the living room staging.",
  },
  {
    title: "Job-site progress",
    copy: "Monthly flyovers for owners, GCs, and lenders who want proof, not a slide deck.",
  },
  {
    title: "Brand and social",
    copy: "Vertical cuts, looping plates, and stills your agency can actually grade.",
  },
];

const STEPS = [
  { n: "01", title: "Brief", copy: "Site, dates, airspace, and what the ad has to do." },
  { n: "02", title: "Plan", copy: "FAA check, shot list, and a weather window that is not a prayer." },
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
              Aerial for business
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] tracking-tight text-fg sm:text-6xl md:text-7xl">
              The shot from above that sells the ground.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-fg/80 sm:text-lg">
              MJ Skyframe is Matthew and Josh. Commercial drone stills and film for ads, listings,
              and job sites — not birthday parties, not hobby reels.
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
              <h2 className="mt-3 font-display text-4xl text-fg sm:text-5xl">Frames that close deals.</h2>
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
              Built for agencies, developers, and GCs.
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
                We fly cine-grade aircraft for commercial work. Matthew runs the camera. Josh runs the
                airspace. You get selects that look like a production, not a weekend gadget.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Insured. Part 107. No stunts over crowds. If the weather or the FAA says no, we say no
                and rebook — we do not deliver garbage just to keep the invoice.
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
                Tell us the location, the date window, and whether you need stills, film, or both.
                We reply with a hard number — not a discovery call that wastes an hour.
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
