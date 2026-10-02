import { useEffect, useState } from "react";
import { BookOpen, Calendar, Download, FileText, Filter, Search, Tag } from "lucide-react";

import { getPublicacoes, Publicacao } from "@/lib/supabase";
import { Reveal } from "./Reveal";

export function Publicacoes() {
  const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>("Todas");
  const [pesquisa, setPesquisa] = useState("");
  const [selectedPub, setSelectedPub] = useState<Publicacao | null>(null);

  useEffect(() => {
    loadPublicacoes();
  }, []);

  const loadPublicacoes = async () => {
    setLoading(true);
    const data = await getPublicacoes();
    setPublicacoes(data);
    setLoading(false);
  };

  const categorias = ["Todas", "Legislação", "Artigo", "Boletim", "Aviso"];

  const publicacoesFiltradas = publicacoes.filter((pub) => {
    const matchesCategoria = categoriaAtiva === "Todas" || pub.categoria === categoriaAtiva;
    const matchesPesquisa =
      pub.titulo.toLowerCase().includes(pesquisa.toLowerCase()) ||
      pub.resumo.toLowerCase().includes(pesquisa.toLowerCase()) ||
      pub.conteudo.toLowerCase().includes(pesquisa.toLowerCase());
    return matchesCategoria && matchesPesquisa;
  });

  return (
    <section id="publicacoes" className="scroll-mt-24 py-24 lg:py-36 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Publicações & Atualizações</p>
          <h2 className="mt-5 font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Atualizações de Leis, Pareceres & Artigos
          </h2>
          <p className="mt-6 text-[0.975rem] leading-relaxed text-muted-foreground">
            Acompanhe a evolução do panorama legislativo em Moçambique através das nossas publicações, pareceres e boletins informativos.
          </p>
        </Reveal>

        {/* Filtros e Barra de Pesquisa */}
        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-b border-hairline pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Filter className="mr-1.5 h-3.5 w-3.5" /> Categoria:
            </span>
            {categorias.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoriaAtiva(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  categoriaAtiva === cat
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-card text-muted-foreground hover:bg-card/80 hover:text-foreground border border-hairline"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pesquisar lei, decreto ou artigo..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              className="w-full rounded-md border border-hairline bg-card pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
            />
          </div>
        </div>

        {/* Grelha de Publicações */}
        {loading ? (
          <div className="mt-12 text-center py-16 text-muted-foreground">
            <p>A carregar publicações...</p>
          </div>
        ) : publicacoesFiltradas.length === 0 ? (
          <div className="mt-12 text-center py-16 border border-dashed border-hairline rounded-lg bg-card/50">
            <FileText className="mx-auto h-10 w-10 text-muted-foreground/60" />
            <p className="mt-4 text-sm font-medium text-foreground">Nenhuma publicação encontrada</p>
            <p className="mt-1 text-xs text-muted-foreground">Tente alterar o termo de pesquisa ou filtro selecionado.</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {publicacoesFiltradas.map((pub) => (
              <Reveal
                key={pub.id}
                as="article"
                className="flex flex-col overflow-hidden border border-hairline bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center rounded-xs bg-primary/10 px-2.5 py-1 text-[0.75rem] font-semibold text-primary">
                      <Tag className="mr-1 h-3 w-3" />
                      {pub.categoria}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono">
                      <Calendar className="h-3.5 w-3.5" />
                      {pub.data}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl leading-snug text-foreground group-hover:text-primary">
                    {pub.titulo}
                  </h3>

                  <p className="mt-3 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                    {pub.resumo}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedPub(pub)}
                      className="inline-flex items-center text-xs font-semibold text-primary hover:underline"
                    >
                      <BookOpen className="mr-1.5 h-3.5 w-3.5" /> Ler documento integral
                    </button>

                    {pub.pdfUrl && (
                      <a
                        href={pub.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                        title="Descarregar ficheiro PDF"
                      >
                        <Download className="h-3.5 w-3.5" /> PDF
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Modal para Visualizar Publicação Completa */}
      {selectedPub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-hairline bg-background p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={() => setSelectedPub(null)}
              className="absolute right-4 top-4 rounded-xs border border-hairline p-1.5 text-muted-foreground hover:bg-card hover:text-foreground"
            >
              ✕
            </button>

            <span className="inline-flex items-center rounded-xs bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              {selectedPub.categoria}
            </span>

            <h3 className="mt-3 font-display text-2xl text-foreground sm:text-3xl">
              {selectedPub.titulo}
            </h3>

            <p className="mt-2 text-xs font-mono text-muted-foreground">Data de publicação: {selectedPub.data}</p>

            <div className="mt-6 border-t border-hairline pt-6 text-sm leading-relaxed text-muted-foreground space-y-4">
              <p className="font-medium text-foreground">{selectedPub.resumo}</p>
              <div className="whitespace-pre-line text-foreground/90">{selectedPub.conteudo}</div>
            </div>

            {selectedPub.pdfUrl && (
              <div className="mt-8 flex items-center justify-between border-t border-hairline pt-4">
                <span className="text-xs text-muted-foreground">Ficheiro oficial disponível em PDF</span>
                <a
                  href={selectedPub.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-xs bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
                >
                  <Download className="mr-2 h-4 w-4" /> Descarregar PDF Oficial
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
