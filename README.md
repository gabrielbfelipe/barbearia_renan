# Barber Shop Renan — Landing Page

Landing page em HTML5 + CSS3 + JavaScript puro (sem build step, sem framework)
para a Barber Shop Renan, em Araraquara/SP. Direção visual **Old Money
Barber**: preto quente, dourado envelhecido, tipografia serifada editorial.

Este projeto é uma **versão de apresentação**: a estrutura, o design e as
animações estão prontos, mas usa imagens do Unsplash e um logo provisório
enquanto os dados definitivos não são confirmados pelo proprietário (ver
"Pendências" abaixo).

## Como rodar

Sem build step — basta servir os arquivos estaticamente:

```bash
npx serve .
```

Abrir `http://localhost:3000` (ou a porta indicada pelo `serve`).

## Estrutura

```text
index.html                  ← página única
robots.txt, sitemap.xml, site.webmanifest, vercel.json
assets/
├── css/
│   ├── base/         reset, variáveis (paleta/tipografia/espaçamento), layout, animações
│   ├── components/   preloader, header, botões, cards, marquee, avaliações, whatsapp flutuante
│   └── sections/     uma folha por seção da página (hero, sobre, serviços, etc.)
├── js/
│   ├── config.js     ← fonte única dos dados do negócio e das imagens (ver abaixo)
│   ├── reviews.js    ← array de avaliações + renderização
│   ├── animations.js ← preloader, scroll reveal + stagger, parallax, marquee
│   └── main.js       ← header com scroll, menu mobile, facade do Google Maps,
│                        injeção dos dados de config.js no HTML
└── images/
    ├── logo/logo-provisorio.svg   ← trocar pelo logo real quando chegar
    └── placeholder-mapa.svg       ← usado pela facade do mapa antes do clique
```

O CSS é carregado por múltiplos `<link>` no `<head>` (não `@import`), para que
os arquivos baixem em paralelo.

## `assets/js/config.js` — editar aqui quando um dado mudar

Telefone, endereço, horário e as imagens (Unsplash) ficam centralizados em
`config.js` e são injetados no HTML via atributos `data-*` por `main.js`.
Trocar uma foto do Unsplash por uma foto real da barbearia, por exemplo, é
editar apenas o objeto `IMAGENS` — nada no HTML muda.

## Trocando o logo provisório

`assets/images/logo/logo-provisorio.svg` é referenciado em 6 lugares
(preloader, header, marca d'água da seção de identidade, CTA final, footer e
favicon/manifest). Substituir o arquivo por esse mesmo nome atualiza a página
inteira de uma vez; ajustar o `width`/`height` inline se a proporção do logo
real for diferente.

## `URL_DO_SITE` e assinatura — trocar antes de publicar

Placeholders usados enquanto o domínio final e a assinatura não são
definidos:

| Placeholder | Onde aparece |
|---|---|
| `URL_DO_SITE` | `index.html` (`canonical`, `og:url`, `logo` do JSON-LD), `robots.txt`, `sitemap.xml` |
| `[SEU NOME]` | `config.js` → `BARBEARIA.desenvolvedor.nome`, exibido no footer via `data-dev-nome` |

## Pendências a confirmar com o Renan antes de publicar

- Arquivo do logo (SVG ou PNG transparente).
- Endereço completo com CEP, telefone e horário definitivo.
- Preços e duração dos serviços (os cards já têm o slot pronto — ver
  comentário em `index.html` na seção Serviços — e a estrutura de dados em
  `cards.css` `.servico-card__meta`).
- Confirmar se "tratamentos capilares" é um serviço oferecido.
- Fotos reais: fachada, interior, cadeira, Renan trabalhando, retrato, corte,
  barba, sobrancelha, detalhes, clientes (com autorização).
- História profissional do Renan, tempo de atuação, especialidades, cursos,
  filosofia de trabalho.
- Ano de fundação (para um eventual selo "Desde [ano]").
- Instagram/Facebook oficiais.
- Nota média e quantidade de avaliações reais no Google — só depois disso o
  Schema.org pode ganhar `aggregateRating` e a página pode exibir esse número.
- Nome do desenvolvedor e domínio final (ver tabela acima).

## Créditos

Reaproveita estrutura e utilitários (facade de mapa, scroll reveal, reset)
do projeto anterior *Pedrinho Barbearia*, adaptados para a nova identidade
visual e estendidos com preloader, marquee, parallax, avaliações em array e
galeria masonry.
