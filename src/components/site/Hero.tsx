import { ArrowDown } from "lucide-react";

import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-[92vh] items-end overflow-hidden">
      <img
        src="/hero-architecture.jpg"
        alt="Fachada de edifício corporativo contemporâneo em linhas verticais"
        width={1920}
        height={1280}
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,oklch(0.18_0.008_50/0.93)_0%,oklch(0.18_0.008_50/0.78)_45%,oklch(0.18_0.008_50/0.42)_100%)]"
      />

      <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-36 lg:px-10 lg:pb-28">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-ink-foreground/65">Advocacia · Moçambique · Desde 2012</p>
          <h1 className="mt-6 font-display text-4xl leading-[1.08] text-ink-foreground sm:text-5xl lg:text-[4.25rem]">
            Excelência jurídica para decisões que exigem confiança.
          </h1>
          <div className="mt-8 h-px w-24 bg-primary" />
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-foreground/75 sm:text-lg">
            A CVA Advogados &amp; Consultores oferece assessoria e soluções jurídicas com qualidade
            técnica, proximidade, transparência e compromisso, em Lichinga, Tete e Maputo.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contactos"
              className="inline-flex h-12 items-center justify-center bg-primary px-7 text-sm font-medium tracking-wide text-primary-foreground transition-all duration-300 hover:bg-primary/90"
            >
              Falar com a CVA
            </a>
            <a
              href="#sobre"
              className="inline-flex h-12 items-center justify-center border border-ink-foreground/35 px-7 text-sm font-medium tracking-wide text-ink-foreground transition-colors duration-300 hover:border-ink-foreground hover:bg-ink-foreground/10"
            >
              Conhecer a nossa firma
            </a>
          </div>
        </Reveal>

        <a
          href="#sobre"
          aria-label="Continuar para Sobre Nós"
          className="mt-16 inline-flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.22em] text-ink-foreground/55 transition-colors hover:text-ink-foreground"
        >
          <ArrowDown className="h-4 w-4" aria-hidden />
          Continuar
        </a>
      </div>
    </section>
  );
}
