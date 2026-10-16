import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/site/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link to="/" className="flex items-center gap-2 text-fg">
            <Logo className="h-7 w-auto" />
            <span className="text-sm font-medium">MJ Skyframe</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Aerial film and photography for Ontario.
            <br />
            Brought to you by Matthew and Josh.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <div className="flex gap-5 text-sm">
            <a
              href="/#top"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  window.history.replaceState(null, "", "/");
                }
              }}
              className="text-muted-foreground hover:text-fg"
            >
              Home
            </a>
            <Link to="/gallery" className="text-muted-foreground hover:text-fg">
              Gallery
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">Transport Canada RPAS. Licensed and insured.</p>
        </div>
      </div>
    </footer>
  );
}
