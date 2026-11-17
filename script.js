const media = [
  {
    type: "photo",
    src: "media/photo_4_2026-10-31_19-54-22.jpg",
    alt: "Serwaa smiling with a butterfly filter",
    caption: "She's okay, apparently"
  },
  {
    type: "photo",
    src: "media/photo_3_2026-10-31_19-54-14.jpg",
    alt: "Serwaa in a playful, retro-style video frame",
    caption: "Is that a toothbrush?"
  },
  {
    type: "photo",
    src: "media/photo_2_2026-10-31_19-54-14.jpg",
    alt: "Serwaa wearing glasses and smiling at the camera",
    caption: "Not a single active brain cell"
  },
  {
    type: "photo",
    src: "media/photo_1_2026-10-31_19-54-14.jpg",
    alt: "A very close-up selfie of Serwaa",
    caption: "I've got nothing"
  },
  {
    type: "photo",
    src: "media/Snapchat-640100742.jpg",
    alt: "Serwaa smiling in glasses in a selfie",
    caption: "You look high"
  },
  {
    type: "photo",
    src: "media/Snapchat-1363668885.jpg",
    alt: "Serwaa in a Snapchat photo",
    caption: "Oeuf"
  },
  {
    type: "photo",
    src: "media/Snapchat-141287405.jpg",
    alt: "Serwaa in a Snapchat photo",
    caption: "Contortionist"
  },
  {
    type: "photo",
    src: "media/Snapchat-1705964471.jpg",
    alt: "Serwaa in a Snapchat photo",
    caption: "Nice projector screen"
  },
  {
    type: "photo",
    src: "media/Snapchat-347240921.jpg",
    alt: "Serwaa in a Snapchat photo",
    caption: "What's even happening here?"
  },
  {
    type: "video",
    src: "media/video_2026-10-31_19-54-22.mp4",
    caption: "Mirror mirror"
  },
  {
    type: "video",
    src: "media/video_2026-10-31_19-54-22 (2).mp4",
    caption: "Toothbrush fetishist"
  },
  {
    type: "video",
    src: "media/video_2026-10-31_19-54-22 (3).mp4",
    caption: "Pretty hair"
  },
  {
    type: "video",
    src: "media/video_2026-10-31_19-54-22 (4).mp4",
    caption: "Nsuomunam"
  },
  {
    type: "video",
    src: "media/video_2026-10-31_19-54-22 (5).mp4",
    caption: "Eii Maame"
  },
  {
    type: "video",
    src: "media/video_2026-10-31_19-54-22 (6).mp4",
    caption: "Lowkey looking like the Grinch"
  },
  {
    type: "video",
    src: "media/Snapchat-1145416384.mp4",
    caption: "Four eyed ahh"
  },
  {
    type: "video",
    src: "media/Snapchat-1108036562.mp4",
    caption: "Even fewer brain cells. Impossible, I know"
  },
  {
    type: "video",
    src: "media/Snapchat-1932444150.mp4",
    caption: "Mad woman"
  },
  {
    type: "video",
    src: "media/Snapchat-1446307756.mp4",
    caption: "An attempt was made. Sigh"
  },
  {
    type: "video",
    src: "media/Snapchat-1485911400.mp4",
    caption: "So dramatic. *Eyeroll"
  },
  {
    type: "video",
    src: "media/Snapchat-297975467.mp4",
    caption: "Kakai"
  },
  {
    type: "video",
    src: "media/video_2026-11-15_17-45-25.mp4",
    caption: "Delulu"
  },
  {
    type: "video",
    src: "media/video_2026-11-15_17-45-34.mp4",
    caption: "Addict"
  }
];

const gallery = document.getElementById("gallery");
const filterButtons = document.querySelectorAll(".filter-button");
const mediaCount = document.getElementById("media-count");
const viewer = document.getElementById("media-viewer");
const viewerMedia = document.getElementById("viewer-media");
const viewerCaption = document.getElementById("viewer-caption");
const viewerCount = document.getElementById("viewer-count");
let visibleMedia = media;
let activeIndex = 0;

function renderGallery(filter = "all") {
  visibleMedia = filter === "all" ? media : media.filter((item) => item.type === filter);
  gallery.replaceChildren();
  mediaCount.textContent = `${visibleMedia.length} ${filter === "all" ? "moments" : `${filter}s`}`;

  visibleMedia.forEach((item, index) => {
    const card = document.createElement("button");
    const previewMedia = item.type === "photo"
      ? document.createElement("img")
      : document.createElement("video");
    const preview = document.createElement("span");
    const caption = document.createElement("span");
    const kind = document.createElement("span");

    card.type = "button";
    card.className = `media-card ${item.type}-card`;
    card.setAttribute("aria-label", `${item.type === "video" ? "Play video" : "View photo"}: ${item.caption}`);
    if (item.type === "photo") {
      previewMedia.src = item.src;
      previewMedia.alt = item.alt;
      previewMedia.loading = "lazy";
    } else if (previewMedia) {
      previewMedia.src = item.src;
      previewMedia.muted = true;
      previewMedia.playsInline = true;
      previewMedia.setAttribute("webkit-playsinline", "");
      previewMedia.disablePictureInPicture = true;
      previewMedia.preload = "metadata";
      previewMedia.tabIndex = -1;
      previewMedia.setAttribute("aria-hidden", "true");
      const showPreviewFrame = () => {
        if (Number.isFinite(previewMedia.duration) && previewMedia.duration > 0) {
          previewMedia.currentTime = Math.min(0.1, previewMedia.duration / 2);
        }
      };
      previewMedia.addEventListener("loadedmetadata", showPreviewFrame, { once: true });
      previewMedia.addEventListener("loadeddata", () => {
        showPreviewFrame();
      }, { once: true });
    }
    preview.className = "media-preview";
    caption.className = "card-caption";
    caption.textContent = item.caption;
    kind.className = "card-kind";
    kind.textContent = item.type === "video" ? "Video" : "Photo";
    if (previewMedia) preview.append(previewMedia);

    if (item.type === "video") {
      const playMark = document.createElement("span");
      playMark.className = "play-mark";
      playMark.setAttribute("aria-hidden", "true");
      playMark.textContent = "▶";
      preview.append(playMark);
    }

    card.append(preview, caption, kind);
    card.addEventListener("click", () => openViewer(index));
    gallery.append(card);
  });
}

function openViewer(index) {
  activeIndex = index;
  updateViewer();
  viewer.showModal();
  const video = viewerMedia.querySelector("video");
  if (video) video.play().catch(() => {});
}

function updateViewer() {
  const item = visibleMedia[activeIndex];
  viewerMedia.replaceChildren();
  viewerCaption.textContent = item.caption;
  viewerCount.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(visibleMedia.length).padStart(2, "0")}`;

  if (item.type === "video") {
    const video = document.createElement("video");
    const playButton = document.createElement("button");

    video.src = item.src;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "");
    playButton.type = "button";
    playButton.className = "viewer-play";
    playButton.setAttribute("aria-label", "Play video");
    playButton.textContent = "▶";
    playButton.addEventListener("click", () => video.play().catch(() => {}));
    video.addEventListener("playing", () => {
      playButton.hidden = true;
    });
    video.addEventListener("pause", () => {
      playButton.hidden = video.ended;
    });
    viewerMedia.append(video, playButton);
    video.play().catch(() => {});
    return;
  }

  const image = document.createElement("img");
  image.src = item.src;
  image.alt = item.alt;
  viewerMedia.append(image);
}

function moveViewer(direction) {
  activeIndex = (activeIndex + direction + visibleMedia.length) % visibleMedia.length;
  updateViewer();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((filterButton) => {
      filterButton.setAttribute("aria-pressed", String(filterButton === button));
    });
    renderGallery(button.dataset.filter);
  });
});

document.getElementById("close-viewer").addEventListener("click", () => viewer.close());
document.getElementById("previous-item").addEventListener("click", () => moveViewer(-1));
document.getElementById("next-item").addEventListener("click", () => moveViewer(1));
viewer.addEventListener("click", (event) => {
  if (event.target === viewer) viewer.close();
});
viewer.addEventListener("close", () => {
  const video = viewerMedia.querySelector("video");
  if (video) video.pause();
});
document.addEventListener("keydown", (event) => {
  if (!viewer.open) return;
  if (event.key === "ArrowLeft") moveViewer(-1);
  if (event.key === "ArrowRight") moveViewer(1);
});

renderGallery();