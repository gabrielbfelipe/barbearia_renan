// Configuração central do site — único lugar a editar quando um dado do
// negócio mudar (telefone, endereço, horário, imagens, links).
//
// PENDÊNCIAS a confirmar com o Renan antes de publicar (ver README.md):
// CEP, horário definitivo, preços/duração dos serviços, ano de fundação,
// Instagram/Facebook oficiais, nota e nº de avaliações reais do Google.

const BARBEARIA = {
  nome: "Barber Shop Renan",

  telefoneE164: "+5516997479907",
  telefoneExibicao: "(16) 99747-9907",

  endereco: {
    rua: "Rua José do Patrocínio",
    numero: "582",
    bairro: "Vila Xavier",
    cidade: "Araraquara",
    estado: "SP",
    cep: "", // TODO: confirmar CEP com o proprietário
  },

  horario: {
    dias: "Segunda a sábado",
    faixa: "09:00 às 19:00",
    domingo: "Fechado",
  },

  mensagemWhatsapp:
    "Olá, Renan! Encontrei a Barber Shop Renan pela internet e gostaria de saber sobre os horários disponíveis.",

  // Placeholders — preencher quando o projeto for publicado de fato.
  desenvolvedor: {
    nome: "[SEU NOME]",
    url: "",
  },
  siteUrl: "URL_DO_SITE",

  instagramUrl: "", // TODO: aguardando confirmação do Renan
};

// Link keyless do Google Maps (?q=...&output=embed) — sem chave de API,
// sem projeto no Google Cloud e sem custo. Usado apenas depois do clique
// no botão da facade (ver maps-facade em main.js).
const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Rua+Jos%C3%A9+do+Patroc%C3%ADnio,+582+-+Vila+Xavier,+Araraquara+-+SP&output=embed";

const GOOGLE_MAPS_DIRECOES_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Rua+Jos%C3%A9+do+Patroc%C3%ADnio,+582+-+Vila+Xavier,+Araraquara+-+SP";

// Imagens provisórias via Unsplash — trocar por fotos reais da barbearia
// substituindo apenas as URLs abaixo. `fm=webp` + `q=70` mantêm o peso
// baixo; `w` é ajustado por breakpoint no HTML via srcset quando aplicável.
const UNSPLASH_BASE = "https://images.unsplash.com/";

function unsplash(id, largura) {
  return `${UNSPLASH_BASE}${id}?auto=format&fit=crop&fm=webp&q=70&w=${largura}`;
}

// Cada ID abaixo foi baixado e conferido visualmente (tom de cor, ausência
// de neon/elementos fora do tema) antes de entrar aqui — ver README.md.
const IMAGENS = {
  hero: {
    id: "photo-1585747860715-2ba37e788b70",
    alt: "Interior de barbearia clássica com cadeiras de couro, madeira escura e iluminação quente",
  },
  barbeiro: {
    id: "photo-1599351431202-1e0f0137899a",
    alt: "Barbeiro em detalhe de acabamento com navalha",
  },
  sobre: {
    id: "photo-1512690459411-b9245aed614b",
    alt: "Cadeira de barbeiro em couro e cromo no ambiente da barbearia",
  },
  servicos: {
    corte: {
      id: "photo-1622286342621-4bd786c2447c",
      alt: "Barbeiro finalizando o corte com máquina, cliente de costas",
    },
    barba: {
      id: "photo-1503951914875-452162b0f3f1",
      alt: "Barba sendo aparada com tesoura em ambiente escuro",
    },
    sobrancelha: {
      id: "photo-1621607512214-68297480165e",
      alt: "Tesoura e ferramentas de acabamento sobre bancada de madeira",
    },
    tratamentos: {
      id: "photo-1587909209111-5097ee578ec3",
      alt: "Produtos e ferramentas de tratamento capilar sobre bancada de madeira",
    },
  },
  galeria: [
    { id: "photo-1585747860715-2ba37e788b70", alt: "Cadeira de barbeiro em ambiente clássico", grande: true },
    { id: "photo-1512690459411-b9245aed614b", alt: "Cadeira de barbeiro em couro e cromo" },
    { id: "photo-1599351431202-1e0f0137899a", alt: "Acabamento com navalha em detalhe" },
    { id: "photo-1622286342621-4bd786c2447c", alt: "Corte finalizado com máquina", grande: true },
    { id: "photo-1503951914875-452162b0f3f1", alt: "Barba sendo aparada com tesoura" },
    { id: "photo-1587909209111-5097ee578ec3", alt: "Produtos e ferramentas de barbearia sobre bancada de madeira" },
    { id: "photo-1621607512214-68297480165e", alt: "Tesoura e secador sobre bancada de madeira" },
    { id: "photo-1596728325488-58c87691e9af", alt: "Barbeiro fazendo a barba do cliente com navalha" },
  ],
};
