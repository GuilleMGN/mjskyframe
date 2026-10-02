import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ENDPOINT = "https://formsubmit.co/ajax/mjskyframe@gmail.com";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("");
  const [brief, setBrief] = useState("");
  const [honey, setHoney] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company: company.trim() || "—",
          subject,
          message: brief,
          _replyto: email,
          _subject: `MJ Skyframe — ${subject}`,
          _template: "table",
          _captcha: "false",
          _honey: honey,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean | string;
        message?: string;
      };
      const ok = data.success === true || data.success === "true";
      if (!res.ok || !ok) {
        throw new Error(data.message || "Could not send.");
      }
      setSent(true);
      setName("");
      setEmail("");
      setCompany("");
      setSubject("");
      setBrief("");
    } catch {
      setError("Could not send. Email us at mjskyframe@gmail.com or try again.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-border bg-surface p-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Received</p>
        <h3 className="mt-3 font-display text-3xl text-fg">We have the brief.</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          That landed in the MJ Skyframe inbox. Matthew or Josh will reply within one business day
          with a window, a price, and whether the airspace is even legal that week.
        </p>
        <Button type="button" variant="secondary" className="mt-6" onClick={() => setSent(false)}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative rounded-xl border border-border bg-surface p-5 sm:p-6">
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honey}
            onChange={(e) => setHoney(e.target.value)}
            suppressHydrationWarning
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4 grid gap-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          name="company"
          autoComplete="organization"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <div className="mt-4 grid gap-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          required
          placeholder="Listing stills, hotel reel, venue, progress pass…"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="mt-4 grid gap-2">
        <Label htmlFor="brief">What are we flying?</Label>
        <Textarea
          id="brief"
          name="message"
          required
          placeholder="Site, date window, listing / hotel / venue / development."
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
        />
      </div>
      {error ? <p className="mt-4 text-sm text-accent">{error}</p> : null}
      <Button type="submit" className="mt-6 w-full sm:w-auto" disabled={busy}>
        {busy ? "Sending…" : "Request a date"}
      </Button>
    </form>
  );
}
