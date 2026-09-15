import { Check } from "lucide-react";

import { VALORES } from "@/data/site";
import { Reveal } from "./Reveal";

export function Orientacao() {
  return (
    <section aria-labelledby="orientacao-titulo" className="bg-ink py-24 text-ink-foreground lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow text-ink-foreground/55">Princípios</p>
          <h2
            id="orientacao-titulo"
            className="mt-5 max-w-2xl font-display text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]"
          >
            O que orienta a nossa atuação
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px bg-ink-foreground/12 lg:grid-cols-3">
          <Reveal className="bg-ink p-8 lg:p-10">
            <h3 className="eyebrow text-primary">Missão</h3>
            <div className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-ink-foreground/75">
              <p>
                Preencher lacunas existentes na prestação de serviços jurídicos, sobretudo através
                de atendimento personalizado, alta qualidade jurídica e compromisso constante com o
                conhecimento profundo dos negócios e operações dos nossos clientes.
              </p>
              <p>
                Procuramos proporcionar as melhores soluções para as demandas patrocinadas,
                pautando pela solução jurídica célere e eficaz, com o objetivo de reduzir riscos e
                potencializar resultados.
              </p>
            </div>
          </Reveal>

          <Reveal className="bg-ink p-8 lg:p-10" delay={90}>
            <h3 className="eyebrow text-primary">Visão</h3>
            <div className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-ink-foreground/75">
              <p>
                Ser uma firma indicada para a solução de problemas jurídicos, procurando oferecer o
                melhor atendimento possível e melhorar continuamente a oferta de serviços à
                sociedade.
              </p>
              <p>
                A nossa visão contempla igualmente uma gestão moderna, inovadora e eficiente dos
                serviços jurídicos.
              </p>
            </div>
          </Reveal>

          <Reveal className="bg-ink p-8 lg:p-10" delay={180}>
            <h3 className="eyebrow text-primary">Valores</h3>
            <ul className="mt-5 space-y-3">
              {VALORES.map((v) => (
                <li key={v} className="flex items-start gap-3 text-[0.95rem] text-ink-foreground/85">
                  <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
