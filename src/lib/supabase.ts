import { createClient } from "@supabase/supabase-js";

// Supabase environment variables (can be added to .env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface Publicacao {
  id: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  categoria: string; // 'Legislacao' | 'Artigo' | 'Boletim' | 'Aviso'
  pdfUrl?: string;
  imagemUrl?: string;
  data: string;
  criadoEm?: string;
}

export interface GaleriaItem {
  id: string;
  titulo: string;
  descricao?: string;
  imagemUrl: string;
  categoria: string; // 'Instalações' | 'Eventos' | 'Equipa' | 'Atividades'
  data: string;
  criadoEm?: string;
}

// Initial seed data
export const INITIAL_PUBLICACOES: Publicacao[] = [
  {
    id: "pub-1",
    titulo: "Atualização da Legislação Laboral e Implicações Práticas",
    resumo:
      "Resumo dos principais pontos de alteração da Lei do Trabalho em Moçambique e recomendações para as empresas.",
    conteudo:
      "A recente atualização da legislação laboral traz novos desafios para a gestão de recursos humanos e contratos de trabalho. Analisamos os prazos de aviso prévio, indemnizações e novas regras para trabalhadores expatriados.",
    categoria: "Legislação",
    data: "2026-02-15",
  },
  {
    id: "pub-2",
    titulo: "Boletim Informativo: Regime Tributário para Novas Empresas",
    resumo: "Visão geral sobre incentivos fiscais e obrigações tributárias para sociedades em Moçambique.",
    conteudo:
      "Compreender as obrigações tributárias atempadamente evita contraordenações fiscais e garante o cumprimento das normas vigentes.",
    categoria: "Boletim",
    data: "2026-01-20",
  },
];

export const INITIAL_GALERIA: GaleriaItem[] = [
  {
    id: "gal-1",
    titulo: "Sede CVA Business Centre — Lichinga",
    descricao: "Instalações corporativas contemporâneas preparadas para atendimento ao cliente com total privacidade e conforto.",
    imagemUrl: "/hero-architecture.jpg",
    categoria: "Instalações",
    data: "2026",
  },
  {
    id: "gal-2",
    titulo: "Instalações e Gabinetes de Atendimento",
    descricao: "Espaços concebidos para reuniões confidenciais e assessoria jurídica de elevado padrão.",
    imagemUrl: "/office-detail.jpg",
    categoria: "Instalações",
    data: "2026",
  },
];

const LOCAL_STORAGE_PUB_KEY = "cva_publicacoes_data";
const LOCAL_STORAGE_GAL_KEY = "cva_galeria_data_v3";

// SSR-safe localStorage helpers
function getStoredLocalData(key: string): string | null {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn("Error reading localStorage:", e);
    }
  }
  return null;
}

function setStoredLocalData(key: string, value: string): void {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn("Error writing localStorage:", e);
    }
  }
}

// Helper to sort publications with newest date and newest creation time first
export function sortPublicacoesDesc(items: Publicacao[]): Publicacao[] {
  return [...items].sort((a, b) => {
    const timeA = new Date(a.data).getTime() || 0;
    const timeB = new Date(b.data).getTime() || 0;
    if (timeB !== timeA) return timeB - timeA;
    const createdA = a.criadoEm ? new Date(a.criadoEm).getTime() : 0;
    const createdB = b.criadoEm ? new Date(b.criadoEm).getTime() : 0;
    if (createdB !== createdA) return createdB - createdA;
    return b.id.localeCompare(a.id);
  });
}

// Helper functions for Publicações
export async function getPublicacoes(): Promise<Publicacao[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("publicacoes")
        .select("*")
        .order("data", { ascending: false });
      if (!error && data && data.length > 0) {
        const mapped = data.map((item) => ({
          id: item.id,
          titulo: item.titulo,
          resumo: item.resumo,
          conteudo: item.conteudo,
          categoria: item.categoria,
          pdfUrl: item.pdf_url,
          imagemUrl: item.imagem_url || item.imagemUrl || undefined,
          data: item.data,
          criadoEm: item.created_at,
        }));
        return sortPublicacoesDesc(mapped);
      }
    } catch (e) {
      console.warn("Supabase fetch error, falling back to local store:", e);
    }
  }

  const stored = getStoredLocalData(LOCAL_STORAGE_PUB_KEY);
  if (stored) {
    try {
      const parsed: Publicacao[] = JSON.parse(stored);
      return sortPublicacoesDesc(parsed);
    } catch (e) {
      console.error(e);
    }
  }
  setStoredLocalData(LOCAL_STORAGE_PUB_KEY, JSON.stringify(INITIAL_PUBLICACOES));
  return sortPublicacoesDesc(INITIAL_PUBLICACOES);
}

export async function addPublicacao(pub: Omit<Publicacao, "id">): Promise<Publicacao> {
  const newPub: Publicacao = {
    ...pub,
    id: "pub-" + Date.now(),
    criadoEm: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("publicacoes")
        .insert([
          {
            titulo: pub.titulo,
            resumo: pub.resumo,
            conteudo: pub.conteudo,
            categoria: pub.categoria,
            pdf_url: pub.pdfUrl || null,
            imagem_url: pub.imagemUrl || null,
            data: pub.data,
          },
        ])
        .select()
        .single();
      if (!error && data) {
        newPub.id = data.id;
      }
    } catch (e) {
      console.error("Supabase insert error:", e);
    }
  }

  const current = await getPublicacoes();
  const updated = sortPublicacoesDesc([newPub, ...current.filter((p) => p.id !== newPub.id)]);
  setStoredLocalData(LOCAL_STORAGE_PUB_KEY, JSON.stringify(updated));
  return newPub;
}

export async function deletePublicacao(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("publicacoes").delete().eq("id", id);
    } catch (e) {
      console.error("Supabase delete error:", e);
    }
  }

  const current = await getPublicacoes();
  const updated = current.filter((p) => p.id !== id);
  setStoredLocalData(LOCAL_STORAGE_PUB_KEY, JSON.stringify(updated));
}

export async function updatePublicacao(
  id: string,
  updates: Partial<Omit<Publicacao, "id">>
): Promise<Publicacao | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const dbUpdates: Record<string, unknown> = {};
      if (updates.titulo !== undefined) dbUpdates.titulo = updates.titulo;
      if (updates.resumo !== undefined) dbUpdates.resumo = updates.resumo;
      if (updates.conteudo !== undefined) dbUpdates.conteudo = updates.conteudo;
      if (updates.categoria !== undefined) dbUpdates.categoria = updates.categoria;
      if (updates.pdfUrl !== undefined) dbUpdates.pdf_url = updates.pdfUrl;
      if (updates.imagemUrl !== undefined) dbUpdates.imagem_url = updates.imagemUrl;
      if (updates.data !== undefined) dbUpdates.data = updates.data;

      await supabase.from("publicacoes").update(dbUpdates).eq("id", id);
    } catch (e) {
      console.error("Supabase update error:", e);
    }
  }

  const current = await getPublicacoes();
  const index = current.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updatedItem: Publicacao = { ...current[index], ...updates };
  const updatedList = sortPublicacoesDesc(current.map((p) => (p.id === id ? updatedItem : p)));
  setStoredLocalData(LOCAL_STORAGE_PUB_KEY, JSON.stringify(updatedList));
  return updatedItem;
}

// Helper functions for Galeria
export async function getGaleria(): Promise<GaleriaItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("galeria")
        .select("*")
        .order("data", { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          titulo: item.titulo,
          descricao: item.descricao,
          imagemUrl: item.imagem_url,
          categoria: item.categoria,
          data: item.data,
          criadoEm: item.created_at,
        }));
      }
    } catch (e) {
      console.warn("Supabase galeria fetch error, falling back:", e);
    }
  }

  // Cleanup legacy cached keys containing team photos
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    try {
      localStorage.removeItem("cva_galeria_data");
      localStorage.removeItem("cva_galeria_data_v2");
    } catch {
      // ignore
    }
  }

  const teamAndPartnerPhotos = [
    "equipa",
    "jose-cipriano",
    "celso-diogo",
    "elisio-dauce",
    "elisio-saude",
    "delton-fevereiro",
  ];
  const isTeamOrPartnerPhoto = (url: string) =>
    teamAndPartnerPhotos.some((name) => url.toLowerCase().includes(name));

  const stored = getStoredLocalData(LOCAL_STORAGE_GAL_KEY);
  if (stored) {
    try {
      const parsed: GaleriaItem[] = JSON.parse(stored);
      const cleaned = parsed.filter((item) => !isTeamOrPartnerPhoto(item.imagemUrl));
      if (cleaned.length !== parsed.length) {
        setStoredLocalData(LOCAL_STORAGE_GAL_KEY, JSON.stringify(cleaned));
      }
      return cleaned.length > 0 ? cleaned : INITIAL_GALERIA;
    } catch (e) {
      console.error(e);
    }
  }
  setStoredLocalData(LOCAL_STORAGE_GAL_KEY, JSON.stringify(INITIAL_GALERIA));
  return INITIAL_GALERIA;
}

export async function addGaleriaItem(item: Omit<GaleriaItem, "id">): Promise<GaleriaItem> {
  const newItem: GaleriaItem = {
    ...item,
    id: "gal-" + Date.now(),
    criadoEm: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("galeria")
        .insert([
          {
            titulo: item.titulo,
            descricao: item.descricao || null,
            imagem_url: item.imagemUrl,
            categoria: item.categoria,
            data: item.data,
          },
        ])
        .select()
        .single();
      if (!error && data) {
        newItem.id = data.id;
      }
    } catch (e) {
      console.error("Supabase galeria insert error:", e);
    }
  }

  const current = await getGaleria();
  const updated = [newItem, ...current];
  setStoredLocalData(LOCAL_STORAGE_GAL_KEY, JSON.stringify(updated));
  return newItem;
}

export async function deleteGaleriaItem(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("galeria").delete().eq("id", id);
    } catch (e) {
      console.error("Supabase delete galeria error:", e);
    }
  }

  const current = await getGaleria();
  const updated = current.filter((g) => g.id !== id);
  setStoredLocalData(LOCAL_STORAGE_GAL_KEY, JSON.stringify(updated));
}

export async function updateGaleriaItem(
  id: string,
  updates: Partial<Omit<GaleriaItem, "id">>
): Promise<GaleriaItem | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const dbUpdates: Record<string, unknown> = {};
      if (updates.titulo !== undefined) dbUpdates.titulo = updates.titulo;
      if (updates.descricao !== undefined) dbUpdates.descricao = updates.descricao;
      if (updates.imagemUrl !== undefined) dbUpdates.imagem_url = updates.imagemUrl;
      if (updates.categoria !== undefined) dbUpdates.categoria = updates.categoria;
      if (updates.data !== undefined) dbUpdates.data = updates.data;

      await supabase.from("galeria").update(dbUpdates).eq("id", id);
    } catch (e) {
      console.error("Supabase update galeria error:", e);
    }
  }

  const current = await getGaleria();
  const index = current.findIndex((g) => g.id === id);
  if (index === -1) return null;

  const updatedItem: GaleriaItem = { ...current[index], ...updates };
  const updatedList = current.map((g) => (g.id === id ? updatedItem : g));
  setStoredLocalData(LOCAL_STORAGE_GAL_KEY, JSON.stringify(updatedList));
  return updatedItem;
}
