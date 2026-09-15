import { createFileRoute } from "@tanstack/react-router";

import { Contacto } from "@/components/site/Contacto";
import { Diferenciais } from "@/components/site/Diferenciais";
import { Equipa } from "@/components/site/Equipa";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Orientacao } from "@/components/site/Orientacao";
import { Presenca } from "@/components/site/Presenca";
import { Servicos } from "@/components/site/Servicos";
import { Sobre } from "@/components/site/Sobre";
import { Stats } from "@/components/site/Stats";

const TITLE = "CVA Advogados & Consultores | Advocacia em Moçambique";
const DESCRIPTION =
  "CVA Advogados & Consultores — firma de advocacia com presença em Lichinga, Tete e Maputo, oferecendo assessoria e soluções jurídicas com excelência técnica, transparência e compromisso.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LegalService",
          name: "CVA Advogados & Consultores",
          description: DESCRIPTION,
          email: "geral@cvaadvogados.co.mz",
          foundingDate: "2012-03-12",
          areaServed: "Moçambique",
          address: [
            {
              "@type": "PostalAddress",
              streetAddress: "Rua do Aeroporto, Edifício CVA Business Centre",
              addressLocality: "Lichinga",
              addressCountry: "MZ",
            },
            {
              "@type": "PostalAddress",
              streetAddress:
                "Avenida da Liberdade, Edifício Hotel Zambeze – O Paraíso Misterioso",
              addressLocality: "Tete",
              addressCountry: "MZ",
            },
            {
              "@type": "PostalAddress",
              streetAddress: "Bairro da Sommerschield, Edifício 41 Business Centre",
              addressLocality: "Maputo",
              addressCountry: "MZ",
            },
          ],
          telephone: ["+258875005003", "+258875005002"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Sobre />
        <Orientacao />
        <Servicos />
        <Diferenciais />
        <Equipa />
        <Presenca />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}
