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
