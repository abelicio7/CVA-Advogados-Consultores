import { Mail, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";

import { EMAIL, LOCAIS } from "@/data/site";
import { Reveal } from "./Reveal";

const campo =
  "h-12 w-full border border-input bg-background px-4 text-[0.95rem] text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary";

export function Contacto() {
  const [enviado, setEnviado] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const dados = new FormData(form);
    const assunto = encodeURIComponent(String(dados.get("assunto") ?? "Contacto do website"));
    const corpo = encodeURIComponent(
      [
        `Nome: ${dados.get("nome")}`,
        `E-mail: ${dados.get("email")}`,
        `Telefone: ${dados.get("telefone")}`,
        "",
        String(dados.get("mensagem") ?? ""),
      ].join("\n"),
    );
    window.location.href = `mailto:${EMAIL}?subject=${assunto}&body=${corpo}`;
    setEnviado(true);
  };

  const lichinga = LOCAIS.find((l) => l.id === "lichinga");
  const tete = LOCAIS.find((l) => l.id === "tete");

  return (
    <section id="contactos" className="scroll-mt-24 py-24 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">Contactos</p>
          <h2 className="mt-5 font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Vamos conversar sobre a sua necessidade jurídica.
          </h2>
          <p className="mt-6 text-[0.975rem] leading-relaxed text-muted-foreground">
            Para informações, esclarecimentos ou solicitação de serviços jurídicos, entre em
            contacto com a CVA Advogados &amp; Consultores.
          </p>

          <dl className="mt-10 space-y-6 border-t border-hairline pt-8">
            <div>
              <dt className="eyebrow">E-mail</dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-lg text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                >
                  {EMAIL}
                </a>
              </dd>
            </div>
            {[lichinga, tete].map((l) =>
              l?.telefone ? (
                <div key={l.id}>
                  <dt className="eyebrow">
                    {l.cidade} — {l.tipo}
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={`tel:${l.telefone.replace(/\s/g, "")}`}
                      className="text-lg text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                    >
                      {l.telefone}
                    </a>
                  </dd>
                </div>
              ) : null,
            )}
          </dl>

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
              Telefonar
            </a>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={110}>
          <form onSubmit={onSubmit} className="border border-hairline bg-card p-7 lg:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="nome" className="eyebrow">
                  Nome
                </label>
                <input id="nome" name="nome" required autoComplete="name" className={`${campo} mt-2`} />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="email" className="eyebrow">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={`${campo} mt-2`}
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="telefone" className="eyebrow">
                  Telefone
                </label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  autoComplete="tel"
                  className={`${campo} mt-2`}
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="assunto" className="eyebrow">
                  Assunto
                </label>
                <input id="assunto" name="assunto" className={`${campo} mt-2`} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="mensagem" className="eyebrow">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  required
                  rows={6}
                  className="mt-2 w-full resize-y border border-input bg-background p-4 text-[0.95rem] text-foreground outline-none transition-colors focus:border-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-7 inline-flex h-12 w-full items-center justify-center bg-primary px-8 text-sm font-medium tracking-wide text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lift sm:w-auto"
            >
              Enviar mensagem
            </button>

            <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
              {enviado
                ? "Obrigado. A sua mensagem foi preparada no seu cliente de e-mail para envio à CVA."
                : "Os dados partilhados são tratados com confidencialidade e sigilo profissional."}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
