// Simple tailwind script already loaded
console.log(
  "%c🚀 International Summit on Space Accessibility landing page ready!",
  "color:#a5b4fc; font-family:monospace",
);

// Contact form handling - client-side only
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;
  const statusMessage = document.getElementById("statusMessage");

  // Create mailto link with form data
  const mailtoLink = `mailto:quasarnexus.uc@gmail.com?subject=${encodeURIComponent(`[Contact Form] ${subject}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

  // Open email client
  window.location.href = mailtoLink;

  // Show confirmation message
  statusMessage.textContent =
    "✅ Your email client has opened. Please complete sending the email.";
  statusMessage.classList.remove("hidden", "text-red-400", "text-blue-400");
  statusMessage.classList.add("text-emerald-400");

  // Reset form after a short delay
  setTimeout(() => {
    this.reset();
    statusMessage.classList.add("hidden");
  }, 2000);
});

// Language Translation System
let translations = {};
let currentLang = localStorage.getItem("lang") || "en";

// Load translations from JSON files
async function loadTranslations() {
  try {
    const frResponse = await fetch("./src/fr.json");
    const enResponse = await fetch("./src/eng.json");

    translations.fr = await frResponse.json();
    translations.en = await enResponse.json();

    // Set initial language
    setLanguage(currentLang);
  } catch (error) {
    console.error("Error loading translations:", error);
  }
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.innerHTML = translations[lang][key] || key;
  });

  // Update language buttons
  document
    .querySelectorAll(".lang-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .getElementById("lang" + (lang === "en" ? "En" : "Fr"))
    .classList.add("active");

  // Update HTML lang attribute
  document.documentElement.lang = lang;
}

// Initialize language buttons
document
  .getElementById("langFr")
  .addEventListener("click", () => setLanguage("fr"));
document
  .getElementById("langEn")
  .addEventListener("click", () => setLanguage("en"));

// Load translations and initialize
loadTranslations();
