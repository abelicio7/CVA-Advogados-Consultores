import { useEffect, useState } from "react";
import { Camera, Calendar, Filter, Maximize2, X } from "lucide-react";

import { GaleriaItem, getGaleria } from "@/lib/supabase";
import { Reveal } from "./Reveal";

export function Galeria() {
  const [items, setItems] = useState<GaleriaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>("Todas");
  const [lightboxItem, setLightboxItem] = useState<GaleriaItem | null>(null);

  useEffect(() => {
    loadGaleria();
  }, []);

  const loadGaleria = async () => {
    setLoading(true);
    const data = await getGaleria();
    setItems(data);
    setLoading(false);
  };

  const categorias = ["Todas", "Instalações", "Eventos", "Equipa", "Atividades"];

  const itemsFiltrados = items.filter((item) =>
    categoriaAtiva === "Todas" ? true : item.categoria === categoriaAtiva
  );

  return (
    <section id="galeria" className="scroll-mt-24 py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Galeria de Fotografias</p>
          <h2 className="mt-5 font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            A Nossa Presença & Atividade
          </h2>
          <p className="mt-6 text-[0.975rem] leading-relaxed text-muted-foreground">
            Explore a galeria visual do escritório CVA Advogados & Consultores — instalações, eventos institucionais e momentos da nossa equipa.
          </p>
        </Reveal>

        {/* Filtros por Categoria */}
        <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-hairline pb-6">
          <span className="mr-2 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Filter className="mr-1.5 h-3.5 w-3.5" /> Filtrar:
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

        {/* Grelha da Galeria */}
        {loading ? (
          <div className="mt-12 text-center py-16 text-muted-foreground">
            <p>A carregar galeria...</p>
          </div>
        ) : itemsFiltrados.length === 0 ? (
          <div className="mt-12 text-center py-16 border border-dashed border-hairline rounded-lg bg-card/50">
            <Camera className="mx-auto h-10 w-10 text-muted-foreground/60" />
            <p className="mt-4 text-sm font-medium text-foreground">Nenhuma foto encontrada</p>
            <p className="mt-1 text-xs text-muted-foreground">Não existem fotografias para a categoria selecionada.</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {itemsFiltrados.map((item) => (
              <Reveal
                key={item.id}
                as="div"
                className="group relative flex flex-col overflow-hidden border border-hairline bg-card transition-all duration-300 hover:border-primary/40"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <img
                    src={item.imagemUrl}
                    alt={item.titulo}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setLightboxItem(item)}
                      className="inline-flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-xs font-semibold text-foreground shadow-lg backdrop-blur-xs transition-transform duration-200 hover:scale-105"
                    >
                      <Maximize2 className="h-3.5 w-3.5" /> Ampliar Fotografia
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span className="eyebrow text-primary">{item.categoria}</span>
                    <span className="inline-flex items-center gap-1 font-mono">
                      <Calendar className="h-3 w-3" />
                      {item.data}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-lg text-foreground">{item.titulo}</h3>
                  {item.descricao && (
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.descricao}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Visualizador de Imagem em Ecrã Inteiro */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setLightboxItem(null)}
            className="absolute right-6 top-6 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition-colors"
            aria-label="Fechar"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={lightboxItem.imagemUrl}
              alt={lightboxItem.titulo}
              className="max-h-[70vh] w-auto object-contain rounded-sm shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center text-white max-w-xl">
              <span className="eyebrow text-primary-foreground/80">{lightboxItem.categoria} • {lightboxItem.data}</span>
              <h3 className="mt-1 font-display text-2xl">{lightboxItem.titulo}</h3>
              {lightboxItem.descricao && (
                <p className="mt-2 text-sm text-white/80">{lightboxItem.descricao}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
