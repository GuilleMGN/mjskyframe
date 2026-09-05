export function Logo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="4" y="7" width="24" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <line x1="3" y1="16" x2="29" y2="16" stroke="currentColor" strokeWidth="1" />
      <circle cx="16" cy="16" r="2" fill="currentColor" />
    </svg>
  );
}
