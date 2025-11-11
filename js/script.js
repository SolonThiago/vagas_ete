/* ========== Inicialização do tema (sem localStorage) ========== */
(function initTheme() {
  const html = document.documentElement;
  // Tema padrão: light
  let currentTheme = "light";

  html.setAttribute("data-theme", currentTheme);
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle)
    themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";

  // Armazena tema em variável global para acesso
  window.currentTheme = currentTheme;
})();

/* ========== Menu mobile ========== */
const navLinks = document.getElementById("navLinks");

function toggleMenu() {
  if (navLinks) {
    navLinks.classList.toggle("active");
  }
}

/* ========== Toggle de tema ========== */
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme") || "light";
  const next = current === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", next);
  window.currentTheme = next;

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
  }
}

/* ========== Navegação com hash e controle de seções ========== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);

    // Fechar menu mobile
    if (navLinks) {
      navLinks.classList.remove("active");
    }

    // Controle de seções de autenticação
    if (["entrar", "cadastrar"].includes(targetId)) {
      document.querySelectorAll("main > section").forEach((section) => {
        if (section.id === targetId) {
          section.classList.remove("hidden");
          section.setAttribute("aria-hidden", "false");
        } else if (section.id === "entrar" || section.id === "cadastrar") {
          section.classList.add("hidden");
          section.setAttribute("aria-hidden", "true");
        }
      });
    } else {
      // Esconder seções de autenticação ao navegar para outras páginas
      const enterSection = document.getElementById("entrar");
      const registerSection = document.getElementById("cadastrar");
      if (enterSection) {
        enterSection.classList.add("hidden");
        enterSection.setAttribute("aria-hidden", "true");
      }
      if (registerSection) {
        registerSection.classList.add("hidden");
        registerSection.setAttribute("aria-hidden", "true");
      }
    }

    // Scroll suave
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ========== Fechar menu ao clicar fora ========== */
document.addEventListener("click", function (e) {
  const nav = document.querySelector("nav");
  if (
    nav &&
    navLinks &&
    !nav.contains(e.target) &&
    navLinks.classList.contains("active")
  ) {
    navLinks.classList.remove("active");
  }
});

/* ========== Fechar menu com ESC ========== */
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && navLinks) {
    navLinks.classList.remove("active");
  }
});

/* ========== Dados simulados (vagas) ========== */
const jobs = [
  {
    id: 1,
    title: "Líder de Produção",
    company: "Capricche S.A.",
    location: "Escada - PE",
    contract: "CLT",
    modality: "Presencial",
    area: "Produção",
    experience: "Sênior",
    salary_min: 3000,
    salary_max: 4500,
    description: "Liderar equipe, acompanhar indicadores e melhoria contínua.",
  },
  {
    id: 2,
    title: "Analista de Dados Júnior",
    company: "OneData",
    location: "Recife - PE",
    contract: "CLT",
    modality: "Híbrido",
    area: "Dados",
    experience: "Júnior",
    salary_min: 2000,
    salary_max: 3200,
    description: "Análise e tratamento de dados, produção de relatórios.",
  },
  {
    id: 3,
    title: "Desenvolvedor Front-end",
    company: "Agência Web",
    location: "Remoto",
    contract: "PJ",
    modality: "Remoto",
    area: "TI",
    experience: "Pleno",
    salary_min: 3500,
    salary_max: 6000,
    description: "React/Vue, HTML/CSS, integrações com APIs.",
  },
  {
    id: 4,
    title: "Estagiário de Logística",
    company: "Logística Alfa",
    location: "Vitória de Santo Antão - PE",
    contract: "Estágio",
    modality: "Presencial",
    area: "Logística",
    experience: "Júnior",
    salary_min: 900,
    salary_max: 1200,
    description: "Apoio operacional e controle de estoque.",
  },
  {
    id: 5,
    title: "Coordenador de Qualidade",
    company: "DTel Telecom",
    location: "Recife - PE",
    contract: "CLT",
    modality: "Presencial",
    area: "Qualidade",
    experience: "Sênior",
    salary_min: 4000,
    salary_max: 6500,
    description: "Garantir SLAs, KPIs e processos de qualidade.",
  },
];

/* ========== Elementos do DOM ========== */
const jobsList = document.getElementById("jobsList");
const foundCount = document.getElementById("foundCount");
const searchForm = document.getElementById("searchForm");

/* ========== Funções utilitárias ========== */
function formatCurrency(n) {
  try {
    return Number(n).toLocaleString("pt-BR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  } catch {
    return n;
  }
}

function escapeHtml(str) {
  if (!str && str !== 0) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ========== Criar card de vaga ========== */
function createJobCard(job) {
  const card = document.createElement("article");
  card.className = "job-card";
  card.setAttribute("role", "article");
  card.innerHTML = `
    <div class="job-top">
      <div style="flex: 1;">
        <div class="job-company">${escapeHtml(job.company)}</div>
        <div class="job-title">${escapeHtml(job.title)}</div>
      </div>
      <div class="job-salary">R$ ${formatCurrency(
        job.salary_min
      )} - ${formatCurrency(job.salary_max)}</div>
    </div>
    <div class="job-meta">
      <span>📍 ${escapeHtml(job.location)}</span>
      <span>•</span>
      <span>📝 ${escapeHtml(job.contract)}</span>
      <span>•</span>
      <span>💼 ${escapeHtml(job.modality)}</span>
      <span>•</span>
      <span>⭐ ${escapeHtml(job.experience)}</span>
    </div>
    <p style="color:var(--text-secondary); margin-top:.6rem; font-size:.95rem; line-height: 1.5;">${escapeHtml(
      job.description
    )}</p>
    <div class="job-actions">
      <button class="btn-apply" data-id="${job.id}">Candidatar-se</button>
    </div>
  `;
  return card;
}

/* ========== Renderizar vagas ========== */
function renderJobs(list) {
  if (!jobsList) return;

  jobsList.innerHTML = "";

  if (!list || list.length === 0) {
    if (foundCount) foundCount.textContent = "Nenhuma vaga encontrada.";
    return;
  }

  const fragment = document.createDocumentFragment();
  list.forEach((j) => fragment.appendChild(createJobCard(j)));
  jobsList.appendChild(fragment);

  if (foundCount) {
    foundCount.textContent = `${list.length} vaga${
      list.length !== 1 ? "s" : ""
    } encontrada${list.length !== 1 ? "s" : ""}`;
  }
}

/* ========== Filtro de busca ========== */
if (searchForm) {
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const qVaga =
      document.getElementById("qVaga")?.value.trim().toLowerCase() || "";
    const qLocal =
      document.getElementById("qLocal")?.value.trim().toLowerCase() || "";
    const qContrato = document.getElementById("qContrato")?.value || "";
    const qModalidade = document.getElementById("qModalidade")?.value || "";
    const qArea =
      document.getElementById("qArea")?.value.trim().toLowerCase() || "";
    const qExp = document.getElementById("qExp")?.value || "";
    const qSalMin = parseFloat(document.getElementById("qSalMin")?.value || 0);
    const qSalMax = parseFloat(
      document.getElementById("qSalMax")?.value || Infinity
    );

    const results = jobs.filter((job) => {
      // Filtro de vaga (título ou descrição)
      if (
        qVaga &&
        !`${job.title} ${job.description}`.toLowerCase().includes(qVaga)
      ) {
        return false;
      }

      // Filtro de localização
      if (qLocal && !job.location.toLowerCase().includes(qLocal)) {
        return false;
      }

      // Filtro de contrato
      if (qContrato && job.contract !== qContrato) {
        return false;
      }

      // Filtro de modalidade
      if (qModalidade && job.modality !== qModalidade) {
        return false;
      }

      // Filtro de área
      if (qArea && !job.area.toLowerCase().includes(qArea)) {
        return false;
      }

      // Filtro de experiência
      if (qExp && job.experience !== qExp) {
        return false;
      }

      // Filtro de salário
      if (job.salary_max < qSalMin || job.salary_min > qSalMax) {
        return false;
      }

      return true;
    });

    renderJobs(results);

    // Scroll suave para os resultados
    if (jobsList) {
      jobsList.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
}

/* ========== Resetar filtros ========== */
const resetFiltersBtn = document.getElementById("resetFilters");
if (resetFiltersBtn && searchForm) {
  resetFiltersBtn.addEventListener("click", function () {
    searchForm.reset();
    renderJobs(jobs);
  });
}

/* ========== Evento de candidatura ========== */
if (jobsList) {
  jobsList.addEventListener("click", function (e) {
    const btn = e.target.closest(".btn-apply");
    if (!btn) return;

    const id = btn.getAttribute("data-id");
    const job = jobs.find((j) => String(j.id) === String(id));

    if (job) {
      // Adicionar animação ao botão
      btn.style.transform = "scale(0.95)";
      setTimeout(() => {
        btn.style.transform = "";
      }, 150);

      alert(
        `✅ Sua candidatura para "${job.title}" na ${job.company} foi registrada com sucesso!\n\nBoa sorte! Em breve a empresa entrará em contato.`
      );
    }
  });
}

/* ========== Renderização inicial ========== */
renderJobs(jobs);

/* ========== Atualizar estatística de vagas ========== */
(function updateStats() {
  const statVagas = document.getElementById("stat-vagas");
  if (statVagas) {
    statVagas.textContent = String(jobs.length);
  }
})();

/* ========== Intersection Observer - animações de entrada ========== */
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observar elementos para animação
document
  .querySelectorAll(".feature-card, .team-member, .stat-card, .job-card")
  .forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });

/* ========== Carrossel da equipe ========== */
(function teamCarousel() {
  const teamTrack = document.getElementById("teamTrack");
  const teamPrev = document.getElementById("teamPrev");
  const teamNext = document.getElementById("teamNext");

  if (!teamTrack) return;

  // Duplicar conteúdo para loop infinito
  const originalHTML = teamTrack.innerHTML;
  teamTrack.innerHTML += originalHTML;

  // Parâmetros de scroll automático
  let speed = 0.5;
  let autoScroll = true;
  let rafId = null;

  function step() {
    if (autoScroll && teamTrack.scrollLeft !== undefined) {
      teamTrack.scrollLeft += speed;

      // Loop infinito: quando chegar na metade, volta ao início
      if (teamTrack.scrollLeft >= teamTrack.scrollWidth / 2) {
        teamTrack.scrollLeft = 0;
      }
    }
    rafId = requestAnimationFrame(step);
  }

  // Iniciar animação
  rafId = requestAnimationFrame(step);

  // Pausar ao passar o mouse
  teamTrack.addEventListener("mouseenter", () => (autoScroll = false));
  teamTrack.addEventListener("mouseleave", () => (autoScroll = true));
  teamTrack.addEventListener("focus", () => (autoScroll = false), true);
  teamTrack.addEventListener("blur", () => (autoScroll = true), true);

  // Botões de navegação
  const scrollAmount = 280;

  if (teamPrev) {
    teamPrev.addEventListener("click", () => {
      autoScroll = false;
      smoothScrollBy(teamTrack, -scrollAmount, 300);
      setTimeout(() => (autoScroll = true), 1000);
    });
  }

  if (teamNext) {
    teamNext.addEventListener("click", () => {
      autoScroll = false;
      smoothScrollBy(teamTrack, scrollAmount, 300);
      setTimeout(() => (autoScroll = true), 1000);
    });
  }

  // Função de scroll suave
  function smoothScrollBy(elem, distance, duration) {
    const start = elem.scrollLeft;
    const end = start + distance;
    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (easeInOutQuad)
      const easing =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      elem.scrollLeft = start + (end - start) * easing;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }
})();

/* ========== Validação de formulários ========== */

// Funções auxiliares de validação
function showError(input, message) {
  if (!input) return;

  const small = document.querySelector(
    `.error-message[data-for="${input.id}"]`
  );
  if (small) small.textContent = message;
  input.classList.add("invalid");
}

function clearError(input) {
  if (!input) return;

  const small = document.querySelector(
    `.error-message[data-for="${input.id}"]`
  );
  if (small) small.textContent = "";
  input.classList.remove("invalid");
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  // Aceita formatos: (00) 00000-0000 ou 00000000000
  const re = /^[\d\s().-]{8,}$/;
  return re.test(phone);
}

/* ========== Formulário de Contato ========== */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const subject = document.getElementById("contactSubject");
    const message = document.getElementById("contactMessage");

    let valid = true;

    // Limpar erros anteriores
    [name, email, subject, message].forEach(clearError);

    // Validar nome
    if (!name.value.trim()) {
      showError(name, "Por favor, informe seu nome.");
      valid = false;
    } else if (name.value.trim().length < 3) {
      showError(name, "Nome deve ter ao menos 3 caracteres.");
      valid = false;
    }

    // Validar email
    if (!email.value.trim()) {
      showError(email, "Por favor, informe seu email.");
      valid = false;
    } else if (!validateEmail(email.value)) {
      showError(email, "Email inválido. Use o formato: exemplo@email.com");
      valid = false;
    }

    // Validar assunto
    if (!subject.value.trim()) {
      showError(subject, "Por favor, informe o assunto.");
      valid = false;
    }

    // Validar mensagem
    if (!message.value.trim()) {
      showError(message, "Por favor, escreva sua mensagem.");
      valid = false;
    } else if (message.value.trim().length < 10) {
      showError(message, "Mensagem deve ter ao menos 10 caracteres.");
      valid = false;
    }

    if (!valid) return;

    // Simular envio com feedback visual
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert("Mensagem enviada com sucesso! Em breve responderemos por e-mail.");
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 800);
  });
}

/* ========== Formulário de Login ========== */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");

    let valid = true;

    // Limpar erros anteriores
    [email, password].forEach(clearError);

    // Validar email
    if (!email.value.trim()) {
      showError(email, "Por favor, informe seu email.");
      valid = false;
    } else if (!validateEmail(email.value)) {
      showError(email, "Email inválido.");
      valid = false;
    }

    // Validar senha
    if (!password.value) {
      showError(password, "Por favor, informe sua senha.");
      valid = false;
    } else if (password.value.length < 6) {
      showError(password, "Senha deve ter ao menos 6 caracteres.");
      valid = false;
    }

    if (!valid) return;

    // Simular login
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Entrando...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert("Login realizado com sucesso! (simulação)");
      loginForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 800);
  });
}

/* ========== Formulário de Cadastro ========== */
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("fullName");
    const email = document.getElementById("regEmail");
    const phone = document.getElementById("regPhone");
    const password = document.getElementById("regPassword");

    let valid = true;

    // Limpar erros anteriores
    [name, email, phone, password].forEach(clearError);

    // Validar nome
    if (!name.value.trim()) {
      showError(name, "Por favor, informe seu nome completo.");
      valid = false;
    } else if (name.value.trim().length < 3) {
      showError(name, "Nome deve ter ao menos 3 caracteres.");
      valid = false;
    }

    // Validar email
    if (!email.value.trim()) {
      showError(email, "Por favor, informe seu email.");
      valid = false;
    } else if (!validateEmail(email.value)) {
      showError(email, "Email inválido.");
      valid = false;
    }

    // Validar telefone
    if (!phone.value.trim()) {
      showError(phone, "Por favor, informe seu telefone.");
      valid = false;
    } else if (!validatePhone(phone.value)) {
      showError(phone, "Telefone inválido.");
      valid = false;
    }

    // Validar senha
    if (!password.value) {
      showError(password, "Por favor, crie uma senha.");
      valid = false;
    } else if (password.value.length < 6) {
      showError(password, "Senha deve ter ao menos 6 caracteres.");
      valid = false;
    }

    if (!valid) return;

    // Simular cadastro
    const submitBtn = registerForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Cadastrando...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert(
        "Cadastro realizado com sucesso! Verifique seu e-mail (simulação)."
      );
      registerForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 800);
  });
}

/* ========== Limpar mensagens de erro ao digitar ========== */
document.querySelectorAll("input, textarea, select").forEach((el) => {
  el.addEventListener("input", () => clearError(el));
  el.addEventListener("focus", () => clearError(el));
});

/* ========== Scroll reveal para seções ========== */
const sections = document.querySelectorAll("section");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.05 }
);

sections.forEach((section) => {
  if (!section.classList.contains("hero")) {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    sectionObserver.observe(section);
  }
});

/* ========== Smooth scroll para todos os links internos ========== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const target = document.querySelector(targetId);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

/* ========== Adicionar classe active ao menu atual ========== */
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink);
window.addEventListener("load", updateActiveNavLink);

/* ========== Animação de números (contador) ========== */
function animateCounter(element, target, duration = 2000) {
  if (!element) return;

  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Animar contador quando visível
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const target = parseInt(entry.target.textContent.replace(/\D/g, ""));
        animateCounter(entry.target, target);
        entry.target.dataset.animated = "true";
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-number").forEach((stat) => {
  statObserver.observe(stat);
});

console.log("✅ Vagas ETE carregado com sucesso!");
console.log(`📊 ${jobs.length} vagas disponíveis`);
console.log("🎨 Tema atual:", window.currentTheme || "light");

// Script para carrossel infinito automático
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("teamTrack");
  const prevBtn = document.getElementById("teamPrev");
  const nextBtn = document.getElementById("teamNext");
  const items = Array.from(track.children);
  const itemCount = items.length;
  const itemWidth = items[0].offsetWidth + 32; // Incluindo margens
  let currentIndex = 0;
  let intervalId;

  // Clonar itens para efeito infinito
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    track.prepend(clone);
  });

  // Ajustar posição inicial
  track.style.transform = `translateX(${-itemWidth * itemCount}px)`;

  function moveCarousel(direction) {
    currentIndex += direction;
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(${
      -itemWidth * (currentIndex + itemCount)
    }px)`;

    setTimeout(() => {
      if (currentIndex >= itemCount) {
        track.style.transition = "none";
        currentIndex = 0;
        track.style.transform = `translateX(${-itemWidth * itemCount}px)`;
      } else if (currentIndex < 0) {
        track.style.transition = "none";
        currentIndex = itemCount - 1;
        track.style.transform = `translateX(${
          -itemWidth * (itemCount * 2 - 1)
        }px)`;
      }
    }, 500);
  }

  // Auto-scroll a cada 3 segundos
  function autoScroll() {
    moveCarousel(1);
  }

  intervalId = setInterval(autoScroll, 3000);

  // Botões manuais
  nextBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    moveCarousel(1);
    intervalId = setInterval(autoScroll, 3000);
  });

  prevBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    moveCarousel(-1);
    intervalId = setInterval(autoScroll, 3000);
  });

  // Pausar no hover
  track.addEventListener("mouseenter", () => clearInterval(intervalId));
  track.addEventListener(
    "mouseleave",
    () => (intervalId = setInterval(autoScroll, 3000))
  );
});
