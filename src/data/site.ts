export const NAV_ITEMS = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre Nós" },
  { id: "servicos", label: "Serviços" },
  { id: "publicacoes", label: "Publicações & Leis" },
  { id: "galeria", label: "Galeria" },
  { id: "equipa", label: "Equipa" },
  { id: "diferenciais", label: "Diferenciais" },
  { id: "presenca", label: "Presença" },
  { id: "contactos", label: "Contactos" },
] as const;

export const STATS = [
  { value: 2012, suffix: "", label: "Ano de constituição da firma" },
  { value: 3, suffix: "", label: "Cidades com representação" },
  { value: 3, suffix: "", label: "Advogados sócios" },
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
      "Patrocinio em processos comerciais, civeis, laboaris, ambientais e criminais",
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
    nome: "Dr. Elísio Verniz Dauce",
    cargo: "Advogado e Sócio Administrador da Sucursal de Lichinga",
    foto: "/equipa/elisio-dauce.jpg",
    iniciais: "ED",
    carteira: "n.º 2116",
    pontos: [
      "Advogado com 6 anos de experiência.",
      "Árbitro.",
      "Vice-Presidente do Conselho Provincial da OAM – Niassa de 2023 a 2026.",
      "Coordenou o pelouro da administração e finanças no Conselho Provincial da OAM – Niassa de 2020 a 2023.",
    ],
  },
  {
    nome: "Dr. Celso Mendonça Diogo",
    cargo: "Advogado e Sócio Fundador",
    foto: "/equipa/celso-diogo.jpg",
    iniciais: "CM",
    carteira: "n.º 736",
    pontos: [
      "Advogado com mais de 15 anos de experiência.",
      "Árbitro.",
      "Fluente em Português e Inglês.",
    ],
  },
  {
    nome: "Dr. José Tambara João Cipriano",
    cargo: "Advogado e Sócio Administrador da Sucursal de Tete",
    foto: "/equipa/jose-cipriano.jpg",
    iniciais: "JC",
    carteira: "n.º 1782",
    pontos: [
      "Advogado com 9 anos de experiência.",
      "Árbitro.",
      "Vice-Presidente do Conselho Provincial da OAM – Tete.",
      "Coordenou o pelouro da defesa da dignidade e reforço das prerrogativas do Advogado no Conselho Provincial da OAM – Tete de 2023 a 2026.",
      "Coordenou o pelouro do combate à procuradoria ilícita no Conselho Provincial da OAM – Niassa de 2020 a 2023.",
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
  { nome: "João Bilai Tambo Júnior", cargo: "Advogado Associado", foto: "/equipa/joao-bilai.jpg", carteira: "Carteira profissional n.º 3619" },
  { nome: "Alfredo Chicuele", cargo: "Advogado Associado", foto: "/equipa/alfredo-chicuele.jpg", carteira: "" },
];

export type Contabilista = {
  nome: string;
  cargo: string;
  foto?: string;
  carteira?: string;
};

export const CONTABILISTAS: Contabilista[] = [
  { nome: "Amós Magalhães", cargo: "Contabilista", foto: "/equipa/amos-magalhaes.jpg", carteira: "" },
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
    tipo: "Sucursal",
    morada: "Bairro da Sommerschield, Edifício 41 Business Centre",
    telefone: "+258 875005001",
    x: 40,
    y: 90,
  },
];

export const EMAIL = "geral@cvaadvogados.co.mz";
