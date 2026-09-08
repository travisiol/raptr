import { site } from "@/lib/site";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={"display text-[22px] leading-none tracking-[-0.02em] " + className}>
      {site.name}
      <span className="text-accent">.GG</span>
    </span>
  );
}

/** Bird-of-prey crest, drawn as a mark rather than shipped as an image asset. */
export function Crest({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 3 3.5 12.2l4.9 1.1L4 18.8l7.4-1.5L9.9 29 16 20.4 22.1 29l-1.5-11.7 7.4 1.5-4.4-5.5 4.9-1.1L16 3Z" fill="currentColor" />
      <path d="M16 10.5 12.8 16h6.4L16 10.5Z" fill="#070805" />
    </svg>
  );
}
