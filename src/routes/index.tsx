import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { QuotePanel } from "@/components/site/quote-panel";
import { ContactForm } from "@/components/site/contact-form";
import { SocialLinks } from "@/components/site/social-links";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

const WORK = [
  {
    src: "/images/niagara-falls.jpg",
    title: "City plates",
    tag: "Stock",
    span: "",
  },
  {
    src: "/images/work-plaza.jpg",
    title: "Venue marketing",
    tag: "Events",
    span: "",
  },
  {
    src: "/images/tractor-farm.jpg",
    title: "Progress update",
    tag: "Development",
    span: "",
  },
  {
    src: "/images/floatplane-property.jpg",
    title: "Listing context",
    tag: "Real estate",
    span: "",
  },
];

const SERVICES = [
  {
    title: "Real estate photography",
    copy: "Show the property in its full context. Our aerial imagery captures the home, lot, surrounding neighbourhood, and its relationship to the landscape.",
  },
  {
    title: "Hotels, resorts, and venues",
    copy: "Give guests more than a location. Our aerial imagery captures the property, grounds, and surrounding spaces to showcase hotels, inns, farms, and event venues as destinations worth experiencing.",
  },
  {
    title: "Development and progress updates",
    copy: "Track progress from above. We provide clear, consistent aerial documentation for developers and property owners, capturing site conditions, construction progress, and changes over time.",
  },
  {
    title: "Stock, municipal, and conservation",
    copy: "Professional aerial footage of cities, waterways, landscapes, and natural spaces for businesses, municipalities, and conservation organizations—captured for licensing, campaigns, and ongoing media needs.",
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
            src="/images/markham-fair-fireworks.jpg"
            alt="Aerial of a night shot with fireworks"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,13,14,0.92),rgba(12,13,14,0.35)_45%,rgba(12,13,14,0.4))]" />
          <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-end px-5 pb-16 pt-24">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
              Aerial for Ontario
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] tracking-tight text-fg sm:text-6xl md:text-7xl">
              See the Bigger Picture.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-fg/80 sm:text-lg">
              MJ Skyframe is an Ontario-based aerial production team specializing in professional drone photography and video for
              listings, hotels, venues, farms, and developments—capturing the perspective, scale, and context that only the sky can provide.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#contact">Book a shoot</a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/work">See the work</Link>
              </Button>
            </div>
            <a
              href="#work"
              className="mt-12 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-fg"
            >
              More details
              <ArrowDownRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Selected work</p>
              <h2 className="mt-3 font-display text-4xl text-fg sm:text-5xl">Work that shows the lot, not the living room.</h2>
            </div>
            <Button asChild variant="secondary">
              <Link to="/work">View gallery</Link>
            </Button>
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
              Professional drone photography & video across Ontario.
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
            <h2 className="mt-3 font-display text-4xl text-fg sm:text-5xl">Four step process.</h2>
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
              <h2 className="mt-3 font-display text-4xl text-fg sm:text-5xl">Small team. Full production capability.</h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Matthew and Josh bring professional drone cinematography to Ontario businesses,
                properties, and destinations. From realtors and inns to event spaces, farms,
                municipalities, and small businesses, we create high-impact aerial visuals designed
                to showcase every location from a perspective traditional photography simply can't reach.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-border bg-surface/40">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Contact</p>
                <h2 className="mt-3 font-display text-4xl text-fg sm:text-5xl">Give us the site. We will give you a window.</h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Your satisfaction, safety, and peace of mind are our priorities. As Transport Canada-compliant
                  RPAS operators, we maintain appropriate insurance and conduct every flight with professionalism
                  and consideration for our clients, their properties, and the surrounding environment.
                  We never compromise on safety or quality. If weather conditions or airspace restrictions prevent
                  us from capturing the footage you deserve, we will work with you to reschedule at a convenient time.
                  Our commitment is to deliver exceptional aerial imagery—not simply to complete a booking.
                </p>
              </div>
              <ContactForm />
            </div>
            <SocialLinks />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
