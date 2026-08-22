import { EMAIL, INSTAGRAM, NAV, FACEBOOK } from "../lib/data";
import { scrollToId } from "./Nav";

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M3.5 7.5A2.5 2.5 0 0 1 6 5h12a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 18 19H6a2.5 2.5 0 0 1-2.5-2.5v-9Zm1.6 0.8 6.9 5.2 6.9-5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" stroke="currentColor" strokeWidth="0.4"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.8h2.7l.4-3.1h-3.1V7.4c0-.9.3-1.5 1.6-1.5H16V2.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.5v3.1h2.3V21h3.7Z"/>
    </svg>
  );
}

export default function FinalCTA() {
  return (
    <footer className="relative overflow-hidden border-t border-ivory/8 bg-obsidian px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="font-serif text-3xl tracking-[0.2em] text-ivory sm:text-4xl">
              ZAKIORA EVENTS
            </h3>
            <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.3em] text-ivory/45 sm:text-[11px]">
              Creating Extraordinary Celebrations Since 35+ Years
            </p>
          </div>

          <div className="lg:col-span-3">
            <span className="font-sans text-[9px] tracking-[0.4em] text-gold/60">
              MENU
            </span>
            <ul className="mt-5 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => scrollToId(n.id)}
                    data-cursor="explore"
                    className="font-sans text-[11px] capitalize tracking-[0.22em] text-ivory/50 transition-colors duration-500 hover:text-champagne"
                  >
                    {n.label.charAt(0) + n.label.slice(1).toLowerCase()}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <span className="font-sans text-[9px] tracking-[0.4em] text-gold/60">
              CONTACT
            </span>
            <div className="mt-5 space-y-4">
              <a
                href={`mailto:${EMAIL}`}
                data-cursor="explore"
                className="flex items-center gap-3 font-sans text-base font-medium tracking-[0.08em] text-ivory/85 transition-colors duration-500 hover:text-champagne sm:text-lg"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-champagne/15 text-champagne">
                  <EmailIcon />
                </span>
                {EMAIL}
              </a>
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="explore"
                  aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2]/15 text-[#1877F2] transition-transform duration-500 hover:-translate-y-0.5"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://instagram.com/zakiora.events"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="explore"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f58529_0%,#dd2a7b_35%,#8134af_70%,#515bd4_100%)] text-white transition-transform duration-500 hover:-translate-y-0.5"
                >
                  <InstagramIcon />
                </a>
              </div>
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-ivory/60">
                {INSTAGRAM}
              </p>
            </div>
          </div>
        </div>

        <div className="hairline my-12" />

        <p className="text-center font-sans text-[10px] uppercase tracking-[0.4em] text-gold/65 sm:text-[11px]">
          Your Vision. Our Expertise. Memories That Last Forever.
        </p>
      </div>
    </footer>
  );
}
