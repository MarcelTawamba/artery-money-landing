type MarkProps = {
  width?: number;
  height?: number;
  className?: string;
};

/** The vessel-hub mark: six arteries radiating from a red hub to three teal nodes. */
export function ArteryMark({ width = 46, height = 46, className }: MarkProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 74 74" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g fill="none" stroke="#E8334A" strokeWidth={6} strokeLinecap="round">
        <path d="M37 37 L37 8" />
        <path d="M37 37 L62 23" />
        <path d="M37 37 L62 51" />
        <path d="M37 37 L37 66" />
        <path d="M37 37 L12 51" />
        <path d="M37 37 L12 23" />
      </g>
      <circle cx="62" cy="23" r="3.8" fill="#4ECDC4" />
      <circle cx="37" cy="66" r="3.8" fill="#4ECDC4" />
      <circle cx="12" cy="51" r="3.8" fill="#4ECDC4" />
      <circle cx="37" cy="37" r="8.5" fill="#E8334A" />
    </svg>
  );
}

type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
};

/** Full wordmark: vessel-hub mark + "Artery" type, used in the nav and footer. */
export function ArteryLogo({ width = 118, height = 29, className }: LogoProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 460 110" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g transform="translate(12,18)">
        <g fill="none" stroke="#E8334A" strokeWidth={6} strokeLinecap="round">
          <path d="M37 37 L37 8" />
          <path d="M37 37 L62 23" />
          <path d="M37 37 L62 51" />
          <path d="M37 37 L37 66" />
          <path d="M37 37 L12 51" />
          <path d="M37 37 L12 23" />
        </g>
        <circle cx="62" cy="23" r="3.8" fill="#4ECDC4" />
        <circle cx="37" cy="66" r="3.8" fill="#4ECDC4" />
        <circle cx="12" cy="51" r="3.8" fill="#4ECDC4" />
        <circle cx="37" cy="37" r="8.5" fill="#E8334A" />
      </g>
      <text x="108" y="80" fontFamily="Manrope, sans-serif" fontWeight={800} fontSize={76} letterSpacing="-3.5" fill="#F0EEE8">
        Artery
      </text>
    </svg>
  );
}
