
/* =========================================
   MAISON DE SOIRÉE
   Website interactions
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");

  const inquiryForm = document.querySelector("#inquiry-form");
  const formMessage = document.querySelector("#form-message");

  const yearElement = document.querySelector("#year");

  /* 1. AUTOMATIC FOOTER YEAR */

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* 2. MOBILE NAVIGATION */

  function closeMenu() {
    if (!menuToggle || !siteNav) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("is-open");
  }

  function openMenu() {
    if (!menuToggle || !siteNav) return;

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");
    siteNav.classList.add("is-open");
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isExpanded =
        menuToggle.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      const clickedInsideHeader =
        event.target.closest(".site-header");

      if (!clickedInsideHeader) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) {
        closeMenu();
      }
    });
  }

  /* 3. DEMONSTRATION INQUIRY FORM */

  if (inquiryForm && formMessage) {
    inquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!inquiryForm.checkValidity()) {
        inquiryForm.reportValidity();
        return;
      }

      const nameInput = inquiryForm.querySelector("#name");
      const guestName = nameInput.value.trim();

      formMessage.textContent =
        `Thank you${guestName ? `, ${guestName}` : ""}. ` +
        "Your demonstration inquiry is complete. " +
        "This fictional portfolio website does not send or store submissions.";

      formMessage.setAttribute("tabindex", "-1");
      formMessage.focus();

      inquiryForm.reset();
    });
  }

  /* 4. SMOOTH ANCHOR NAVIGATION FALLBACK */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "start"
      });

      if (history.replaceState) {
        history.replaceState(null, "", targetId);
      }
    });
  });
});

