import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

const PACKAGES = [
  { id: "listing", label: "Listing stills", base: 350, unit: "property" },
  { id: "ads", label: "Ad campaign day", base: 1800, unit: "day" },
  { id: "progress", label: "Construction monthly", base: 650, unit: "month" },
  { id: "brand", label: "Brand film", base: 2400, unit: "day" },
] as const;

export function QuotePanel() {
  const [pkg, setPkg] = useState<(typeof PACKAGES)[number]["id"]>("ads");
  const [count, setCount] = useState(1);
  const selected = PACKAGES.find((p) => p.id === pkg) ?? PACKAGES[1];
  const total = useMemo(() => selected.base * count, [selected, count]);

  return (
    <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Starting range</p>
      <h3 className="mt-3 font-display text-3xl text-fg">Ballpark a shoot</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Not a bid. A honest floor so you know if we are in the same zip code.
      </p>
      <div className="mt-6 grid gap-2">
        {PACKAGES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setPkg(item.id)}
            className={`flex h-12 items-center justify-between rounded-md border px-4 text-left text-sm transition-colors duration-[var(--motion-quick)] ${
              pkg === item.id
                ? "border-accent bg-bg text-fg"
                : "border-border bg-transparent text-muted-foreground hover:text-fg"
            }`}
          >
            <span>{item.label}</span>
            <span className="tabular-nums">${item.base.toLocaleString()}</span>
          </button>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Quantity</span>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="h-11 w-11 px-0"
            onClick={() => setCount((n) => Math.max(1, n - 1))}
            aria-label="Decrease quantity"
          >
            −
          </Button>
          <span className="w-8 text-center tabular-nums text-fg">{count}</span>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="h-11 w-11 px-0"
            onClick={() => setCount((n) => Math.min(12, n + 1))}
            aria-label="Increase quantity"
          >
            +
          </Button>
        </div>
      </div>
      <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
        <div>
          <p className="text-xs text-muted-foreground">From / {selected.unit}</p>
          <p className="font-display text-4xl tabular-nums text-fg">${total.toLocaleString()}</p>
        </div>
        <Button asChild>
          <a href="#contact">Lock a date</a>
        </Button>
      </div>
    </div>
  );
}
