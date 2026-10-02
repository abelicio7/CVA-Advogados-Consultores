interface FooterProps {
  onOpenAdmin?: () => void;
}

export function Footer({ onOpenAdmin }: FooterProps) {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="inline-block rounded-xs bg-white px-3.5 py-2 shadow-xs">
              <img
                src="/cva-logo.png"
                alt="Logótipo CVA Advogados & Consultores"
                width={320}
                height={80}
                loading="lazy"
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="mt-6 font-display text-xl text-ink-foreground/85">
              Excelência jurídica. Confiança. Compromisso.
            </p>
          </div>

          <nav className="lg:col-span-4" aria-label="Navegação do rodapé">
            <p className="eyebrow text-ink-foreground/50">Navegação</p>
            <ul className="mt-5 grid grid-cols-2 gap-3 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-ink-foreground/75 underline-offset-4 transition-colors hover:text-ink-foreground hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow text-ink-foreground/50">Contacto</p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-5 block text-sm text-ink-foreground/80 underline-offset-4 transition-colors hover:text-ink-foreground hover:underline"
            >
              {EMAIL}
            </a>
            <p className="mt-4 text-sm text-ink-foreground/60">Lichinga · Tete · Maputo</p>
            
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="mt-6 inline-flex items-center gap-1.5 rounded-xs border border-ink-foreground/20 px-3 py-1.5 text-xs text-ink-foreground/70 hover:border-ink-foreground/50 hover:text-ink-foreground transition-colors"
              >
                🔒 Área Reservada / Publicar
              </button>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-ink-foreground/15 pt-6 text-xs text-ink-foreground/50">
          <div>© {ano} CVA Advogados &amp; Consultores. Todos os direitos reservados.</div>
          {onOpenAdmin && (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-left sm:text-right text-xs text-ink-foreground/40 hover:text-ink-foreground/80 transition-colors"
            >
              Painel de Gestão de Leis & Galeria
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
