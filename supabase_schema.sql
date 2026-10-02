-- Script SQL para criar as tabelas no Supabase (copie e cole no SQL Editor do Supabase)

-- 1. Tabela de Publicações e Atualizações de Leis
CREATE TABLE IF NOT EXISTS public.publicacoes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  categoria TEXT NOT NULL DEFAULT 'Legislação',
  resumo TEXT NOT NULL,
  conteudo TEXT,
  pdf_url TEXT,
  data DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabela da Galeria de Fotos
CREATE TABLE IF NOT EXISTS public.galeria (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  categoria TEXT NOT NULL DEFAULT 'Instalações',
  descricao TEXT,
  imagem_url TEXT NOT NULL,
  data TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar leitura pública RLS (Row Level Security)
ALTER TABLE public.publicacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galeria ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública de publicacoes" ON public.publicacoes FOR SELECT USING (true);
CREATE POLICY "Permitir inserção de publicacoes" ON public.publicacoes FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir eliminação de publicacoes" ON public.publicacoes FOR DELETE USING (true);

CREATE POLICY "Permitir leitura pública de galeria" ON public.galeria FOR SELECT USING (true);
CREATE POLICY "Permitir inserção na galeria" ON public.galeria FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir eliminação na galeria" ON public.galeria FOR DELETE USING (true);
