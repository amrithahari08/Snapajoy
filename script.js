const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const prefersReducedMotion = motionPreference.matches;
const desktopProcess = window.matchMedia("(min-width: 1024px)");
const motionNodes = document.querySelectorAll(
  '[data-motion]:not([data-motion="album-open"]), [data-motion-group]:not([data-motion-group="process"]), .reveal-on-scroll:not([data-motion]):not([data-motion-group])'
);
const processGroups = document.querySelectorAll('[data-motion-group="process"]');
const albumNodes = document.querySelectorAll(
  '[data-motion="album-open"], [data-motion="product-interaction"]'
);

document.querySelectorAll('[data-motion-group]:not([data-motion-group="process"])').forEach((group) => {
  group.querySelectorAll("[data-motion-item]").forEach((item, index) => {
    item.style.setProperty("--motion-index", Math.min(index, 4));
  });
});

processGroups.forEach((group) => {
  group.querySelectorAll("[data-motion-item]").forEach((item, index) => {
    item.classList.add("process-step");
    item.style.setProperty("--process-index", index);
  });
});

document.querySelectorAll('[data-motion="hero-settle"]').forEach((hero) => {
  hero.querySelectorAll("[data-motion-item]").forEach((item, index) => {
    item.style.setProperty("--motion-index", Math.min(index, 4));
  });
});

const revealNode = (node) => {
  node.classList.add("is-visible", "in");
};

const openAlbum = (node) => {
  revealNode(node);
  node.classList.add("is-opened");
};

const getAlbumTrigger = (node) =>
  node.closest('[data-motion="media-card"], .gallery-card, .product-card') || node;

document.documentElement.classList.add("motion-ready");
if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  motionNodes.forEach(revealNode);
  processGroups.forEach((group) => {
    group.classList.add("is-visible");
    group.querySelectorAll(".process-step").forEach(revealNode);
  });
  albumNodes.forEach(openAlbum);
} else {
  const motionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealNode(entry.target);
          motionObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  motionNodes.forEach((node) => motionObserver.observe(node));

  let processObservers = [];
  const setupProcessMotion = () => {
    processObservers.forEach((observer) => observer.disconnect());
    processObservers = [];

    if (desktopProcess.matches) {
      const processObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            entry.target.querySelectorAll(".process-step").forEach(revealNode);
            processObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
      );

      processGroups.forEach((group) => {
        if (!group.classList.contains("is-visible")) processObserver.observe(group);
      });
      processObservers.push(processObserver);
    } else {
      const processItemObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            revealNode(entry.target);
            processItemObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.35, rootMargin: "0px 0px -10% 0px" }
      );

      processGroups.forEach((group) => {
        group.querySelectorAll(".process-step:not(.is-visible)").forEach((item) => {
          processItemObserver.observe(item);
        });
      });
      processObservers.push(processItemObserver);
    }
  };

  setupProcessMotion();
  desktopProcess.addEventListener("change", setupProcessMotion);

  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (finePointer.matches) {
    albumNodes.forEach((node) => {
      const trigger = getAlbumTrigger(node);
      const hasFocusTarget =
        trigger.matches("a, button, input, select, textarea, [tabindex]") ||
        trigger.querySelector("a, button, input, select, textarea, [tabindex]");
      if (!hasFocusTarget) trigger.tabIndex = 0;
      trigger.addEventListener("pointerenter", () => openAlbum(node), { once: true });
      trigger.addEventListener("focusin", () => openAlbum(node), { once: true });
    });
  } else {
    const albumObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          openAlbum(entry.target);
          albumObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" }
    );

    albumNodes.forEach((node) => albumObserver.observe(node));
  }
}

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navDrawer = document.querySelector(".nav-drawer");

if (header) {
  const syncHeaderElevation = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  window.addEventListener("scroll", syncHeaderElevation, { passive: true });
  syncHeaderElevation();
}

if (header && navToggle && navDrawer) {
  const isOpen = () => navToggle.getAttribute("aria-expanded") === "true";
  let closeTimer;

  const finishClose = () => {
    navDrawer.hidden = true;
    navDrawer.classList.remove("is-closing");
  };

  const closeMenu = ({ immediate = false } = {}) => {
    header.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");

    window.clearTimeout(closeTimer);
    if (navDrawer.hidden) return;

    if (immediate || prefersReducedMotion) {
      finishClose();
      return;
    }

    navDrawer.classList.add("is-closing");
    closeTimer = window.setTimeout(finishClose, 180);
  };

  const openMenu = () => {
    window.clearTimeout(closeTimer);
    navDrawer.classList.remove("is-closing");
    navDrawer.hidden = false;
    header.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
  };

  navToggle.addEventListener("click", () => {
    if (isOpen()) {
      closeMenu();
      return;
    }
    openMenu();
  });

  navDrawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!isOpen()) return;
    if (!header.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth >= 1100) {
        closeMenu({ immediate: true });
      }
    },
    { passive: true }
  );
}

const mobileStickyCta = document.querySelector(".mobile-sticky-cta");
if (mobileStickyCta) {
  const stickyAnchor = document.querySelector("[data-sticky-cta-anchor]");
  let stickyAnchorVisible = false;

  const isEditable = (el) =>
    Boolean(el) &&
    (el.tagName === "INPUT" ||
      el.tagName === "TEXTAREA" ||
      el.tagName === "SELECT" ||
      el.isContentEditable);

  const syncStickyVisibility = () => {
    const shouldHide = isEditable(document.activeElement) || stickyAnchorVisible;
    mobileStickyCta.classList.toggle("is-hidden", shouldHide);
    mobileStickyCta.inert = shouldHide;
    mobileStickyCta.setAttribute("aria-hidden", String(shouldHide));
  };

  if (stickyAnchor) {
    const anchorRect = stickyAnchor.getBoundingClientRect();
    stickyAnchorVisible = anchorRect.bottom > 0 && anchorRect.top < window.innerHeight;

    if ("IntersectionObserver" in window) {
      const stickyAnchorObserver = new IntersectionObserver(
        ([entry]) => {
          stickyAnchorVisible = entry.isIntersecting;
          syncStickyVisibility();
        },
        { threshold: 0.2 }
      );
      stickyAnchorObserver.observe(stickyAnchor);
    }
  }

  document.addEventListener("focusin", syncStickyVisibility);
  document.addEventListener("focusout", syncStickyVisibility);
  window.addEventListener("resize", syncStickyVisibility, { passive: true });
  syncStickyVisibility();
}
