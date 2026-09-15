import { Handshake, HeartHandshake, Lightbulb, Scale3d, Target, Timer } from "lucide-react";

import { DIFERENCIAIS } from "@/data/site";
import { Reveal } from "./Reveal";

const ICONS = [HeartHandshake, Scale3d, Handshake, Target, Lightbulb, Timer];

export function Diferenciais() {
  return (
    <section id="diferenciais" className="scroll-mt-24 bg-surface py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Diferenciais</p>
          <h2 className="mt-5 font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Mais do que assessoria. Uma relação de confiança.
          </h2>
          <p className="mt-6 text-[0.975rem] leading-relaxed text-muted-foreground">
            Procuramos compreender o contexto de cada cliente e atuar como parceiros, e não apenas
            como prestadores de um serviço jurídico.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {DIFERENCIAIS.map((d, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal
                key={d.titulo}
                delay={Math.min(i * 70, 280)}
                className="group bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft lg:p-10"
              >
                <Icon className="h-5 w-5 text-primary" aria-hidden />
                <h3 className="mt-6 font-display text-2xl text-foreground">{d.titulo}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {d.texto}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
