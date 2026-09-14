// Avaliações reais fornecidas pelo cliente, em estrutura de dados —
// adicionar uma nova avaliação é só acrescentar um objeto a este array.
//
// Nota: enquanto a nota média e a quantidade total de avaliações no Google
// não forem verificadas, nenhum "4,9 — X avaliações" é exibido na página
// nem inserido no Schema.org (ver index.html, bloco JSON-LD).

const AVALIACOES = [
  {
    nome: "Daniela Borges",
    texto: "Ótimo atendimento e trabalho de excelente qualidade.",
    estrelas: 5,
  },
  {
    nome: "Fabiano Risse",
    texto: "Ambiente muito bom! Atendimento top!",
    estrelas: 5,
  },
  {
    nome: "Cliente Barber Shop Renan",
    texto: "Melhor profissional da cidade. 5 estrelas sem dúvida!!!",
    estrelas: 5,
  },
  {
    nome: "Cliente Barber Shop Renan",
    texto: "Atendimento e qualidade nota 1000.",
    estrelas: 5,
  },
  {
    nome: "Cliente Barber Shop Renan",
    texto: "Lugar de qualidade e preço justo.",
    estrelas: 5,
  },
];

function iniciais(nomeCompleto) {
  return nomeCompleto
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join("");
}

function estrelasHtml(quantidade) {
  return Array.from({ length: 5 })
    .map((_, i) => (i < quantidade ? "★" : "☆"))
    .join("");
}

function renderizarAvaliacoes() {
  const lista = document.querySelector("[data-avaliacoes-lista]");
  if (!lista) return;

  lista.innerHTML = AVALIACOES.map(
    (avaliacao, indice) => `
      <article class="avaliacao-card" data-reveal style="--i: ${indice}">
        <p class="avaliacao-card__estrelas" aria-label="${avaliacao.estrelas} de 5 estrelas">
          ${estrelasHtml(avaliacao.estrelas)}
        </p>
        <p class="avaliacao-card__texto">“${avaliacao.texto}”</p>
        <div class="avaliacao-card__autor">
          <span class="avaliacao-card__avatar" aria-hidden="true">${iniciais(avaliacao.nome)}</span>
          <span class="avaliacao-card__nome">${avaliacao.nome}</span>
        </div>
      </article>
    `
  ).join("");
}

document.addEventListener("DOMContentLoaded", renderizarAvaliacoes);
