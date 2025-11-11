/* =========================================================
   Script completo - ETE Vagas
   ========================================================= */

/* ========== Inicialização do tema ========== */
(function initTheme() {
  const html = document.documentElement;
  let currentTheme = 'light';
  html.setAttribute("data-theme", currentTheme);
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";
  window.currentTheme = currentTheme;
})();

/* ========== Menu mobile ========== */
const navLinks = document.getElementById("navLinks");
function toggleMenu() { if(navLinks) navLinks.classList.toggle("active"); }
document.addEventListener("click", e => {
  const nav = document.querySelector("nav");
  if(nav && navLinks && !nav.contains(e.target) && navLinks.classList.contains("active")) navLinks.classList.remove("active");
});
document.addEventListener("keydown", e => { if(e.key === "Escape" && navLinks) navLinks.classList.remove("active"); });

/* ========== Toggle de tema ========== */
function toggleTheme() {
  const html = document.documentElement;
  const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  window.currentTheme = next;
  const themeToggle = document.getElementById("themeToggle");
  if(themeToggle) themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
}

/* ========== Dados simulados (vagas) ========== */
const jobs = [
  { id:1,title:"Líder de Produção",company:"Capricche S.A.",location:"Escada - PE",contract:"CLT",modality:"Presencial",area:"Produção",experience:"Sênior",salary_min:3000,salary_max:4500,description:"Liderar equipe, acompanhar indicadores e melhoria contínua." },
  { id:2,title:"Analista de Dados Júnior",company:"OneData",location:"Recife - PE",contract:"CLT",modality:"Híbrido",area:"Dados",experience:"Júnior",salary_min:2000,salary_max:3200,description:"Análise e tratamento de dados, produção de relatórios." },
  { id:3,title:"Desenvolvedor Front-end",company:"Agência Web",location:"Remoto",contract:"PJ",modality:"Remoto",area:"TI",experience:"Pleno",salary_min:3500,salary_max:6000,description:"React/Vue, HTML/CSS, integrações com APIs." },
  { id:4,title:"Estagiário de Logística",company:"Logística Alfa",location:"Vitória de Santo Antão - PE",contract:"Estágio",modality:"Presencial",area:"Logística",experience:"Júnior",salary_min:900,salary_max:1200,description:"Apoio operacional e controle de estoque." },
  { id:5,title:"Coordenador de Qualidade",company:"DTel Telecom",location:"Recife - PE",contract:"CLT",modality:"Presencial",area:"Qualidade",experience:"Sênior",salary_min:4000,salary_max:6500,description:"Garantir SLAs, KPIs e processos de qualidade." },
  { id:6,title:"Assistente Administrativo",company:"Grupo Norte",location:"Jaboatão - PE",contract:"CLT",modality:"Presencial",area:"Administração",experience:"Júnior",salary_min:1800,salary_max:2500,description:"Controle de planilhas e suporte a relatórios." },
  { id:7,title:"Designer Gráfico",company:"Estúdio Criar",location:"Remoto",contract:"PJ",modality:"Remoto",area:"Design",experience:"Pleno",salary_min:2500,salary_max:4000,description:"Criação de layouts e artes digitais." },
  { id:8,title:"Engenheiro de Software Back-end",company:"TechCorp",location:"Recife - PE",contract:"CLT",modality:"Remoto",area:"TI",experience:"Pleno",salary_min:5000,salary_max:8000,description:"Desenvolvimento de APIs e banco de dados." },
  { id:9,title:"Vendedor Interno",company:"Comercial Alfa",location:"Cabo de Santo Agostinho - PE",contract:"CLT",modality:"Presencial",area:"Vendas",experience:"Júnior",salary_min:1500,salary_max:2800,description:"Atendimento e prospecção de clientes." },
  { id:10,title:"Supervisor de Manutenção",company:"Mecânica Beta",location:"Recife - PE",contract:"CLT",modality:"Presencial",area:"Manutenção",experience:"Sênior",salary_min:4200,salary_max:6000,description:"Gerenciar equipe técnica e manutenção preventiva." }
];

/* ========== Utilitários ========== */
function formatCurrency(n){return Number(n).toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0});}
function escapeHtml(str){return String(str||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");}

/* ========== Criar card de vaga ========== */
function createJobCard(job){
  const card = document.createElement("article");
  card.className = "job-card";
  card.innerHTML = `
    <div class="job-top">
      <div style="flex:1;">
        <div class="job-company">${escapeHtml(job.company)}</div>
        <div class="job-title">${escapeHtml(job.title)}</div>
      </div>
      <div class="job-salary">R$ ${formatCurrency(job.salary_min)} - ${formatCurrency(job.salary_max)}</div>
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
    <p style="color:var(--text-secondary); margin-top:.6rem; font-size:.95rem; line-height:1.5;">${escapeHtml(job.description)}</p>
    <div class="job-actions"><button class="btn-apply" data-id="${job.id}">Mais detalhes</button></div>
  `;
  return card;
}

/* ========== Renderizar vagas ========== */
const jobsList = document.getElementById("jobsList");
const foundCount = document.getElementById("foundCount");
const showMoreBtn = document.createElement("button");
showMoreBtn.className = "show-more-btn btn-primary";
showMoreBtn.textContent = "Ver mais vagas";
showMoreBtn.style= " text-align: center; margin-top: 6rem; margin-left: 30rem; padding: 20px; font-size: 18px; border: none;";



let showingAll = false;

function renderJobs(list){
  if(!jobsList) return;
  jobsList.innerHTML="";
  const visibleJobs = showingAll?list:list.slice(0,6);
  if(!visibleJobs.length){if(foundCount) foundCount.textContent="Nenhuma vaga encontrada.";return;}
  const frag=document.createDocumentFragment();
  visibleJobs.forEach(j=>frag.appendChild(createJobCard(j)));
  jobsList.appendChild(frag);
  if(foundCount) foundCount.textContent=`${list.length} vaga${list.length!==1?'s':''} disponível${list.length!==1?'s':''}`;
  if(list.length>6){showMoreBtn.style.display="block";if(!jobsList.nextElementSibling||!jobsList.nextElementSibling.classList.contains("show-more-btn"))jobsList.parentNode.appendChild(showMoreBtn);}
  else showMoreBtn.style.display="none";
}
showMoreBtn.addEventListener("click",()=>{showingAll=!showingAll;renderJobs(jobs);showMoreBtn.textContent=showingAll?"Ver menos vagas":"Ver mais vagas";jobsList.scrollIntoView({behavior:"smooth",block:"nearest"});});
renderJobs(jobs);

/* ========== Filtro de busca ========== */
const searchForm = document.getElementById("searchForm");
if(searchForm){
  searchForm.addEventListener("submit",e=>{
    e.preventDefault();
    const qVaga=document.getElementById("qVaga")?.value.trim().toLowerCase()||'';
    const qLocal=document.getElementById("qLocal")?.value.trim().toLowerCase()||'';
    const qContrato=document.getElementById("qContrato")?.value||'';
    const qModalidade=document.getElementById("qModalidade")?.value||'';
    const qArea=document.getElementById("qArea")?.value.trim().toLowerCase()||'';
    const qExp=document.getElementById("qExp")?.value||'';
    const qSalMin=parseFloat(document.getElementById("qSalMin")?.value||0);
    const qSalMax=parseFloat(document.getElementById("qSalMax")?.value||Infinity);
    const results=jobs.filter(job=>{
      if(qVaga&&!`${job.title} ${job.description}`.toLowerCase().includes(qVaga)) return false;
      if(qLocal&&!job.location.toLowerCase().includes(qLocal)) return false;
      if(qContrato&&job.contract!==qContrato) return false;
      if(qModalidade&&job.modality!==qModalidade) return false;
      if(qArea&&!job.area.toLowerCase().includes(qArea)) return false;
      if(qExp&&job.experience!==qExp) return false;
      if(job.salary_max<qSalMin||job.salary_min>qSalMax) return false;
      return true;
    });
    renderJobs(results);
    if(jobsList) jobsList.scrollIntoView({behavior:"smooth",block:"nearest"});
  });
}

/* ========== Resetar filtros ========== */
const resetFiltersBtn=document.getElementById("resetFilters");
if(resetFiltersBtn&&searchForm) resetFiltersBtn.addEventListener("click",()=>{searchForm.reset();renderJobs(jobs);});

/* ========== Detalhes de vagas ========== */
if(jobsList){
  jobsList.addEventListener("click",e=>{
    const btn=e.target.closest(".btn-apply");
    const closeBtn=e.target.closest(".close-details");
    if(btn){
      const jobCard=btn.closest(".job-card");
      const job=jobs.find(j=>String(j.id)===String(btn.dataset.id));
      if(jobCard.querySelector(".job-details"))return;
      const details=document.createElement("div");
      details.className="job-details";
      details.innerHTML=`
        <h3>${escapeHtml(job.title)}</h3>
        <p><strong>Empresa:</strong> ${escapeHtml(job.company)}</p>
        <p><strong>Descrição completa:</strong> ${escapeHtml(job.description||"Descrição não informada.")}</p>
        <p><strong>Área:</strong> ${escapeHtml(job.area||"Não especificada")}</p>
        <p><strong>Tipo de contrato:</strong> ${escapeHtml(job.contract||"Não informado")}</p>
        <p><strong>Modalidade:</strong> ${escapeHtml(job.modality||"Não informada")}</p>
        <p><strong>Experiência:</strong> ${escapeHtml(job.experience||"Qualquer nível")}</p>
        <p><strong>Faixa salarial:</strong> R$ ${formatCurrency(job.salary_min||0)} – R$ ${formatCurrency(job.salary_max||0)}</p>
        <p><strong>Local:</strong> ${escapeHtml(job.location||"Não informado")}</p>
        <button class="close-details">Fechar detalhes</button>
      `;
      jobCard.appendChild(details);
      jobCard.classList.add("expanded");
      btn.style.display="none";
      setTimeout(()=>details.classList.add("show"),10);
    }
    if(closeBtn){
      const jobCard=closeBtn.closest(".job-card");
      const details=jobCard.querySelector(".job-details");
      const applyBtn=jobCard.querySelector(".btn-apply");
      details.remove();
      jobCard.classList.remove("expanded");
      if(applyBtn) applyBtn.style.display="inline-block";
    }
  });
}

/* ========== Intersection Observer - animações de entrada ========== */
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.style.opacity="1";entry.target.style.transform="translateY(0)";}})}, {threshold:0.1, rootMargin:"0px 0px -50px 0px"});
document.querySelectorAll(".feature-card, .team-member, .stat-card, .job-card").forEach(card=>{card.style.opacity="0";card.style.transform="translateY(20px)";card.style.transition="opacity 0.6s ease, transform 0.6s ease";observer.observe(card);});

/* ========== Contadores animados ========== */
function animateCounter(el,target,duration=2000){if(!el)return;let start=0;const increment=target/(duration/16);function step(){start+=increment;if(start>=target){el.textContent=target;}else{el.textContent=Math.floor(start);requestAnimationFrame(step);}}requestAnimationFrame(step);}
const statObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting&&!entry.target.dataset.animated){const target=parseInt(entry.target.textContent.replace(/\D/g,''));animateCounter(entry.target,target);entry.target.dataset.animated='true';}})},{threshold:0.5});
document.querySelectorAll('.stat-number').forEach(stat=>statObserver.observe(stat));

/* ========== Console log final ========== */
console.log('✅ Vagas ETE carregado com sucesso!');
console.log(`📊 ${jobs.length} vagas disponíveis`);
console.log('🎨 Tema atual:', window.currentTheme||'light');
