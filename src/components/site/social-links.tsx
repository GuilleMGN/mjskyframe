import { Facebook, Instagram, Linkedin, Mail, Youtube } from "lucide-react";

const LINKS = [
  {
    href: "https://www.youtube.com/@MJSkyframe",
    label: "YouTube",
    icon: Youtube,
  },
  {
    href: "https://www.instagram.com/mjskyframe/",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://x.com/mjskyframe",
    label: "X",
    icon: XLogo,
  },
  {
    href: "https://www.facebook.com/profile.php?id=61595132241315",
    label: "Facebook",
    icon: Facebook,
  },
  {
    href: "https://www.linkedin.com/in/mjskyframe",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "mailto:mjskyframe@gmail.com",
    label: "Email",
    icon: Mail,
  },
];

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

export function SocialLinks() {
  return (
    <div className="mt-12 border-t border-border pt-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Follow the work</p>
      <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {LINKS.map((item) => {
          const Icon = item.icon;
          const external = item.href.startsWith("http");
          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-label={item.label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex h-11 items-center justify-center gap-2 rounded-md border border-border text-muted-foreground transition-colors duration-[var(--motion-quick)] hover:border-accent hover:text-fg"
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs sm:sr-only">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
