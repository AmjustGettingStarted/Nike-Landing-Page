import { Swoosh } from "./Swoosh";

const LINKS = [
  { label: "The shoe", href: "#drops" },
  { label: "Innovation", href: "#innovation" },
  { label: "Colorways", href: "#colorways" },
  { label: "Drop list", href: "#community" },
];

export function Footer() {
  return (
    <footer id="labs" className="relative w-full bg-black text-white px-5 md:px-12 pt-16 pb-8 md:pt-24 md:pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 pb-10 border-b border-white/10">
          <div>
            <Swoosh className="w-14 h-auto text-white mb-5" />
            <p className="font-sans font-bold tracking-[0.3em] text-xs uppercase">NIKE // LAB</p>
            <p className="mt-2 max-w-[36ch] text-sm text-white/40 leading-relaxed">
              Prototype-grade footwear, released in small numbered runs. Built in the lab, tested on the street.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 list-none text-xs font-mono tracking-widest uppercase">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/60 hover:text-brand-orange transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-[10px] font-mono tracking-widest uppercase text-white/30">
          <span>© {new Date().getFullYear()} Nike Lab. Concept promo page.</span>
          <span>Air Lab 01 // Season 26</span>
        </div>
      </div>
    </footer>
  );
}
