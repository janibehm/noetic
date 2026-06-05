import Link from "next/link";

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="noetic home">
      <span className="logo-mark">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M7 16V8l10 8V8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="logo-word">noetic</span>
    </Link>
  );
}