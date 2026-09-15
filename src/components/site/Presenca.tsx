import { useState } from "react";

import { LOCAIS } from "@/data/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/* Silhueta estilizada e simplificada de Moçambique */
const MZ_PATH =
  "M46 2 L60 6 L64 18 L58 28 L62 40 L54 52 L58 64 L50 74 L52 86 L44 96 L40 118 L34 140 L40 158 L34 172 L24 178 L18 168 L24 150 L18 134 L22 116 L14 100 L10 82 L18 66 L12 52 L20 40 L16 26 L28 18 L34 6 Z";

export function Presenca() {
  const [ativo, setAtivo] = useState<string>("lichinga");

  return (
    <section id="presenca" className="scroll-mt-24 bg-surface py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Presença</p>
          <h2 className="mt-5 font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Onde estamos
          </h2>
          <p className="mt-6 text-[0.975rem] leading-relaxed text-muted-foreground">
            Representação em três cidades de Moçambique, com proximidade e acompanhamento contínuo
            aos nossos clientes.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="order-2 lg:order-1 lg:col-span-7">
            <ul className="grid gap-px bg-hairline">
              {LOCAIS.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setAtivo(l.id)}
                    onFocus={() => setAtivo(l.id)}
                    onClick={() => setAtivo(l.id)}
                    aria-pressed={ativo === l.id}
                    className={cn(
                      "block w-full bg-background p-7 text-left transition-colors duration-300",
                      ativo === l.id ? "bg-background" : "bg-background/60 hover:bg-background",
                    )}
                  >
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="font-display text-2xl text-foreground">{l.cidade}</span>
                      <span className="eyebrow text-primary">{l.tipo}</span>
                    </div>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                      {l.morada}
                    </p>
                    {l.telefone ? (
                      <p className="mt-2 text-sm text-muted-foreground">
                        Telefone:{" "}
                        <a
                          href={`tel:${l.telefone.replace(/\s/g, "")}`}
                          className="text-foreground underline-offset-4 hover:text-primary hover:underline"
                        >
                          {l.telefone}
                        </a>
                      </p>
                    ) : null}
                    <span
                      aria-hidden
                      className={cn(
                        "mt-5 block h-px bg-primary transition-all duration-500",
                        ativo === l.id ? "w-20" : "w-8 bg-hairline",
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="order-1 lg:order-2 lg:col-span-5" delay={100}>
            <div className="relative mx-auto max-w-xs">
              <svg
                viewBox="0 0 80 190"
                role="img"
                aria-label="Mapa estilizado de Moçambique com as cidades de Lichinga, Tete e Maputo"
                className="h-auto w-full"
              >
                <path
                  d={MZ_PATH}
                  className="fill-background stroke-hairline"
                  strokeWidth={0.8}
                />
                {LOCAIS.map((l) => {
                  const cx = (l.x / 100) * 80;
                  const cy = (l.y / 100) * 190;
                  const on = ativo === l.id;
                  return (
                    <g key={l.id} className="transition-opacity">
                      {on ? (
                        <circle cx={cx} cy={cy} r={6} className="fill-primary/15" />
                      ) : null}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={on ? 2.6 : 1.8}
                        className={on ? "fill-primary" : "fill-muted-foreground"}
                      />
                      <text
                        x={cx + 5}
                        y={cy + 2}
                        className={cn(
                          "font-sans",
                          on ? "fill-foreground" : "fill-muted-foreground",
                        )}
                        style={{ fontSize: 5, letterSpacing: 0.2 }}
                      >
                        {l.cidade}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
