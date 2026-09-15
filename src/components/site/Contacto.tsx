import { Mail, MapPin, Phone } from "lucide-react";

import { EMAIL, LOCAIS } from "@/data/site";
import { Reveal } from "./Reveal";

export function Contacto() {
  return (
    <section id="contactos" className="scroll-mt-24 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Contactos</p>
          <h2 className="mt-5 font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Estamos prontos para atender a sua necessidade jurídica.
          </h2>
          <p className="mt-6 text-[0.975rem] leading-relaxed text-muted-foreground">
            Para informações, esclarecimentos ou solicitação de serviços jurídicos, entre em
            contacto direto com a CVA Advogados &amp; Consultores através dos nossos canais diretos
            ou visitas às nossas instalações.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* Canais Principais */}
          <Reveal className="flex flex-col justify-between border border-hairline bg-card p-8 lg:col-span-5 lg:p-10">
            <div>
              <h3 className="font-display text-2xl text-foreground">Canais Diretos</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Entre em contacto com a nossa equipa através de correio eletrónico ou chamada telefónica.
              </p>

              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="eyebrow">E-mail Principal</dt>
                  <dd className="mt-2 flex items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-lg font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                    >
                      {EMAIL}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="eyebrow">Linhas Telefónicas</dt>
                  <dd className="mt-3 space-y-3">
                    {LOCAIS.filter((l) => l.telefone).map((l) => (
                      <div
                        key={l.id}
                        className="flex items-center justify-between border-b border-hairline/60 pb-3 text-sm"
                      >
                        <span className="text-muted-foreground">
                          {l.cidade} ({l.tipo}):
                        </span>
                        <a
                          href={`tel:${l.telefone?.replace(/\s/g, "")}`}
                          className="font-medium text-foreground hover:text-primary hover:underline"
                        >
                          {l.telefone}
                        </a>
                      </div>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex h-12 items-center justify-center gap-2 bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Mail className="h-4 w-4" aria-hidden />
                Enviar e-mail
              </a>
              <a
                href="tel:+258875005003"
                className="inline-flex h-12 items-center justify-center gap-2 border border-input px-6 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Phone className="h-4 w-4" aria-hidden />
                Ligar para a Sede
              </a>
            </div>
          </Reveal>

          {/* Localizações / Escritórios */}
          <Reveal className="grid gap-px bg-hairline sm:grid-cols-3 lg:col-span-7">
            {LOCAIS.map((l) => (
              <div key={l.id} className="flex flex-col justify-between bg-card p-7">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-primary">{l.tipo}</span>
                    <MapPin className="h-4 w-4 text-muted-foreground/60" aria-hidden />
                  </div>
                  <h4 className="mt-4 font-display text-2xl text-foreground">{l.cidade}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{l.morada}</p>
                </div>
                {l.telefone ? (
                  <div className="mt-6 border-t border-hairline pt-4 text-xs text-muted-foreground">
                    Tel: <span className="font-medium text-foreground">{l.telefone}</span>
                  </div>
                ) : (
                  <div className="mt-6 border-t border-hairline pt-4 text-xs text-muted-foreground">
                    Representação Institucional
                  </div>
                )}
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
