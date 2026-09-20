import { Logo } from "@/components/site/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-fg">
            <Logo className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium">MJ Skyframe</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Aerial stills and film for Ontario listings, hotels, venues, and developments. Matthew and Josh.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">Transport Canada RPAS. Licensed and insured.</p>
      </div>
    </footer>
  );
}
