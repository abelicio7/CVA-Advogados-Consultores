export const NAV_ITEMS = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre Nós" },
  { id: "servicos", label: "Serviços" },
  { id: "equipa", label: "Equipa" },
  { id: "diferenciais", label: "Diferenciais" },
  { id: "presenca", label: "Presença" },
  { id: "contactos", label: "Contactos" },
] as const;

export const STATS = [
  { value: 2012, suffix: "", label: "Ano de constituição da firma" },
  { value: 3, suffix: "", label: "Cidades com representação" },
  { value: 4, suffix: "", label: "Advogados sócios" },
  { value: null, suffix: "+", label: "Equipa jurídica multidisciplinar" },
] as const;

export const VALORES = [
  "Transparência",
  "Respeito",
  "Lealdade",
  "Sigilo profissional",
  "Confidencialidade",
  "Ética",
  "Princípios morais",
] as const;

export type Servico = {
  id: string;
  titulo: string;
  resumo: string;
  detalhes: string[];
};

export const SERVICOS: Servico[] = [
  {
    id: "representacao-judicial",
    titulo: "Representação Judicial",
    resumo: "Patrocínio em processos judiciais e diligências legais.",
    detalhes: [
      "Representação de clientes em processos judiciais e diligências legais, nos casos em que a atuação do escritório seja devidamente mandatada.",
    ],
  },
  {
    id: "contratos",
    titulo: "Contratos e Instrumentos Jurídicos",
    resumo: "Elaboração, análise e revisão de instrumentos contratuais.",
    detalhes: [
      "Contratos",
      "Acordos",
      "Memorandos de entendimento",
      "Instrumentos jurídicos diversos",
    ],
  },
  {
    id: "migratorio",
    titulo: "Direito Migratório",
    resumo: "Tramitação e acompanhamento de documentação de expatriados.",
    detalhes: [
      "Autorizações de trabalho",
      "Vistos de trabalho",
      "Residência",
      "Renovação de documentos legais de expatriados",
    ],
  },
  {
    id: "extrajudicial",
    titulo: "Representação Extrajudicial",
    resumo: "Representação perante autoridades e entidades públicas.",
    detalhes: [
      "Autoridade Tributária",
      "Departamento de Trabalho",
      "Serviços de Migração",
      "Autoridades municipais",
      "Conservatórias",
      "Notários",
      "Outros órgãos administrativos",
    ],
  },
  {
    id: "documentacao",
    titulo: "Documentação Jurídica",
    resumo: "Redação de peças e comunicações de natureza jurídica.",
    detalhes: [
      "Cartas",
      "Notificações",
      "Requerimentos",
      "Respostas",
      "Reclamações",
      "Exposições",
      "Comunicações institucionais",
      "Outros instrumentos jurídicos necessários",
    ],
  },
  {
    id: "regulamentacao",
    titulo: "Regulamentação Interna",
    resumo: "Desenvolvimento e atualização de normativos internos.",
    detalhes: [
      "Códigos de Conduta",
      "Regulamentos Internos",
      "Políticas de segurança",
      "Manuais disciplinares",
      "Procedimentos laborais",
    ],
  },
  {
    id: "pareceres",
    titulo: "Pareceres Jurídicos",
    resumo: "Pareceres escritos fundamentados na legislação moçambicana.",
    detalhes: [
      "Emissão de pareceres jurídicos escritos com base na legislação moçambicana aplicável e, quando necessário, na jurisprudência e doutrina pertinente.",
    ],
  },
  {
    id: "analise-contratual",
    titulo: "Análise Contratual",
    resumo: "Interpretação de cláusulas e respetivas implicações jurídicas.",
    detalhes: [
      "Análise e interpretação de documentos legais, cláusulas contratuais e respetivas implicações jurídicas.",
    ],
  },
  {
    id: "reunioes",
    titulo: "Apoio a Reuniões e Sessões de Trabalho",
    resumo: "Presença jurídica em reuniões e sessões de trabalho.",
    detalhes: [
      "Comparecimento a reuniões e sessões de trabalho que exijam representação jurídica, mediante solicitação.",
    ],
  },
  {
    id: "disciplinares",
    titulo: "Processos Disciplinares",
    resumo: "Apoio jurídico em procedimentos disciplinares.",
    detalhes: [
      "Aconselhamento jurídico",
      "Preparação documental",
      "Representação em audiências internas",
    ],
  },
  {
    id: "assessoria",
    titulo: "Assessoria Jurídica Permanente",
    resumo: "Acompanhamento jurídico geral e continuado.",
    detalhes: [
      "Prestação de assessoria jurídica geral e permanente, incluindo esclarecimento de dúvidas jurídicas pontuais.",
    ],
  },
  {
    id: "due-diligence",
    titulo: "Due Diligence",
    resumo: "Diligência prévia para maior segurança jurídica das operações.",
    detalhes: [
      "Realização de diligência prévia quando necessária, com vista a garantir maior segurança jurídica das operações.",
    ],
  },
];

export const DIFERENCIAIS = [
  {
    titulo: "Empatia",
    texto: "Compreensão das necessidades e circunstâncias dos clientes.",
  },
  {
    titulo: "Bom senso",
    texto: "Atuação equilibrada e orientada para soluções.",
  },
  {
    titulo: "Parceria",
    texto: "Construção de relações duradouras com clientes.",
  },
  {
    titulo: "Excelência técnica",
    texto: "Busca permanente por conhecimento e qualidade jurídica.",
  },
  {
    titulo: "Soluções inovadoras",
    texto: "Respostas jurídicas adaptadas aos desafios atuais.",
  },
  {
    titulo: "Eficiência",
    texto: "Foco em soluções práticas e eficientes.",
  },
] as const;

export type Socio = {
  nome: string;
  cargo: string;
  foto: string;
  iniciais: string;
  carteira: string;
  pontos: string[];
};

export const SOCIOS: Socio[] = [
  {
    nome: "Dr. José Tambara João Cipriano",
    cargo: "Sócio e Administrador da Sucursal de Tete",
    foto: "/equipa/jose-cipriano.jpg",
    iniciais: "JC",
    carteira: "n.º 1782",
    pontos: [
      "Advogado com 9 anos de experiência.",
      "Árbitro.",
      "Vice-Presidente do Conselho Provincial da OAM – Tete.",
      "Presidiu o pelouro da defesa da dignidade e reforço das prerrogativas do Advogado no Conselho Provincial da OAM – Tete de 2023 a 2026.",
      "Presidiu o pelouro do combate à procuradoria ilícita no Conselho Provincial da OAM – Niassa de 2020 a 2023.",
    ],
  },
  {
    nome: "Dr. Elísio Verniz Dauce",
    cargo: "Sócio e Administrador do Escritório de Lichinga",
    foto: "/equipa/elisio-saude.jpg",
    iniciais: "ED",
    carteira: "n.º 2116",
    pontos: [
      "Advogado com 6 anos de experiência.",
      "Árbitro.",
      "Vice-Presidente do Conselho Provincial da OAM – Niassa de 2023 a 2026.",
      "Presidiu o pelouro da administração e finanças no Conselho Provincial da OAM – Niassa de 2020 a 2023.",
    ],
  },
  {
    nome: "Dr. Celso Diogo Mendonça",
    cargo: "Sócio Gerente da Sociedade",
    foto: "/equipa/celso-diogo.jpg",
    iniciais: "CM",
    carteira: "n.º 736",
    pontos: [
      "Advogado com mais de 15 anos de experiência.",
      "Árbitro.",
      "Presidente do Conselho Provincial da OAM – Niassa de 2023 a 2026.",
      "Presidiu o pelouro da defesa da dignidade e reforço das prerrogativas do Advogado do Conselho Provincial da OAM – Niassa de 2020 a 2023.",
      "Fluente em Português e Inglês.",
    ],
  },
];

export type Associado = {
  nome: string;
  carteira: string;
  foto?: string;
  cargo?: string;
};

export const ASSOCIADOS: Associado[] = [
  {
    nome: "Delton Dias Fevereiro",
    cargo: "Advogado Associado",
    foto: "/equipa/delton-fevereiro.jpg",
    carteira: "Carteira profissional n.º 3239",
  },
  { nome: "Áurio Agnaldo Gilberto Cochelane", carteira: "Carteira profissional n.º 3215" },
  { nome: "João Bilai Tambo Júnior", carteira: "Carteira profissional n.º 3619" },
  { nome: "Alfredo Chicuele", carteira: "Recém-inscrito, ainda sem número de carteira atribuído" },
];

export type Local = {
  id: string;
  cidade: string;
  tipo: string;
  morada: string;
  telefone?: string;
  /* Posição relativa (%) no mapa estilizado de Moçambique */
  x: number;
  y: number;
};

export const LOCAIS: Local[] = [
  {
    id: "lichinga",
    cidade: "Lichinga",
    tipo: "Sede",
    morada: "Rua do Aeroporto, Edifício CVA Business Centre",
    telefone: "+258 875005003",
    x: 31,
    y: 15,
  },
  {
    id: "tete",
    cidade: "Tete",
    tipo: "Sucursal",
    morada: "Avenida da Liberdade, Edifício Hotel Zambeze – O Paraíso Misterioso",
    telefone: "+258 875005002",
    x: 22,
    y: 39,
  },
  {
    id: "maputo",
    cidade: "Maputo",
    tipo: "Representação",
    morada: "Bairro da Sommerschield, Edifício 41 Business Centre",
    x: 40,
    y: 90,
  },
];

export const EMAIL = "geral@cvaadvogados.co.mz";
