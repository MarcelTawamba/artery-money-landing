type IconProps = {
  width?: number;
  height?: number;
  className?: string;
};

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconCash({ width = 15, height = 15, className }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

export function IconCard({ width = 15, height = 15, className }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  );
}

export function IconBank({ width = 15, height = 15, className }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="M3 21h18" />
      <path d="M5 21V10l7-5 7 5v11" />
      <path d="M9 21v-6h6v6" />
    </svg>
  );
}

export function IconNeobank({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg width={width} height={height} {...base} strokeWidth={2} className={className}>
      <rect x="2" y="6" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 14h4" />
    </svg>
  );
}

export function IconCollection({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg width={width} height={height} {...base} strokeWidth={2} className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
    </svg>
  );
}

export function IconLiquidity({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg width={width} height={height} {...base} strokeWidth={2} className={className}>
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

export function IconLedger({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg width={width} height={height} {...base} strokeWidth={2} className={className}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 5v6a9 3 0 0 1-18 0V5" />
      <path d="M21 11v6a9 3 0 0 1-18 0v-6" />
    </svg>
  );
}

export function IconTrust({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg width={width} height={height} {...base} strokeWidth={2} className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function IconExchanges({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg width={width} height={height} {...base} strokeWidth={2} className={className}>
      <path d="M21 7L13 15l-4-4-6 6" />
      <path d="M21 7v6" />
      <path d="M21 7h-6" />
    </svg>
  );
}

export function IconMarketplaces({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg width={width} height={height} {...base} strokeWidth={2} className={className}>
      <path d="M3 7l2-4h14l2 4" />
      <path d="M3 7h18v13H3z" />
      <path d="M9 11v2a3 3 0 006 0v-2" />
    </svg>
  );
}

export function IconEcommerce({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg width={width} height={height} {...base} strokeWidth={2} className={className}>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
    </svg>
  );
}

export function IconCheck({
  width = 12,
  height = 12,
  strokeWidth = 3,
  className,
}: IconProps & { strokeWidth?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
