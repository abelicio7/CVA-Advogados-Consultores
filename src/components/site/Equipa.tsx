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
            nossos clientes.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px bg-hairline lg:grid-cols-3">
          {SOCIOS.map((s, i) => (
            <Reveal
              key={s.nome}
              delay={i * 90}
              as="article"
              className="group flex flex-col bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft lg:p-10"
            >
              <div
                aria-hidden
                className="flex h-16 w-16 items-center justify-center border border-hairline font-display text-xl text-primary transition-colors duration-300 group-hover:border-primary"
              >
                {s.iniciais}
              </div>
              <h3 className="mt-7 font-display text-2xl leading-snug text-foreground">{s.nome}</h3>
              <p className="eyebrow mt-2 text-primary">{s.cargo}</p>
              <p className="mt-4 text-sm text-muted-foreground">
                Carteira profissional {s.carteira}
              </p>
              <ul className="mt-5 space-y-3 text-[0.925rem] leading-relaxed text-muted-foreground">
                {s.pontos.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 h-px w-3.5 shrink-0 bg-primary" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <h3 className="font-display text-2xl text-foreground sm:text-3xl">
            Advogados Associados
          </h3>
          <div className="mt-8 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {ASSOCIADOS.map((a) => (
              <div key={a.nome} className="bg-background p-6">
                <p className="font-display text-lg leading-snug text-foreground">{a.nome}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.carteira}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
