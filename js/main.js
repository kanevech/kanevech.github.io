import { initializeLanguageSwitcher } from "./language.js";
import { initializeLightbox } from "./lightbox.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeLanguageSwitcher();
  initializeLightbox();
});
