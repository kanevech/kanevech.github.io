let mediaItems = [];
let currentMediaIndex = 0;

const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightbox-content");

function renderCurrentMedia() {
  const selectedMedia = mediaItems[currentMediaIndex];

  if (!selectedMedia) {
    return;
  }

  lightboxContent.innerHTML = "";

  let lightboxMedia;

  if (selectedMedia.tagName === "VIDEO") {
    lightboxMedia = document.createElement("video");

    lightboxMedia.src =
      selectedMedia.currentSrc || selectedMedia.src;

    lightboxMedia.controls = true;
    lightboxMedia.autoplay = true;
    lightboxMedia.loop = true;
    lightboxMedia.muted = true;
    lightboxMedia.playsInline = true;
  } else {
    lightboxMedia = document.createElement("img");

    lightboxMedia.src = selectedMedia.src;
    lightboxMedia.alt = selectedMedia.alt;
  }

  lightboxContent.appendChild(lightboxMedia);
}

function openLightbox(selectedElement) {
  mediaItems = Array.from(
    selectedElement.parentElement.children
  );

  currentMediaIndex = mediaItems.indexOf(selectedElement);

  renderCurrentMedia();

  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightboxContent.innerHTML = "";
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

function showNextMedia() {
  currentMediaIndex =
    (currentMediaIndex + 1) % mediaItems.length;

  renderCurrentMedia();
}

function showPreviousMedia() {
  currentMediaIndex =
    (currentMediaIndex - 1 + mediaItems.length) %
    mediaItems.length;

  renderCurrentMedia();
}

export function initializeLightbox() {
  document
    .querySelectorAll(".media-grid > img, .media-grid > video")
    .forEach((mediaElement) => {
      mediaElement.addEventListener("click", () => {
        openLightbox(mediaElement);
      });
    });

  lightbox
    .querySelector(".lightbox-close")
    .addEventListener("click", closeLightbox);

  lightbox
    .querySelector(".lightbox-previous")
    .addEventListener("click", showPreviousMedia);

  lightbox
    .querySelector(".lightbox-next")
    .addEventListener("click", showNextMedia);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      showPreviousMedia();
    }

    if (event.key === "ArrowRight") {
      showNextMedia();
    }
  });
}
