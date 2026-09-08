/**
 * Hero figure — an original vector composition: a crouched, hooded raptor-masked
 * hunter bracing a lit blade. Drawn inline rather than shipped as a bitmap so
 * nothing external is fetched and the art scales cleanly at any size.
 */
export function HeroArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 620"
      role="img"
      aria-label="A crouched hooded figure in a raptor mask bracing a glowing lime blade"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="ra-blade" x1="1" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#6f9314" />
          <stop offset="35%" stopColor="#ccff00" />
          <stop offset="100%" stopColor="#f6ffdc" />
        </linearGradient>
        <linearGradient id="ra-cloth" x1="0.15" y1="0" x2="0.95" y2="1">
          <stop offset="0%" stopColor="#212a15" />
          <stop offset="45%" stopColor="#121709" />
          <stop offset="100%" stopColor="#080a05" />
        </linearGradient>
        <linearGradient id="ra-cape" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1b2410" />
          <stop offset="100%" stopColor="#0a0d06" />
        </linearGradient>
        <linearGradient id="ra-rim" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor="#ccff00" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#ccff00" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ccff00" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ra-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ccff00" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#ccff00" stopOpacity="0" />
        </radialGradient>
        <filter id="ra-soft" x="-45%" y="-45%" width="190%" height="190%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <filter id="ra-tight" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <ellipse cx="270" cy="300" rx="245" ry="255" fill="url(#ra-glow)" />

      {/* cape sweeping behind the figure */}
      <g>
        <path
          d="M392 214c58 6 96 46 108 104 10 48-2 104-34 154-18 28-44 48-74 58 22-46 34-90 36-132 2-52-10-98-36-140Z"
          fill="url(#ra-cape)"
        />
        <path d="M404 246c40 14 62 48 66 96-24-32-50-52-78-60 8-12 12-24 12-36Z" fill="#25330f" opacity="0.85" />
        <path d="M416 372c30 22 42 54 36 92-18-34-40-56-66-66 14-6 24-15 30-26Z" fill="#1c2710" opacity="0.85" />
      </g>

      {/* back leg, planted */}
      <path
        d="M356 356c34 4 56 26 62 62 6 34-2 68-22 100l-46-12c14-26 20-50 18-72-2-24-14-42-34-54Z"
        fill="url(#ra-cloth)"
      />
      <path d="M350 506l52 12c8 2 12 8 10 16-2 8-10 12-22 10l-58-10c-8-2-12-8-8-16Z" fill="#0d1207" />

      {/* torso */}
      <path
        d="M300 196c46-14 88 4 106 46 16 38 14 82-4 122-12 26-34 42-64 46-32 4-60-8-78-34-18-26-20-58-8-90 12-32 30-64 48-90Z"
        fill="url(#ra-cloth)"
      />
      <path
        d="M300 196c46-14 88 4 106 46 16 38 14 82-4 122l-20-12c14-34 16-70 4-102-12-32-40-52-86-54Z"
        fill="url(#ra-rim)"
      />

      {/* front leg, crouched forward */}
      <path
        d="M262 352c30-8 56 2 70 30 12 24 8 50-10 70l-40 44c-8 8-18 8-26 0-8-8-8-18 0-26l32-38c8-10 8-22 0-32-10-12-24-16-40-12Z"
        fill="#101609"
      />
      <path d="M256 470l40 12c8 2 12 10 8 18-4 8-12 10-22 8l-44-14c-8-4-10-12-6-18Z" fill="#0b0f06" />

      {/* far arm bracing back */}
      <path d="M396 260c26 6 42 24 46 52 4 24-2 46-18 64l-26-18c10-14 14-28 12-42-2-16-10-28-24-36Z" fill="#141b0b" />

      {/* near arm reaching to the hilt */}
      <path d="M300 288c-22 12-40 30-52 54l-16 34 38 20 14-32c8-18 20-32 36-40Z" fill="#161d0c" />

      {/* blade */}
      <g>
        <path d="M296 406 312 390 70 158 58 172Z" fill="url(#ra-blade)" filter="url(#ra-soft)" opacity="0.6" />
        <path d="M296 406 312 390 70 158 58 172Z" fill="url(#ra-blade)" />
        <path d="M292 396 302 386 74 166 68 174Z" fill="#fbffe8" opacity="0.8" filter="url(#ra-tight)" />
        <path d="M64 165l14-6-2 16Z" fill="#ffffff" opacity="0.9" />
      </g>

      {/* guard, grip and gloved hand */}
      <g>
        <rect x="286" y="392" width="54" height="13" rx="6" transform="rotate(-45 286 392)" fill="#0d1207" />
        <rect x="304" y="404" width="40" height="16" rx="8" transform="rotate(45 304 404)" fill="#171f0d" />
        <path d="M288 398c14-8 30-4 38 10 6 12 2 26-10 32-14 6-28 2-34-10-6-12-2-26 6-32Z" fill="#1b230e" />
        <path d="M296 404c8-4 18-2 22 6 4 8 0 16-8 20" stroke="#ccff00" strokeWidth="2.5" fill="none" opacity="0.65" />
      </g>

      {/* hood */}
      <path
        d="M296 96c44-20 92 0 108 44 14 40 2 84-30 108-16 12-38 16-58 10-24-6-42-24-50-48-12-38 0-94 30-114Z"
        fill="#0f1408"
      />
      <path d="M296 96c44-20 92 0 108 44l-18 8c-12-32-46-46-84-36Z" fill="url(#ra-rim)" />
      <path d="M264 178c-10 26-6 52 12 72-24-4-40-22-42-46-2-18 8-32 30-26Z" fill="#0b0f06" />

      {/* mask */}
      <path d="M312 176c26-14 58-14 84 0-6 28-28 42-42 42s-36-14-42-42Z" fill="#080b05" />
      <path d="M322 182c18-8 40-8 58 0-4 16-18 26-29 26s-25-10-29-26Z" fill="#ccff00" opacity="0.95" />
      <path d="M342 190h18l-9 16Z" fill="#080b05" />
      <path d="M312 176c26-14 58-14 84 0" stroke="#ccff00" strokeWidth="2" fill="none" opacity="0.5" />

      {/* shoulder emblem */}
      <circle cx="392" cy="286" r="21" fill="none" stroke="#ccff00" strokeWidth="3" opacity="0.9" />
      <path d="M392 274l11 20h-22Z" fill="#ccff00" />

      {/* ground shadow */}
      <ellipse cx="300" cy="556" rx="190" ry="18" fill="#ccff00" opacity="0.07" />
    </svg>
  );
}
