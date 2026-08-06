// ============================================
// Load content.json and render the page.
// Edit content.json (and swap files in /images) to update the site —
// no changes to this file are needed for day-to-day updates.
// ============================================

function loadContent() {
  return fetch("content.json", { cache: "no-store" })
    .then((res) => {
      if (!res.ok) throw new Error("content.json not found");
      return res.json();
    })
    .catch((err) => {
      console.error("Could not load content.json —", err.message);
      document.body.insertAdjacentHTML(
        "afterbegin",
        '<div style="background:#FF4B3E;color:#0B0F1A;font-family:monospace;padding:10px 16px;text-align:center;">' +
          "Could not load content.json. If you're opening this file directly on your computer, " +
          "run a local server instead (see README.md) — this is expected once it's live on Netlify." +
          "</div>"
      );
      return null;
    });
}

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

// Image with graceful placeholder fallback when a file is missing.
function mediaOrPlaceholder(src, label, altText) {
  const container = el("div");
  if (src) {
    const img = new Image();
    img.alt = altText || label;
    img.loading = "lazy";
    img.onerror = () => {
      img.replaceWith(el("div", "gallery-ph", label));
    };
    img.src = src;
    container.appendChild(img);
    return container.firstChild;
  }
  return el("div", "gallery-ph", label);
}

function renderProfile(data) {
  const p = data.profile;
  if (!p) return;

  document.title = `${p.name} ${p.surname} — ${p.title}`;

  const hook = document.getElementById("hero-hook");
  if (hook && p.hook) hook.textContent = p.hook;

  const loc = document.getElementById("hero-location");
  if (loc && p.location) loc.textContent = p.location;

  const photoImg = document.getElementById("hero-photo-img");
  if (photoImg && p.photo) photoImg.src = p.photo;

  const contactRow = document.getElementById("contact-row");
  if (contactRow) {
    contactRow.innerHTML = "";
    if (p.email) {
      contactRow.appendChild(
        el("a", "contact-link", `Email — ${p.email}`)
      ).setAttribute("href", `mailto:${p.email}`);
    }
    if (p.phone) {
      contactRow.appendChild(
        el("a", "contact-link", `Call — ${p.phone}`)
      ).setAttribute("href", `tel:${p.phone.replace(/\s+/g, "")}`);
    }
    (p.socials || []).forEach((s) => {
      if (!s.url) return;
      const a = el("a", "contact-link", s.label);
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener";
      contactRow.appendChild(a);
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

function renderAbout(items) {
  const grid = document.getElementById("about-grid");
  if (!grid || !items) return;
  grid.innerHTML = "";
  items.forEach((item) => {
    const card = el("div", "about-card");
    card.appendChild(el("p", "eyebrow", item.tag));
    card.appendChild(el("h3", null, item.heading));
    card.appendChild(el("p", null, item.body));
    grid.appendChild(card);
  });
}

function renderGallery(images) {
  const grid = document.getElementById("gallery");
  if (!grid || !images) return;
  grid.innerHTML = "";
  images.forEach((item) => {
    const figure = el("figure", "gallery-item");
    figure.setAttribute("tabindex", "0");
    figure.appendChild(mediaOrPlaceholder(item.file, "IMAGE\nMISSING\n\nAdd " + (item.file || "a file") + "\nin /images and set\n\"file\" in content.json", item.title));
    grid.appendChild(figure);
  });
}

function renderVideos(videos) {
  const grid = document.getElementById("video-grid");
  if (!grid || !videos) return;
  grid.innerHTML = "";
  videos.forEach((item) => {
    const btn = el("button", "video-item");
    btn.type = "button";
    btn.setAttribute("aria-label", `Play video: ${item.title || "Untitled"}`);

    if (item.youtubeId) {
      const thumb = new Image();
      thumb.alt = item.title || "";
      thumb.loading = "lazy";
      thumb.src = `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
      btn.appendChild(thumb);
      btn.appendChild(el("span", "video-play"));
      btn.addEventListener("click", () => openLightbox(item.youtubeId));
    } else {
      btn.appendChild(
        el("div", "video-ph", "VIDEO NOT LINKED\n\nAdd a YouTube ID\nin content.json for\n\u201c" + (item.title || "this video") + "\u201d")
      );
    }

    const cap = el("div", "video-caption");
    cap.appendChild(el("h4", null, item.title || ""));
    btn.appendChild(cap);
    grid.appendChild(btn);
  });
}

// ============================================
// Lightbox
// ============================================
const lightboxEl = document.getElementById("lightbox");
const lightboxFrameEl = document.getElementById("lightbox-frame");
const lightboxCloseEl = document.getElementById("lightbox-close");

function openLightbox(youtubeId) {
  lightboxFrameEl.src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;
  lightboxEl.classList.add("open");
}
function closeLightbox() {
  lightboxEl.classList.remove("open");
  lightboxFrameEl.src = "";
}
lightboxCloseEl.addEventListener("click", closeLightbox);
lightboxEl.addEventListener("click", (e) => {
  if (e.target === lightboxEl) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// ============================================
// Scroll reveal
// ============================================
function initReveal() {
  const targets = Array.from(document.querySelectorAll(".reveal"));

  // Safety net: whatever else happens with the observer, nothing stays
  // invisible for more than a couple seconds. Content must always show.
  const forceRevealTimer = setTimeout(() => {
    targets.forEach((t) => t.classList.add("in"));
  }, 2500);

  if (!("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("in"));
    clearTimeout(forceRevealTimer);
    return;
  }

  try {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach((t) => io.observe(t));
  } catch (err) {
    targets.forEach((t) => t.classList.add("in"));
    clearTimeout(forceRevealTimer);
  }
}

// ============================================
// Let a normal mouse wheel scroll these strips sideways
// (trackpads and touchscreens already scroll horizontally on their own)
// ============================================
function enableWheelScroll(el) {
  if (!el) return;
  el.addEventListener(
    "wheel",
    (e) => {
      if (el.scrollWidth <= el.clientWidth) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    },
    { passive: false }
  );
}

// ============================================
// Boot
// ============================================
loadContent().then((data) => {
  if (data) {
    renderProfile(data);
    renderAbout(data.about);
    renderGallery(data.images);
    renderVideos(data.videos);
  }
  initReveal();
  enableWheelScroll(document.getElementById("gallery"));
  enableWheelScroll(document.getElementById("video-grid"));
});
