import office from "@/assets/office-detail.jpg";
import { LOCAIS } from "@/data/site";
import { Reveal } from "./Reveal";

export function Sobre() {
  return (
    <section id="sobre" className="scroll-mt-24 py-24 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow">Quem somos</p>
          <h2 className="mt-5 max-w-xl font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Uma firma moçambicana construída sobre técnica, ética e proximidade.
          </h2>
          <div className="mt-8 h-px w-20 bg-primary" />

          <div className="mt-8 space-y-6 text-[0.975rem] leading-relaxed text-muted-foreground">
            <p>
              A CVA Advogados &amp; Consultores é uma firma de Advocacia constituída e matriculada
              na Conservatória dos Registos e Notariado de Maputo, Secção do Registo das Entidades
              Legais de Maputo, sob o número 203 a folhas 105 do Livro C, de 12 de Março de 2012.
            </p>
            <p>
              A firma é composta por uma equipa dinâmica, moderna e experiente, com profissionais
              com vasta vivência em assuntos jurídicos empresariais.
            </p>
            <p>
              A CVA surgiu num contexto em que os seus profissionais identificaram carências e
              deficiências na prestação de serviços jurídicos, procurando responder através de alta
              qualidade técnica, exclusividade, organização, transparência e ética.
            </p>
            <p>
              Mantemos uma atualização constante e exigência técnica permanente, oferecendo apoio
              abrangente, assessoria eficaz e suporte jurídico em diversas áreas do Direito.
            </p>
          </div>

          <dl className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
            {LOCAIS.map((l) => (
              <div key={l.id} className="bg-background p-5">
                <dt className="font-display text-xl text-foreground">{l.cidade}</dt>
                <dd className="eyebrow mt-1 text-primary">{l.tipo}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={120}>
          <figure className="relative">
            <img
              src={office}
              alt="Detalhe do interior de um escritório jurídico contemporâneo com estantes de obras legais"
              width={1200}
              height={1400}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <figcaption className="mt-4 border-l border-primary pl-4 text-sm leading-relaxed text-muted-foreground">
              Constituída em 2012, com sede em Lichinga e representação em Tete e Maputo.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
