// Pro Tip typing effect
const tipDiv = document.getElementById("tip");
tipDiv.style.transition = "none";
let tip =
  "Pro Tip: you can always turn on dark mode by clicking on the switch above.";
let stopTyping = false;
let typingTimeout;

function typing(e, text, i = 0) {
  if (stopTyping) return;

  e.textContent += text[i];
  if (i < text.length - 1) {
    typingTimeout = setTimeout(() => {
      typing(e, text, i + 1);
    }, 40);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    typing(tipDiv, tip);
  }, 2500);
});

// Fade in effect
const h1 = document.querySelector("h1");
const img = document.querySelectorAll("img");

function fadeIn(e, interval) {
  let opacity = 0;
  e.style.opacity = opacity;

  const fade = setInterval(() => {
    opacity += 0.01;
    if (opacity >= 1) {
      clearInterval(fade);
    }
    e.style.opacity = opacity;
  }, interval);
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    fadeIn(h1, 15);
  }, 500);
  setTimeout(() => {
    fadeIn(img[0], 10);
  }, 1000);
  setTimeout(() => {
    fadeIn(img[1], 10);
  }, 1000);
});

console.log(img);

// Scroll down buttons
const scrollButtons = [];
const projectsButton = document.getElementById("projectsButton");
const contactButton = document.getElementById("contactButton");
scrollButtons.push(projectsButton, contactButton);
scrollButtons[0].addEventListener("click", () => {
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
});
scrollButtons[1].addEventListener("click", () => {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
});

// Language settings
const text = document.querySelectorAll(
  "h1, h2, h3, p, #portfolio, #projectsButton, #contactButton"
);
let skills = document.querySelector(".mobile-langs");

const language = document.querySelector(".language-select");
const switchLang = document.querySelector("#langid");
const translationsENG = [
  "portfolio",
  "Check CV",
  "projects",
  "contact",
  "Check CV",
  "Hi! my name is",
  "David Paz",
  "I'm a Computer Engineering student currently in my last year of college at Universidad Rafael Urdaneta.",
  "I love web and mobile development, hence why i created this little portfolio where i'll be posting some of my favorites projects.",
  "- Skills -",
  "Feel free to scroll down and check some of my work",
  "Skills",
  "Web",
  "Mobile",
  "Framework",
  "Enjoy what you see? let's work together!",
];

const translationsESP = [
  "portfolio",
  "Ver Curriculum",
  "proyectos",
  "contacto",
  "Ver CV",
  "¡Hola! mi nombre es",
  "David Paz",
  "Soy estudiante de último año de Ingeniería en Computación en la Universidad Rafael Urdaneta.",
  "Me gusta el desarrollo web y de móviles, es por eso que hice este pequeño portafolio donde mostraré algunos de mis proyectos favoritos.",
  "- Habilidades -",
  "¡Abajo conocerás un poco sobre mi trabajo!",
  "Habilidades",
  "Web",
  "Mobile",
  "Framework",
  "¿Te gusta lo que ves? ¡Trabajemos Juntos!",
];

language.addEventListener("click", () => {
  stopTyping = true;
  clearTimeout(typingTimeout);
  tipDiv.innerHTML = "";

  if (switchLang.textContent === "ESP") {
    switchLang.textContent = "ENG";
    tip =
      "Pro Tip: you can always turn on dark mode by clicking on the switch above.";

    text.forEach((t, i) => {
      t.textContent = translationsENG[i];
    });
    skills.style.marginTop = "70px";
  } else {
    switchLang.textContent = "ESP";
    tip =
      "Puedes acceder a un tema más oscuro haciendo clic en el botón de arriba.";
    text.forEach((t, i) => {
      t.textContent = translationsESP[i];
    });
    skills.style.marginTop = "100px";
  }

  stopTyping = false;
  setTimeout(() => {
    typing(tipDiv, tip);
  }, 100);
});

// check CV
const CV = document.getElementsByClassName("CV");
Array.from(CV).forEach((e) => {
  e.addEventListener("click", () => {
    console.log("cv");
  });
});

// // mobile view
// const mediaQuery = window.matchMedia("(max-width: 750px)");
// mediaQuery.addEventListener("change", handleMediaQueryChange);

// handleMediaQueryChange(mediaQuery);

// function activateMobileLayout() {
//   document.innerHTML = window.layoutMobile;
//   console.log("Mobile layout activated");
// }

// function deactivateMobileLayout() {
//   document.innerHTML = window.layoutWeb;
//   console.log("Mobile layout deactivated");
// }
