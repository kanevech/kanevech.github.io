import { translations } from "./translations.js";

const LANGUAGE_STORAGE_KEY = "site-language";
const DEFAULT_LANGUAGE = "en";

export function setLanguage(language) {
  const selectedTranslations =
    translations[language] || translations[DEFAULT_LANGUAGE];

  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const translationKey = element.dataset.i18n;
    const translatedText = selectedTranslations[translationKey];

    if (translatedText) {
      element.textContent = translatedText;
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    const attributeRules = element.dataset.i18nAttr.split(",");

    attributeRules.forEach((rule) => {
      const [attributeName, translationKey] = rule.split(":");

      if (!attributeName || !translationKey) {
        return;
      }

      const translatedText = selectedTranslations[translationKey.trim()];

      if (translatedText) {
        element.setAttribute(attributeName.trim(), translatedText);
      }
    });
  });

  document.querySelectorAll(".language-button").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.language === language
    );
  });

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // localStorage may be unavailable in some browser contexts.
  }
}

export function initializeLanguageSwitcher() {
  document.querySelectorAll(".language-button").forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.language);
    });
  });

  let savedLanguage = DEFAULT_LANGUAGE;

  try {
    savedLanguage =
      localStorage.getItem(LANGUAGE_STORAGE_KEY) || DEFAULT_LANGUAGE;
  } catch {
    // Use English if localStorage is unavailable.
  }

  setLanguage(savedLanguage);
}
