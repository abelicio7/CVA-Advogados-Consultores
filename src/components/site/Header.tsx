import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { NAV_ITEMS } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean,
    ) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.6] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-hairline/70 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 lg:px-10">
        <a
          href="#inicio"
          className="flex min-w-0 items-center"
          aria-label="CVA Advogados & Consultores — início"
        >
          <img
            src="/cva-logo.png"
            alt="Logótipo CVA Advogados & Consultores"
            width={320}
            height={80}
            className={cn(
              "h-9 w-auto shrink-0 transition-all duration-500 sm:h-10",
              scrolled || open ? "" : "brightness-0 invert",
            )}
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-active={active === item.id}
              className={cn(
                "nav-underline text-[0.8125rem] font-medium tracking-wide transition-colors",
                scrolled
                  ? "text-foreground/75 hover:text-foreground"
                  : "text-ink-foreground/80 hover:text-ink-foreground",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-sm border transition-colors lg:hidden",
            scrolled || open
              ? "border-hairline text-foreground"
              : "border-ink-foreground/30 text-ink-foreground",
          )}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t border-hairline/70 bg-background lg:hidden"
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-6 py-2" aria-label="Navegação mobile">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-4 font-display text-xl text-foreground last:border-0"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
