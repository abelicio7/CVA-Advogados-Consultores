import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Database,
  FilePlus,
  ImagePlus,
  KeyRound,
  Lock,
  LogOut,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import {
  addGaleriaItem,
  addPublicacao,
  deleteGaleriaItem,
  deletePublicacao,
  getGaleria,
  getPublicacoes,
  GaleriaItem,
  isSupabaseConfigured,
  Publicacao,
} from "@/lib/supabase";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AdminModal({ isOpen, onClose, onSuccess }: AdminModalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<"lei" | "galeria" | "gerir">("lei");

  // Form Publicação
  const [pubTitulo, setPubTitulo] = useState("");
  const [pubCategoria, setPubCategoria] = useState("Legislação");
  const [pubResumo, setPubResumo] = useState("");
  const [pubConteudo, setPubConteudo] = useState("");
  const [pubPdfFile, setPubPdfFile] = useState<File | null>(null);
  const [pubPdfUrl, setPubPdfUrl] = useState("");
  const [pubData, setPubData] = useState(new Date().toISOString().split("T")[0]);

  // Form Galeria
  const [galTitulo, setGalTitulo] = useState("");
  const [galCategoria, setGalCategoria] = useState("Instalações");
  const [galDescricao, setGalDescricao] = useState("");
  const [galImgFile, setGalImgFile] = useState<File | null>(null);
  const [galImgUrl, setGalImgUrl] = useState("");
  const [galData, setGalData] = useState(new Date().getFullYear().toString());

  // Management lists
  const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);
  const [galeriaItems, setGaleriaItems] = useState<GaleriaItem[]>([]);

  // Feedback states
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin pin for demo & authorization (e.g. cva2026 or admin)
    if (pin.trim() === "cva2026" || pin.trim() === "admin") {
      setIsAuthenticated(true);
      setAuthError("");
      loadExistingItems();
    } else {
      setAuthError("Código de acesso incorreto. Tente 'cva2026'.");
    }
  };

  const loadExistingItems = async () => {
    const pubs = await getPublicacoes();
    const gals = await getGaleria();
    setPublicacoes(pubs);
    setGaleriaItems(gals);
  };

  const handleFileRead = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handlePublishLaw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pubTitulo || !pubResumo) {
      setMessage({ type: "error", text: "Preencha o título e o resumo da publicação." });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      let finalPdfUrl = pubPdfUrl;
      if (pubPdfFile) {
        finalPdfUrl = await handleFileRead(pubPdfFile);
      }

      await addPublicacao({
        titulo: pubTitulo,
        categoria: pubCategoria,
        resumo: pubResumo,
        conteudo: pubConteudo || pubResumo,
        pdfUrl: finalPdfUrl,
        data: pubData,
      });

      setMessage({ type: "success", text: "Atualização de Lei/Publicação criada com sucesso!" });
      setPubTitulo("");
      setPubResumo("");
      setPubConteudo("");
      setPubPdfFile(null);
      setPubPdfUrl("");
      await loadExistingItems();
      if (onSuccess) onSuccess();
    } catch (err) {
      setMessage({ type: "error", text: "Ocorreu um erro ao guardar a publicação." });
    } finally {
      setSubmitting(false);
    }
  };

  const handlePublishGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galTitulo) {
      setMessage({ type: "error", text: "Preencha o título da fotografia." });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      let finalImgUrl = galImgUrl;
      if (galImgFile) {
        finalImgUrl = await handleFileRead(galImgFile);
      }

      if (!finalImgUrl) {
        setMessage({ type: "error", text: "Selecione uma fotografia para carregar ou insira um URL." });
        setSubmitting(false);
        return;
      }

      await addGaleriaItem({
        titulo: galTitulo,
        categoria: galCategoria,
        descricao: galDescricao,
        imagemUrl: finalImgUrl,
        data: galData,
      });

      setMessage({ type: "success", text: "Fotografia adicionada à Galeria com sucesso!" });
      setGalTitulo("");
      setGalDescricao("");
      setGalImgFile(null);
      setGalImgUrl("");
      await loadExistingItems();
      if (onSuccess) onSuccess();
    } catch (err) {
      setMessage({ type: "error", text: "Ocorreu um erro ao guardar a fotografia." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePub = async (id: string) => {
    if (confirm("Tem a certeza que deseja eliminar esta publicação?")) {
      await deletePublicacao(id);
      await loadExistingItems();
      if (onSuccess) onSuccess();
    }
  };

  const handleDeleteGal = async (id: string) => {
    if (confirm("Tem a certeza que deseja eliminar esta fotografia da galeria?")) {
      await deleteGaleriaItem(id);
      await loadExistingItems();
      if (onSuccess) onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-hairline bg-background p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xs border border-hairline p-1.5 text-muted-foreground hover:bg-card hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {!isAuthenticated ? (
          /* Ecrã de Login / Código de Acesso */
          <div className="py-6 text-center max-w-sm mx-auto">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Lock className="h-7 w-7" />
            </div>
            <h3 className="mt-4 font-display text-2xl text-foreground">Área Reservada à Equipa</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Insira o código de acesso para publicar atualizações de leis, PDFs e fotos na galeria.
            </p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Código de acesso (ex: cva2026)"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full rounded-md border border-hairline bg-card pl-10 pr-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-hidden"
                  autoFocus
                />
              </div>

              {authError && <p className="text-xs font-medium text-destructive">{authError}</p>}

              <button
                type="submit"
                className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-xs hover:opacity-90"
              >
                Entrar no Painel de Publicações
              </button>
            </form>
          </div>
        ) : (
          /* Painel de Administração */
          <div>
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <div>
                <span className="eyebrow text-primary">Painel de Gestão CVA</span>
                <h3 className="font-display text-2xl text-foreground">Janela de Publicações & Galeria</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAuthenticated(false)}
                className="inline-flex items-center gap-1.5 rounded-xs border border-hairline px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-3.5 w-3.5" /> Sair
              </button>
            </div>

            {!isSupabaseConfigured && (
              <div className="mt-4 flex items-start gap-3 rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-600 dark:text-amber-400">
                <Database className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <strong>Modo de Armazenamento Local Ativo:</strong> As publicações e fotos são guardadas instantaneamente no browser. Para sincronização permanente em nuvem com múltiplos utilizadores, configure as chaves do Supabase.
                </div>
              </div>
            )}

            {/* Separadores / Tabs */}
            <div className="mt-6 flex border-b border-hairline">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("lei");
                  setMessage(null);
                }}
                className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
                  activeTab === "lei"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <FilePlus className="h-4 w-4" /> Nova Publicação / Lei
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("galeria");
                  setMessage(null);
                }}
                className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
                  activeTab === "galeria"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <ImagePlus className="h-4 w-4" /> Adicionar à Galeria
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("gerir");
                  setMessage(null);
                }}
                className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
                  activeTab === "gerir"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Database className="h-4 w-4" /> Gerir Conteúdos ({publicacoes.length + galeriaItems.length})
              </button>
            </div>

            {/* Mensagem de Feedback */}
            {message && (
              <div
                className={`mt-4 flex items-center gap-2 rounded-md p-3 text-xs font-medium ${
                  message.type === "success"
                    ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                    : "bg-destructive/10 text-destructive border border-destructive/30"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0" />
                )}
                {message.text}
              </div>
            )}

            {/* Tab 1: Formulário de Publicação de Leis/Documentos */}
            {activeTab === "lei" && (
              <form onSubmit={handlePublishLaw} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Título da Publicação / Lei *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Atualização do Código Comercial 2026"
                      value={pubTitulo}
                      onChange={(e) => setPubTitulo(e.target.value)}
                      className="w-full rounded-md border border-hairline bg-card px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Categoria *
                    </label>
                    <select
                      value={pubCategoria}
                      onChange={(e) => setPubCategoria(e.target.value)}
                      className="w-full rounded-md border border-hairline bg-card px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                    >
                      <option value="Legislação">Legislação & Decretos</option>
                      <option value="Artigo">Artigo Jurídico</option>
                      <option value="Boletim">Boletim Informativo</option>
                      <option value="Aviso">Aviso Institucional</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Resumo Executivo (Exibido nos cartões) *
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Breve explicação dos pontos principais..."
                    value={pubResumo}
                    onChange={(e) => setPubResumo(e.target.value)}
                    className="w-full rounded-md border border-hairline bg-card px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Conteúdo Completo da Publicação
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Texto integral, análises, implicações práticas e recomendações..."
                    value={pubConteudo}
                    onChange={(e) => setPubConteudo(e.target.value)}
                    className="w-full rounded-md border border-hairline bg-card px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Carregar Ficheiro PDF (Opcional)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setPubPdfFile(e.target.files?.[0] || null)}
                      className="w-full rounded-md border border-hairline bg-card px-3 py-1.5 text-xs text-muted-foreground file:mr-3 file:rounded-xs file:border-0 file:bg-primary/10 file:px-2.5 file:py-1 file:text-xs file:font-semibold file:text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Ou URL do PDF/Documento
                    </label>
                    <input
                      type="url"
                      placeholder="https://exemplo.com/documento.pdf"
                      value={pubPdfUrl}
                      onChange={(e) => setPubPdfUrl(e.target.value)}
                      className="w-full rounded-md border border-hairline bg-card px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs hover:opacity-90 disabled:opacity-50"
                  >
                    <Upload className="h-4 w-4" />
                    {submitting ? "A publicar..." : "Publicar Atualização"}
                  </button>
                </div>
              </form>
            )}

            {/* Tab 2: Formulário de Adicionar à Galeria */}
            {activeTab === "galeria" && (
              <form onSubmit={handlePublishGallery} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Título da Fotografia *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Inauguração da Sucursal de Tete"
                      value={galTitulo}
                      onChange={(e) => setGalTitulo(e.target.value)}
                      className="w-full rounded-md border border-hairline bg-card px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Categoria da Galeria *
                    </label>
                    <select
                      value={galCategoria}
                      onChange={(e) => setGalCategoria(e.target.value)}
                      className="w-full rounded-md border border-hairline bg-card px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                    >
                      <option value="Instalações">Instalações</option>
                      <option value="Eventos">Eventos</option>
                      <option value="Equipa">Equipa</option>
                      <option value="Atividades">Atividades Institucionais</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Descrição Curta / Legenda
                  </label>
                  <input
                    type="text"
                    placeholder="Descrição da fotografia ou evento..."
                    value={galDescricao}
                    onChange={(e) => setGalDescricao(e.target.value)}
                    className="w-full rounded-md border border-hairline bg-card px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Carregar Imagem do Computador *
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setGalImgFile(e.target.files?.[0] || null)}
                      className="w-full rounded-md border border-hairline bg-card px-3 py-1.5 text-xs text-muted-foreground file:mr-3 file:rounded-xs file:border-0 file:bg-primary/10 file:px-2.5 file:py-1 file:text-xs file:font-semibold file:text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Ou URL da Imagem
                    </label>
                    <input
                      type="text"
                      placeholder="/equipa/foto.jpg ou https://..."
                      value={galImgUrl}
                      onChange={(e) => setGalImgUrl(e.target.value)}
                      className="w-full rounded-md border border-hairline bg-card px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs hover:opacity-90 disabled:opacity-50"
                  >
                    <Upload className="h-4 w-4" />
                    {submitting ? "A publicar..." : "Adicionar à Galeria"}
                  </button>
                </div>
              </form>
            )}

            {/* Tab 3: Gestão de Conteúdos */}
            {activeTab === "gerir" && (
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-foreground border-b border-hairline pb-2">
                    Publicações e Leis ({publicacoes.length})
                  </h4>
                  <div className="mt-3 divide-y divide-hairline">
                    {publicacoes.map((p) => (
                      <div key={p.id} className="flex items-center justify-between py-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">{p.titulo}</p>
                          <p className="text-xs text-muted-foreground">{p.categoria} • {p.data}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeletePub(p.id)}
                          className="rounded-xs border border-destructive/30 p-1.5 text-destructive hover:bg-destructive/10"
                          title="Eliminar publicação"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground border-b border-hairline pb-2">
                    Fotografias da Galeria ({galeriaItems.length})
                  </h4>
                  <div className="mt-3 divide-y divide-hairline">
                    {galeriaItems.map((g) => (
                      <div key={g.id} className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={g.imagemUrl}
                            alt={g.titulo}
                            className="h-10 w-10 rounded-xs object-cover border border-hairline"
                          />
                          <div>
                            <p className="text-sm font-medium text-foreground">{g.titulo}</p>
                            <p className="text-xs text-muted-foreground">{g.categoria} • {g.data}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteGal(g.id)}
                          className="rounded-xs border border-destructive/30 p-1.5 text-destructive hover:bg-destructive/10"
                          title="Eliminar fotografia"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
