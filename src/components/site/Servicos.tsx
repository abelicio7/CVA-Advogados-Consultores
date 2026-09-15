import { Plus } from "lucide-react";
import { useState } from "react";

import { SERVICOS } from "@/data/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Servicos() {
  const [aberto, setAberto] = useState<string | null>(SERVICOS[0].id);

  return (
    <section id="servicos" className="scroll-mt-24 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Serviços</p>
          <h2 className="mt-5 font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Soluções jurídicas para necessidades reais.
          </h2>
          <p className="mt-6 text-[0.975rem] leading-relaxed text-muted-foreground">
            A CVA presta serviços jurídicos abrangentes, procurando combinar conhecimento técnico,
            compreensão do negócio do cliente e soluções práticas e eficientes.
          </p>
        </Reveal>

        <div className="mt-14 border-t border-hairline">
          {SERVICOS.map((s, i) => {
            const expandido = aberto === s.id;
            return (
              <Reveal key={s.id} delay={Math.min(i * 40, 240)}>
                <div className="border-b border-hairline">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setAberto(expandido ? null : s.id)}
                      aria-expanded={expandido}
                      aria-controls={`painel-${s.id}`}
                      className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-6 text-left transition-colors hover:bg-surface/70 sm:gap-6 sm:px-2"
                    >
                      <span className="font-display text-sm text-muted-foreground tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display text-xl text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                          {s.titulo}
                        </span>
                        <span className="mt-1 block text-sm text-muted-foreground">{s.resumo}</span>
                      </span>
                      <Plus
                        aria-hidden
                        className={cn(
                          "h-5 w-5 shrink-0 text-primary transition-transform duration-300",
                          expandido && "rotate-45",
                        )}
                      />
                    </button>
                  </h3>
                  <div
                    id={`painel-${s.id}`}
                    hidden={!expandido}
                    className="pb-8 sm:px-2 sm:pl-[3.25rem]"
                  >
                    <ul className="grid gap-2 text-[0.95rem] leading-relaxed text-muted-foreground sm:grid-cols-2">
                      {s.detalhes.map((d) => (
                        <li key={d} className="flex gap-3">
                          <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-primary" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
