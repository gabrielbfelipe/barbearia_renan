// Comportamento principal: injeção de dados do config.js, header com
// scroll, menu mobile, facade do Google Maps e botão flutuante de WhatsApp.

document.addEventListener("DOMContentLoaded", () => {
  injetarDadosDoNegocio();
  configurarHeaderComScroll();
  configurarMenuMobile();
  configurarFacadeMapa();
  configurarWhatsappFlutuante();
  document.querySelectorAll("[data-ano-atual]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});

// --- Injeção de dados a partir de config.js -----------------------------
// Telefone, endereço e horário aparecem em ~6 lugares na página; aqui eles
// têm uma única origem (BARBEARIA em config.js) e são espalhados via data-*.
function injetarDadosDoNegocio() {
  const linkWhatsapp = `https://wa.me/${BARBEARIA.telefoneE164.replace(/\D/g, "")}?text=${encodeURIComponent(
    BARBEARIA.mensagemWhatsapp
  )}`;
  const linkTelefone = `tel:${BARBEARIA.telefoneE164}`;

  document.querySelectorAll("[data-whatsapp-link]").forEach((el) => (el.href = linkWhatsapp));
  document.querySelectorAll("[data-tel-link]").forEach((el) => (el.href = linkTelefone));
  document.querySelectorAll("[data-telefone-texto]").forEach((el) => (el.textContent = BARBEARIA.telefoneExibicao));
  document.querySelectorAll("[data-endereco-rua]").forEach(
    (el) => (el.textContent = `${BARBEARIA.endereco.rua}, ${BARBEARIA.endereco.numero}`)
  );
  document.querySelectorAll("[data-endereco-bairro]").forEach(
    (el) => (el.textContent = `${BARBEARIA.endereco.bairro} — ${BARBEARIA.endereco.cidade}/${BARBEARIA.endereco.estado}`)
  );
  document.querySelectorAll("[data-horario-dias]").forEach((el) => (el.textContent = BARBEARIA.horario.dias));
  document.querySelectorAll("[data-horario-faixa]").forEach((el) => (el.textContent = BARBEARIA.horario.faixa));
  document.querySelectorAll("[data-horario-domingo]").forEach((el) => (el.textContent = BARBEARIA.horario.domingo));
  document.querySelectorAll("[data-direcoes-link]").forEach((el) => (el.href = GOOGLE_MAPS_DIRECOES_URL));
  document.querySelectorAll("[data-dev-nome]").forEach((el) => (el.textContent = BARBEARIA.desenvolvedor.nome));

  // Imagens vindas do Unsplash (config.js) — trocar por arquivos locais
  // depois é só editar o objeto IMAGENS, sem tocar no HTML.
  const setSrc = (seletor, dados, largura = 1200) => {
    const el = document.querySelector(seletor);
    if (!el || !dados) return;
    el.src = unsplash(dados.id, largura);
    el.alt = dados.alt;
  };

  setSrc("[data-img-hero]", IMAGENS.hero, 1920);
  setSrc("[data-img-sobre]", IMAGENS.sobre, 1000);
  setSrc("[data-img-barbeiro]", IMAGENS.barbeiro, 900);
  setSrc("[data-img-servico-corte]", IMAGENS.servicos.corte, 700);
  setSrc("[data-img-servico-barba]", IMAGENS.servicos.barba, 700);
  setSrc("[data-img-servico-sobrancelha]", IMAGENS.servicos.sobrancelha, 700);
  setSrc("[data-img-servico-tratamentos]", IMAGENS.servicos.tratamentos, 700);

  const galeria = document.querySelector("[data-galeria-grid]");
  if (galeria) {
    galeria.innerHTML = IMAGENS.galeria
      .map(
        (foto, indice) => `
          <figure class="galeria__item${foto.grande ? " galeria__item--grande" : ""}" data-reveal style="--i: ${indice % 4}">
            <img
              src="${unsplash(foto.id, foto.grande ? 1200 : 800)}"
              alt="${foto.alt}"
              width="${foto.grande ? 1200 : 800}"
              height="${foto.grande ? 1500 : 800}"
              loading="lazy"
              decoding="async"
            />
          </figure>
        `
      )
      .join("");
  }
}

// --- Header com scroll ---------------------------------------------------
// Transparente sobre o Hero; ganha fundo escuro + blur após rolar.
function configurarHeaderComScroll() {
  const header = document.querySelector("[data-header]");
  if (!header) return;

  const atualizar = () => header.classList.toggle("header--rolado", window.scrollY > 40);
  atualizar();
  window.addEventListener("scroll", atualizar, { passive: true });
}

// --- Menu mobile -----------------------------------------------------------
function configurarMenuMobile() {
  const botao = document.querySelector("[data-menu-btn]");
  const menu = document.querySelector("[data-menu-mobile]");
  if (!botao || !menu) return;

  botao.addEventListener("click", () => {
    const aberto = menu.classList.toggle("is-aberto");
    botao.setAttribute("aria-expanded", String(aberto));
    document.body.classList.toggle("menu-aberto", aberto);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-aberto");
      botao.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-aberto");
    });
  });
}

// --- Facade do Google Maps -------------------------------------------------
// O iframe só é criado no clique — nenhuma requisição ao Google antes disso.
function configurarFacadeMapa() {
  const facade = document.querySelector("[data-mapa-facade]");
  if (!facade) return;

  const botao = facade.querySelector("[data-mapa-btn]");
  botao?.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = GOOGLE_MAPS_EMBED_URL;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.title = `Mapa da localização da ${BARBEARIA.nome}`;
    facade.innerHTML = "";
    facade.appendChild(iframe);
  });
}

// --- WhatsApp flutuante ------------------------------------------------
// Some quando o CTA final (que já tem o mesmo link em destaque) está
// visível, para não duplicar o mesmo convite na tela.
function configurarWhatsappFlutuante() {
  const botao = document.querySelector("[data-whatsapp-flutuante]");
  const ctaFinal = document.querySelector("[data-cta-final]");
  if (!botao) return;

  if (!ctaFinal || !("IntersectionObserver" in window)) {
    botao.classList.add("is-visivel");
    return;
  }

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        botao.classList.toggle("is-visivel", !entrada.isIntersecting);
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(ctaFinal);
  botao.classList.add("is-visivel");
}
