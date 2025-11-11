const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const goRegister = document.getElementById("goRegister");
const goLogin = document.getElementById("goLogin");

themeToggle.addEventListener("click", () => {
  const current = body.getAttribute("data-theme");
  if (current === "light") {
    body.setAttribute("data-theme", "dark");
    themeToggle.textContent = "🌙";
  } else {
    body.setAttribute("data-theme", "light");
    themeToggle.textContent = "☀️";
  }
});

goRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
});

goLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

// Validação simples
document.getElementById("formLogin").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail");
  const senha = document.getElementById("loginSenha");

  if (!email.value.includes("@")) {
    document.getElementById("errorLoginEmail").textContent = "Email inválido.";
    return;
  } else {
    document.getElementById("errorLoginEmail").textContent = "";
  }

  if (senha.value.length < 6) {
    document.getElementById("errorLoginSenha").textContent =
      "Senha deve ter pelo menos 6 caracteres.";
    return;
  } else {
    document.getElementById("errorLoginSenha").textContent = "";
  }

  alert("Login realizado com sucesso!");
  e.target.reset();
});

document.getElementById("formCadastro").addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("cadastroNome");
  const email = document.getElementById("cadastroEmail");
  const senha = document.getElementById("cadastroSenha");

  if (
    nome.value.trim() === "" ||
    !email.value.includes("@") ||
    senha.value.length < 6
  ) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  alert("Cadastro realizado com sucesso!");
  e.target.reset();
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});
