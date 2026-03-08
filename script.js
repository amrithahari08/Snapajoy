const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealNodes = document.querySelectorAll('.reveal-on-scroll');
if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealNodes.forEach((node) => node.classList.add('in'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
}

const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navDrawer = document.querySelector('.nav-drawer');

if (header && navToggle && navDrawer) {
  const isOpen = () => navToggle.getAttribute('aria-expanded') === 'true';

  const closeMenu = () => {
    header.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navDrawer.hidden = true;
    document.body.classList.remove('nav-open');
  };

  const openMenu = () => {
    header.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navDrawer.hidden = false;
    document.body.classList.add('nav-open');
  };

  navToggle.addEventListener('click', () => {
    if (isOpen()) {
      closeMenu();
      return;
    }
    openMenu();
  });

  navDrawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (!isOpen()) return;
    if (!header.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  window.addEventListener(
    'resize',
    () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    },
    { passive: true }
  );
}

const mobileStickyCta = document.querySelector('.mobile-sticky-cta');
if (mobileStickyCta) {
  const isEditable = (el) =>
    Boolean(el) &&
    (el.tagName === 'INPUT' ||
      el.tagName === 'TEXTAREA' ||
      el.tagName === 'SELECT' ||
      el.isContentEditable);

  const syncStickyVisibility = () => {
    mobileStickyCta.classList.toggle('is-hidden', isEditable(document.activeElement));
  };

  document.addEventListener('focusin', syncStickyVisibility);
  document.addEventListener('focusout', syncStickyVisibility);
  window.addEventListener('resize', syncStickyVisibility, { passive: true });
  syncStickyVisibility();
}

const cardDeck = document.querySelector('[data-card-deck]');
if (cardDeck) {
  const cards = Array.from(cardDeck.querySelectorAll('[data-deck-card]'));
  const prevButton = document.querySelector('[data-deck-prev]');
  const nextButton = document.querySelector('[data-deck-next]');
  const countNode = document.querySelector('[data-deck-count]');
  let activeIndex = 0;
  let autoAdvanceTimer = 0;
  let resumeTimer = 0;
  let isDeckVisible = false;
  let manualInteractionCount = 0;

  const wrapIndex = (value) => {
    const total = cards.length;
    return ((value % total) + total) % total;
  };

  const updateDeck = () => {
    cards.forEach((card, index) => {
      const offset = wrapIndex(index - activeIndex);
      card.classList.remove('is-active', 'is-next', 'is-next-2', 'is-next-3');
      if (offset === 0) card.classList.add('is-active');
      if (offset === 1) card.classList.add('is-next');
      if (offset === 2) card.classList.add('is-next-2');
      if (offset === 3) card.classList.add('is-next-3');
    });

    if (countNode) {
      countNode.textContent = `${activeIndex + 1}/${cards.length}`;
    }
  };

  const clearTimers = () => {
    window.clearInterval(autoAdvanceTimer);
    window.clearTimeout(resumeTimer);
  };

  const startAutoAdvance = () => {
    if (!isDeckVisible || manualInteractionCount >= 2) return;
    window.clearInterval(autoAdvanceTimer);
    autoAdvanceTimer = window.setInterval(() => {
      activeIndex = wrapIndex(activeIndex + 1);
      updateDeck();
    }, 8000);
  };

  const handleManualAdvance = (direction) => {
    activeIndex = wrapIndex(activeIndex + direction);
    updateDeck();
    clearTimers();
    manualInteractionCount += 1;
    if (manualInteractionCount >= 2) return;
    resumeTimer = window.setTimeout(() => {
      startAutoAdvance();
    }, 30000);
  };

  prevButton?.addEventListener('click', () => {
    handleManualAdvance(-1);
  });

  nextButton?.addEventListener('click', () => {
    handleManualAdvance(1);
  });

  updateDeck();

  if ('IntersectionObserver' in window) {
    const deckObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isDeckVisible = entry.isIntersecting;
          if (isDeckVisible) {
            startAutoAdvance();
          } else {
            clearTimers();
          }
        });
      },
      { threshold: 0.45 }
    );

    deckObserver.observe(cardDeck);
  } else {
    isDeckVisible = true;
    startAutoAdvance();
  }
}

const plansCarousel = document.querySelector('[data-plans-carousel]');
if (plansCarousel) {
  const track = plansCarousel.querySelector('[data-plans-track]');
  const prevButton = plansCarousel.querySelector('[data-plans-prev]');
  const nextButton = plansCarousel.querySelector('[data-plans-next]');
  const dotsRoot = plansCarousel.querySelector('[data-plans-dots]');

  if (track && prevButton && nextButton && dotsRoot) {
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const cards = Array.from(track.querySelectorAll('.plan-card'));
    const openButtons = Array.from(track.querySelectorAll('[data-plan-open]'));
    const modal = document.querySelector('[data-plan-modal]');
    const closeButton = modal?.querySelector('[data-plan-close]');
    const modalTitle = modal?.querySelector('[data-plan-modal-title]');
    const modalPrice = modal?.querySelector('[data-plan-modal-price]');
    const modalMetaOne = modal?.querySelector('[data-plan-modal-meta-one]');
    const modalMetaTwo = modal?.querySelector('[data-plan-modal-meta-two]');
    const modalOffer = modal?.querySelector('[data-plan-modal-offer]');
    const modalCopy = modal?.querySelector('[data-plan-modal-copy]');
    let dots = [];
    let autoplayTimer = 0;
    let dragPauseTimer = 0;
    let isHovered = false;
    let isFocused = false;
    let isDragging = false;
    let isModalOpen = false;

    const getVisibleCount = () => {
      if (desktopQuery.matches) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    };

    const getFrameCount = () => Math.max(1, cards.length - getVisibleCount() + 1);

    const getStepSize = () => {
      const firstCard = cards[0];
      const nextCard = cards[1];
      if (!firstCard) return track.clientWidth;
      if (nextCard instanceof HTMLElement) {
        return Math.round(nextCard.offsetLeft - firstCard.offsetLeft);
      }
      return Math.round(firstCard.getBoundingClientRect().width);
    };

    const getMaxIndex = () => getFrameCount() - 1;

    const getActiveIndex = () => {
      const step = getStepSize();
      if (!step) return 0;
      return Math.max(0, Math.min(getMaxIndex(), Math.round(track.scrollLeft / step)));
    };

    const stopAutoplay = () => {
      window.clearInterval(autoplayTimer);
      autoplayTimer = 0;
    };

    const canAutoplay = () =>
      desktopQuery.matches &&
      !prefersReducedMotion &&
      !isHovered &&
      !isFocused &&
      !isDragging &&
      !isModalOpen;

    const syncDots = () => {
      const frameCount = getFrameCount();
      if (dots.length === frameCount) return;

      dotsRoot.innerHTML = '';
      dots = Array.from({ length: frameCount }, (_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'plans-dot';
        dot.setAttribute('aria-label', `Show bundle set ${index + 1}`);
        dot.setAttribute('aria-pressed', 'false');
        dot.addEventListener('click', () => moveToIndex(index));
        dotsRoot.appendChild(dot);
        return dot;
      });
    };

    const syncUi = () => {
      syncDots();
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth - 4);
      const activeIndex = getActiveIndex();
      prevButton.disabled = activeIndex <= 0;
      nextButton.disabled = track.scrollLeft >= maxScroll || activeIndex >= getMaxIndex();
      dots.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-pressed', String(isActive));
      });
    };

    const startAutoplay = () => {
      stopAutoplay();
      if (!canAutoplay()) return;
      autoplayTimer = window.setInterval(() => {
        const nextIndex = getActiveIndex() >= getMaxIndex() ? 0 : getActiveIndex() + 1;
        moveToIndex(nextIndex);
      }, 8000);
    };

    const pauseForDrag = () => {
      isDragging = true;
      stopAutoplay();
      window.clearTimeout(dragPauseTimer);
    };

    const releaseDrag = () => {
      isDragging = false;
      window.clearTimeout(dragPauseTimer);
      dragPauseTimer = window.setTimeout(startAutoplay, 250);
    };

    function moveToIndex(index) {
      const step = getStepSize();
      const target = Math.max(0, Math.min(getMaxIndex(), index));
      track.scrollTo({
        left: step * target,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    }

    const moveTrack = (direction) => moveToIndex(getActiveIndex() + direction);

    const openModal = (card) => {
      if (!modal || !modalTitle || !modalPrice || !modalMetaOne || !modalMetaTwo || !modalOffer || !modalCopy) {
        return;
      }

      modalTitle.textContent = card.dataset.planTitle || '';
      modalPrice.textContent = card.dataset.planPrice || '';
      modalMetaOne.textContent = card.dataset.planMetaOne || '';
      modalMetaTwo.textContent = card.dataset.planMetaTwo || '';
      modalOffer.textContent = card.dataset.planOffer || '';
      modalCopy.textContent = card.dataset.planDetail || '';
      isModalOpen = true;
      stopAutoplay();
      modal.showModal();
    };

    const closeModal = () => {
      if (!modal?.open) return;
      modal.close();
      isModalOpen = false;
      startAutoplay();
    };

    prevButton.addEventListener('click', () => moveTrack(-1));
    nextButton.addEventListener('click', () => moveTrack(1));

    plansCarousel.addEventListener('mouseenter', () => {
      isHovered = true;
      stopAutoplay();
    });
    plansCarousel.addEventListener('mouseleave', () => {
      isHovered = false;
      startAutoplay();
    });
    plansCarousel.addEventListener('focusin', () => {
      isFocused = true;
      stopAutoplay();
    });
    plansCarousel.addEventListener('focusout', () => {
      isFocused = plansCarousel.contains(document.activeElement);
      if (!isFocused) startAutoplay();
    });

    openButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const card = button.closest('.plan-card');
        if (card instanceof HTMLElement) {
          openModal(card);
        }
      });
    });

    closeButton?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (event) => {
      const rect = modal.getBoundingClientRect();
      const isBackdropClick =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;
      if (isBackdropClick) closeModal();
    });
    modal?.addEventListener('close', () => {
      isModalOpen = false;
      startAutoplay();
    });

    track.addEventListener('pointerdown', pauseForDrag);
    window.addEventListener('pointerup', releaseDrag);
    window.addEventListener('pointercancel', releaseDrag);
    track.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        moveTrack(1);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        moveTrack(-1);
      }
      if (event.key === 'Home') {
        event.preventDefault();
        moveToIndex(0);
      }
      if (event.key === 'End') {
        event.preventDefault();
        moveToIndex(getMaxIndex());
      }
    });

    track.addEventListener('scroll', syncUi, { passive: true });
    window.addEventListener('resize', () => {
      syncUi();
      startAutoplay();
    }, { passive: true });
    desktopQuery.addEventListener('change', () => {
      syncUi();
      startAutoplay();
    });

    syncUi();
    startAutoplay();
  }
}
const journey = document.querySelector('[data-journey]');
if (journey) {
  const steps = Array.from(journey.querySelectorAll('.journey-step'));
  const thresholds = steps.map((step) => Number(step.dataset.threshold || 1));
  let previewProgress = null;
  let scrollProgress = 0;
  let rafId = 0;

  const setProgress = (value) => {
    journey.style.setProperty('--progress', value);
  };

  const getCurrentIndex = (value) => {
    let current = -1;
    thresholds.forEach((threshold, index) => {
      if (value >= threshold) current = index;
    });
    return current;
  };

  const applyJourneyState = (value, hoveredIndex = -1) => {
    const currentIndex = getCurrentIndex(value);
    setProgress(String(value));

    steps.forEach((step, index) => {
      step.classList.toggle('is-active', index <= currentIndex && currentIndex >= 0);
      step.classList.toggle('is-current', index === currentIndex);
      step.classList.toggle('is-hovered', index === hoveredIndex);
    });
  };

  const setPreviewStep = (targetStep) => {
    previewProgress = Number(targetStep.dataset.threshold || 0);
    const hoveredIndex = steps.indexOf(targetStep);
    applyJourneyState(previewProgress, hoveredIndex);
  };

  const clearPreview = () => {
    previewProgress = null;
    applyJourneyState(scrollProgress);
  };

  const computeScrollProgress = () => {
    const rect = journey.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const start = viewportHeight * 0.82;
    const end = viewportHeight * 0.22;
    const total = rect.height + start - end;
    const raw = (start - rect.top) / total;
    return Math.max(0, Math.min(1, raw));
  };

  const updateFromScroll = () => {
    rafId = 0;
    scrollProgress = computeScrollProgress();
    if (previewProgress === null) {
      applyJourneyState(scrollProgress);
    }
  };

  const queueUpdate = () => {
    if (rafId) return;
    rafId = window.requestAnimationFrame(updateFromScroll);
  };

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    scrollProgress = computeScrollProgress();
    applyJourneyState(scrollProgress);
  } else {
    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', queueUpdate, { passive: true });
    window.addEventListener('orientationchange', queueUpdate, { passive: true });
    queueUpdate();
  }

  steps.forEach((step) => {
    let clickResetTimer;

    step.addEventListener('pointerenter', () => setPreviewStep(step));
    step.addEventListener('focus', () => setPreviewStep(step));
    step.addEventListener('pointerleave', clearPreview);
    step.addEventListener('blur', clearPreview);
    step.addEventListener('click', () => {
      clearTimeout(clickResetTimer);
      setPreviewStep(step);
      clickResetTimer = window.setTimeout(clearPreview, 900);
    });
    step.addEventListener('touchstart', () => setPreviewStep(step), { passive: true });
  });

  queueUpdate();
}



