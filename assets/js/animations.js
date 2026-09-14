// Preloader, scroll reveal (com stagger), parallax do Hero e faixa marquee.
// Regra do projeto: o movimento deve transmitir qualidade, não chamar
// atenção para si mesmo — por isso tudo aqui respeita prefers-reduced-motion.

const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
  configurarPreloader();
  configurarScrollReveal();
  configurarMarquee();
  configurarParallaxHero();
});

// --- Preloader ---------------------------------------------------------
// Exibido só na primeira visita da sessão (sessionStorage) e nunca com
// movimento reduzido. Timeout de segurança garante que uma conexão lenta
// (imagens do Unsplash) nunca prenda o visitante na tela de carregamento.
function configurarPreloader() {
  const preloader = document.querySelector("[data-preloader]");
  if (!preloader) return;

  const jaVisitou = sessionStorage.getItem("bsr_visitou");

  if (jaVisitou || reduzMovimento) {
    preloader.remove();
    document.body.classList.add("is-carregado");
    return;
  }

  sessionStorage.setItem("bsr_visitou", "1");

  const remover = () => {
    if (!document.body.contains(preloader)) return;
    preloader.classList.add("preloader--sair");
    document.body.classList.add("is-carregado");
    setTimeout(() => preloader.remove(), 700);
  };

  const tempoMinimo = new Promise((resolve) => setTimeout(resolve, 1000));
  const carregou = new Promise((resolve) => {
    if (document.readyState === "complete") {
      resolve();
    } else {
      window.addEventListener("load", resolve, { once: true });
    }
  });
  const timeoutSeguranca = new Promise((resolve) => setTimeout(resolve, 2500));

  Promise.race([Promise.all([tempoMinimo, carregou]), timeoutSeguranca]).then(remover);
}

// --- Scroll reveal + stagger --------------------------------------------
// Um único observer cuida de todo [data-reveal]. Itens dentro de um mesmo
// [data-stagger] recebem --i automaticamente (0, 1, 2...) e o atraso de
// cada um é feito em CSS puro via transition-delay: calc(var(--i) * 90ms).
function configurarScrollReveal() {
  document.querySelectorAll("[data-stagger]").forEach((grupo) => {
    Array.from(grupo.children).forEach((filho, indice) => {
      filho.style.setProperty("--i", indice);
      filho.setAttribute("data-reveal", "");
    });
  });

  const alvos = document.querySelectorAll("[data-reveal]");
  if (!alvos.length) return;

  if (!("IntersectionObserver" in window)) {
    alvos.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("is-visible");
          observer.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  alvos.forEach((el) => observer.observe(el));
}

// --- Marquee -------------------------------------------------------------
// O conteúdo é duplicado uma vez para o loop ficar contínuo; a animação em
// si é só CSS (translateX(-50%) sobre os dois blocos concatenados).
function configurarMarquee() {
  document.querySelectorAll("[data-marquee]").forEach((faixa) => {
    const conteudo = faixa.innerHTML;
    faixa.innerHTML = conteudo + conteudo;
  });
}

// --- Parallax do Hero ------------------------------------------------------
// Aplicado no container [data-parallax] (não na imagem em si, que já tem
// sua própria transição de entrada em CSS puro — scale 1.08 → 1 disparada
// por .is-carregado). Só translada, só em desktop, nunca com movimento
// reduzido.
function configurarParallaxHero() {
  const camada = document.querySelector("[data-parallax]");
  if (!camada || reduzMovimento) return;

  let ticking = false;

  const atualizar = () => {
    ticking = false;
    if (window.innerWidth < 1024) {
      camada.style.transform = "";
      return;
    }
    const deslocamento = window.scrollY * 0.15;
    camada.style.transform = `translate3d(0, ${deslocamento}px, 0)`;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(atualizar);
        ticking = true;
      }
    },
    { passive: true }
  );

  atualizar();
}
