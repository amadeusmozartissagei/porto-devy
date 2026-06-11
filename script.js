document.querySelectorAll(".site-header").forEach((header) => {
  const button = header.querySelector(".menu-button");
  const nav = header.querySelector(".main-nav");

  if (!button || !nav) {
    return;
  }

  const closeMenu = () => {
    header.classList.remove("nav-open");
    button.setAttribute("aria-expanded", "false");
  };

  button.setAttribute("aria-expanded", "false");

  button.addEventListener("click", () => {
    const willOpen = !header.classList.contains("nav-open");
    header.classList.toggle("nav-open", willOpen);
    button.setAttribute("aria-expanded", String(willOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
});

/* ── Page transition ─────────────────────────────── */
document.addEventListener("click", (e) => {
  const link = e.target.closest("a[href]");
  if (!link) return;

  const href = link.getAttribute("href");

  // Skip anchors, external links, mailto, tel, etc.
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http") ||
    link.target === "_blank"
  ) {
    return;
  }

  e.preventDefault();
  document.body.classList.add("page-leaving");

  // Navigate after the fade-out animation finishes
  setTimeout(() => {
    window.location.href = href;
  }, 280);
});

// Ensure fade-in plays on back/forward navigation (bfcache)
window.addEventListener("pageshow", (e) => {
  if (e.persisted) {
    document.body.classList.remove("page-leaving");
    document.body.style.animation = "none";
    requestAnimationFrame(() => {
      document.body.style.animation = "";
    });
  }
});
