import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "mj-skyframe-inquiries";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [brief, setBrief] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const inquiry = {
      name,
      email,
      company,
      brief,
      at: new Date().toISOString(),
    };
    const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as unknown[];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([inquiry, ...prev].slice(0, 20)));
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-border bg-surface p-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Received</p>
        <h3 className="mt-3 font-display text-3xl text-fg">We have the brief.</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Matthew or Josh will reply within one business day with a window, a price, and whether the
          airspace is even legal that week.
        </p>
        <Button type="button" variant="secondary" className="mt-6" onClick={() => setSent(false)}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-border bg-surface p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4 grid gap-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>
      <div className="mt-4 grid gap-2">
        <Label htmlFor="brief">What are we flying?</Label>
        <Textarea
          id="brief"
          required
          placeholder="Site, date window, listing / hotel / venue / development."
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
        />
      </div>
      <Button type="submit" className="mt-6 w-full sm:w-auto">
        Request a date
      </Button>
    </form>
  );
}
