const form = document.querySelector(".booking-form");
if (form) {
  form.addEventListener("submit", () => {
    // Backend will redirect to /gracies.html
  });
}

const chatbotToggle = document.querySelector(".chatbot-toggle");
const chatbotPanel = document.querySelector(".chatbot-panel");
const chatbotClose = document.querySelector(".chatbot-close");
const chatbotForm = document.getElementById("chatbot-form");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotMessages = document.getElementById("chatbot-messages");

const faqs = [
  {
    keywords: ["que es", "experiencia", "immersiva", "realitat virtual", "vr"],
    a: "És una experiència immersiva de realitat virtual on entres dins d’un relat narrat en primera persona. No és una exposició convencional ni un vídeo: és un recorregut on escoltes, observes i vius una història des de dins."
  },
  {
    keywords: ["qui", "parla", "alia", "veu"],
    a: "Soc l’Alia. Et parlo des d’un temps antic, però no des del passat com un record llunyà. Et parlo perquè escoltis, miris i entenguis des d’un altre lloc."
  },
  {
    keywords: ["durada", "quant dura", "minuts", "temps"],
    a: "La durada és aproximadament de 15 minuts. És un temps pensat perquè la vivència sigui intensa però accessible per a tothom."
  },
  {
    keywords: ["on", "ubicacio", "lloc", "es realitza"],
    a: "L’experiència es fa en un espai físic preparat per a la immersió amb realitat virtual. La ubicació concreta s’indica en el moment de fer la reserva."
  },
  {
    keywords: ["cal portar", "necessito portar", "material", "ulleres"],
    a: "No. Tot el material necessari, incloses les ulleres de realitat virtual, es facilita abans de començar. Només cal venir amb ganes d’escoltar i observar."
  },
  {
    keywords: ["experiencia previa", "cal experiencia", "primer cop"],
    a: "No cal cap experiència prèvia. Abans d’entrar t’expliquen com funciona tot, i durant el recorregut no cal fer cap acció complexa."
  },
  {
    keywords: ["fisica", "tranquil", "moviments", "assegut"],
    a: "És una experiència tranquil·la. Es pot fer assegut i no requereix desplaçar-se ni fer moviments bruscos."
  },
  {
    keywords: ["edat", "anys", "menors"],
    a: "L’experiència està recomanada a partir de 12 anys. Els menors d’edat han d’anar acompanyats d’una persona adulta."
  },
  {
    keywords: ["accessibilitat", "accessible", "necessitat"],
    a: "Sí. L’experiència està pensada perquè sigui accessible. Si tens alguna necessitat específica d’accessibilitat, és recomanable indicar-ho en fer la reserva."
  },
  {
    keywords: ["por", "violent", "ensurts"],
    a: "No és una experiència de por. Hi ha foscor, silenci i una atmosfera intensa, però no hi ha ensurts ni violència explícita."
  },
  {
    keywords: ["idioma", "catala", "llengua"],
    a: "Actualment, l’experiència es fa en català. Altres idiomes poden estar disponibles segons la sessió."
  },
  {
    keywords: ["grup", "en grup", "sessions"],
    a: "Sí. Les sessions es fan en grups reduïts per garantir una experiència íntima i cuidada."
  },
  {
    keywords: ["preu", "cost", "entrada"],
    a: "El preu s’indica a la pàgina de reserva i pot variar segons la sessió o el tipus d’entrada."
  },
  {
    keywords: ["educativa", "escola", "cultural"],
    a: "Sí. Està pensada tant per a públic general com per a contextos educatius i culturals. No dona lliçons, però obre preguntes."
  },
  {
    keywords: ["despres", "que passa", "final"],
    a: "Surts amb temps per assimilar el que has vist i escoltat. El relat no s’acaba quan et treus les ulleres."
  }
];

const fallbackMessage =
  "No tinc aquesta informació. Si vols, pots escriure un missatge a info@audivio.pro i t’ajudarem encantats.";

function addMessage(text, type = "bot") {
  if (!chatbotMessages) return;
  const div = document.createElement("div");
  div.className = `chatbot-message ${type}`;
  div.textContent = text;
  chatbotMessages.appendChild(div);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function findAnswer(input) {
  const normalized = normalize(input);
  if (normalized.includes("gracies") || normalized.includes("gracies!")) {
    return "Gràcies a tu! Si em fas una pregunta sobre l’experiència, t’ajudaré encantada.";
  }
  if (normalized.includes("com estas") || normalized.includes("qui ets") || normalized.includes("personal")) {
    return "Gràcies! Això és molt personal, però puc ajudar-te amb dubtes sobre l’experiència.";
  }
  let best = null;
  let bestScore = 0;
  for (const item of faqs) {
    const score = item.keywords.reduce((acc, kw) => {
      return normalized.includes(kw) ? acc + 1 : acc;
    }, 0);
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }
  return bestScore > 0 ? best.a : null;
}

if (chatbotToggle && chatbotPanel) {
  chatbotToggle.addEventListener("click", () => {
    chatbotPanel.hidden = !chatbotPanel.hidden;
    if (!chatbotPanel.hidden && chatbotMessages.childElementCount === 0) {
      addMessage("Benvinguda. Pots preguntar-me per la durada, el lloc, l’edat recomanada, l’accessibilitat, l’idioma o el funcionament de l’experiència.");
    }
  });
}

if (chatbotClose && chatbotPanel) {
  chatbotClose.addEventListener("click", () => {
    chatbotPanel.hidden = true;
  });
}

if (chatbotForm && chatbotInput) {
  chatbotForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = chatbotInput.value.trim();
    if (!value) return;
    addMessage(value, "user");
    const answer = findAnswer(value);
    addMessage(answer || fallbackMessage);
    chatbotInput.value = "";
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isHidden = mobileNav.hasAttribute("hidden");
    if (isHidden) {
      mobileNav.removeAttribute("hidden");
      requestAnimationFrame(() => {
        mobileNav.classList.add("is-open");
      });
    } else {
      mobileNav.classList.remove("is-open");
      setTimeout(() => {
        mobileNav.setAttribute("hidden", "");
      }, 200);
    }
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      setTimeout(() => {
        mobileNav.setAttribute("hidden", "");
      }, 200);
    });
  });
}
