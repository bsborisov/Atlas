export const AtlasLogo = () => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <defs>
        <radialGradient id="lg" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#CBA9FF" />
          <stop offset="100%" stopColor="#6C3FD4" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <polygon points="14,2 26,9 26,21 14,26 2,21 2,9" fill="url(#lg)" opacity="0.9" filter="url(#glow)" />
      <polygon points="14,6 22,10.5 22,19.5 14,23 6,19.5 6,10.5" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <circle cx="14" cy="14" r="3.5" fill="white" opacity="0.95" />
      <line x1="14" y1="2" x2="14" y2="6" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
      <line x1="14" y1="23" x2="14" y2="26" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
      <line x1="2" y1="9" x2="6" y2="10.5" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
      <line x1="26" y1="9" x2="22" y2="10.5" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
    </svg>
  );
}