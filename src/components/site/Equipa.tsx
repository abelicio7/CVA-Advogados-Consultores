import { ASSOCIADOS, SOCIOS } from "@/data/site";
import { Reveal } from "./Reveal";

export function Equipa() {
  return (
    <section id="equipa" className="scroll-mt-24 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Equipa</p>
          <h2 className="mt-5 font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Conheça a nossa equipa
          </h2>
          <p className="mt-6 text-[0.975rem] leading-relaxed text-muted-foreground">
            Uma equipa de profissionais preparada para responder às necessidades jurídicas dos
            nossos clientes com rigor técnico, proximidade e compromisso.
          </p>
        </Reveal>

        {/* Foto de Família / Grupo da Equipa */}
        <Reveal className="mt-12 overflow-hidden border border-hairline bg-card">
          <figure className="relative">
            <img
              src="/equipa/equipa-cva.jpg"
              alt="Fotografia de grupo da equipa de advogados da CVA Advogados & Consultores"
              loading="lazy"
              className="h-auto max-h-[560px] w-full object-cover object-center"
            />
            <figcaption className="border-t border-hairline bg-background/95 px-6 py-4 text-sm text-muted-foreground sm:px-8">
              A equipa jurídica da CVA Advogados &amp; Consultores reunida nas suas instalações.
            </figcaption>
          </figure>
        </Reveal>

        {/* Sócios */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {SOCIOS.map((s) => (
            <Reveal
              key={s.nome}
              as="article"
              className="flex flex-col overflow-hidden border border-hairline bg-card transition-all duration-300 hover:border-primary/40"
            >
              <div className="relative aspect-[4/4.2] w-full overflow-hidden bg-muted">
                <img
                  src={s.foto}
                  alt={s.nome}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-102"
                />
              </div>
              <div className="flex flex-1 flex-col p-7 lg:p-8">
                <h3 className="font-display text-2xl leading-snug text-foreground">{s.nome}</h3>
                <p className="eyebrow mt-2 text-primary">{s.cargo}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  Carteira profissional {s.carteira}
                </p>
                <ul className="mt-5 space-y-2.5 border-t border-hairline pt-5 text-[0.925rem] leading-relaxed text-muted-foreground">
                  {s.pontos.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-px w-3.5 shrink-0 bg-primary" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Advogados Associados */}
        <Reveal className="mt-20">
          <h3 className="font-display text-2xl text-foreground sm:text-3xl">
            Advogados Associados
          </h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ASSOCIADOS.map((a) => (
              <div
                key={a.nome}
                className="flex flex-col overflow-hidden border border-hairline bg-card"
              >
                {a.foto ? (
                  <div className="relative aspect-[4/4.2] w-full overflow-hidden bg-muted">
                    <img
                      src={a.foto}
                      alt={a.nome}
                      loading="lazy"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <p className="font-display text-lg leading-snug text-foreground">{a.nome}</p>
                  {a.cargo ? <p className="eyebrow mt-1.5 text-primary">{a.cargo}</p> : null}
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{a.carteira}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
