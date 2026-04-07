// Rotating hero titles
const rotatingText = document.querySelector('.rotating-text');
const heroTitles = ['Designer', 'Strategist', 'Storyteller', 'Marketer'];
let titleIndex = 0;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const introOverlay = document.querySelector('#introOverlay');
const phoneImage = document.querySelector('.phone-handset');
const phoneBaseImage = document.querySelector('.phone-base');
const phoneFallback = document.querySelector('.phone-fallback');
const overlaySparkleLayer = document.querySelector('.overlay-sparkle-layer');
const phoneStack = document.querySelector('.phone-stack');

const dismissIntroOverlay = () => {
  if (!introOverlay) return;
  introOverlay.classList.add('hide');
  window.setTimeout(() => {
    introOverlay.style.display = 'none';
    document.body.classList.remove('loading');
  }, prefersReducedMotion ? 0 : 620);
};

if (introOverlay) {
  document.body.classList.add('loading');

  // Match hero interaction style with a subtle star trail on overlay hover
  if (overlaySparkleLayer && !prefersReducedMotion) {
    let lastOverlaySparkle = 0;
    introOverlay.addEventListener('pointermove', (event) => {
      const now = performance.now();
      if (now - lastOverlaySparkle < 90) return;
      lastOverlaySparkle = now;

      const rect = introOverlay.getBoundingClientRect();
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle-particle';
      sparkle.style.left = `${event.clientX - rect.left}px`;
      sparkle.style.top = `${event.clientY - rect.top}px`;
      overlaySparkleLayer.appendChild(sparkle);

      sparkle.addEventListener('animationend', () => {
        sparkle.remove();
      });
    });
  }

  // Safety: allow clicking anywhere on the overlay to continue
  introOverlay.addEventListener('click', (event) => {
    if (event.target === introOverlay || event.target.closest('.overlayContent')) {
      dismissIntroOverlay();
    }
  });

  // Safety: keyboard users can dismiss with Enter or Space
  window.addEventListener('keydown', (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && introOverlay.style.display !== 'none') {
      dismissIntroOverlay();
    }
  });

  // Safety: auto-dismiss after a short delay if nothing is clicked
  window.setTimeout(() => {
    if (introOverlay.style.display !== 'none') {
      dismissIntroOverlay();
    }
  }, 5000);
}

if (phoneImage && phoneFallback) {
  const showFallback = () => {
    phoneFallback.style.display = 'inline-block';
    if (phoneImage) phoneImage.style.display = 'none';
    if (phoneBaseImage) phoneBaseImage.style.display = 'none';
  };

  phoneImage.addEventListener('error', showFallback);
  if (phoneBaseImage) {
    phoneBaseImage.addEventListener('error', showFallback);
  }
}

if (phoneStack && !prefersReducedMotion) {
  phoneStack.addEventListener('pointermove', (event) => {
    const rect = phoneStack.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 8;
    const rotateX = (0.5 - y) * 6;
    phoneStack.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  });

  phoneStack.addEventListener('pointerleave', () => {
    phoneStack.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
}

if (rotatingText && !prefersReducedMotion) {
  setInterval(() => {
    titleIndex = (titleIndex + 1) % heroTitles.length;
    rotatingText.style.opacity = '0';

    setTimeout(() => {
      rotatingText.textContent = heroTitles[titleIndex];
      rotatingText.style.opacity = '1';
    }, 180);
  }, 2100);
}

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Header style change after scroll for better contrast
const header = document.querySelector('.site-header');

const updateHeaderState = () => {
  if (!header) return;
  if (window.scrollY > 24) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', updateHeaderState);
updateHeaderState();

// Highlight the active section in navigation
const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-link');

const setActiveNav = (activeId) => {
  navItems.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${activeId}`;
    link.classList.toggle('active', isActive);
  });
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveNav(entry.target.id);
      }
    });
  },
  {
    threshold: 0.52,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

// Reveal sections as they enter viewport
const fadeItems = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
  }
);

fadeItems.forEach((item) => observer.observe(item));

// Subtle pointer parallax in hero
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

if (hero && heroContent && !prefersReducedMotion) {
  hero.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 9;
    const y = (event.clientY / window.innerHeight - 0.5) * 7;
    heroContent.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });

  hero.addEventListener('pointerleave', () => {
    heroContent.style.transform = 'translate3d(0, 0, 0)';
  });
}

// Sparkle trail in hero area
const sparkleLayer = document.querySelector('.hero-sparkle-layer');
let lastSparkle = 0;

if (hero && sparkleLayer && !prefersReducedMotion) {
  hero.addEventListener('pointermove', (event) => {
    const now = performance.now();
    if (now - lastSparkle < 85) return;
    lastSparkle = now;

    const rect = hero.getBoundingClientRect();
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle-particle';
    sparkle.style.left = `${event.clientX - rect.left}px`;
    sparkle.style.top = `${event.clientY - rect.top}px`;
    sparkleLayer.appendChild(sparkle);

    sparkle.addEventListener('animationend', () => {
      sparkle.remove();
    });
  });
}

// Soft tilt interaction on project cards
const projectCards = document.querySelectorAll('.project-card');

if (!prefersReducedMotion) {
  projectCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 5;
      const rotateX = (0.5 - y) * 5;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    });
  });
}

// Client-side contact form interaction
const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const message = document.querySelector('#message');

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      formStatus.textContent = 'Please fill in all fields first.';
      return;
    }

    formStatus.textContent = 'Thanks! Your message is ready to send.';
    contactForm.reset();
  });
}

// Project case-study modal
const projectModal = document.querySelector('.project-modal');
const modalTitle = document.querySelector('#modal-title');
const modalTag = document.querySelector('#modal-tag');
const modalChallenge = document.querySelector('#modal-challenge');
const modalProcess = document.querySelector('#modal-process');
const modalResult = document.querySelector('#modal-result');
const modalCloseBtn = document.querySelector('.modal-close');
const detailButtons = document.querySelectorAll('.more-info');

const closeModal = () => {
  if (!projectModal) return;
  projectModal.classList.remove('open');
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

if (projectModal && modalTitle && modalTag && modalChallenge && modalProcess && modalResult) {
  detailButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.project-card');
      if (!card) return;

      modalTitle.textContent = card.dataset.project || 'Project Details';
      modalTag.textContent = card.dataset.tag || '';
      modalChallenge.textContent = card.dataset.challenge || '';
      modalProcess.textContent = card.dataset.process || '';
      modalResult.textContent = card.dataset.result || '';

      projectModal.classList.add('open');
      projectModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  projectModal.addEventListener('click', (event) => {
    if (event.target === projectModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && projectModal.classList.contains('open')) {
      closeModal();
    }
  });
}

// Cute custom cursor (desktop only)
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
const canUseFancyCursor =
  dot &&
  ring &&
  !prefersReducedMotion &&
  window.matchMedia('(pointer: fine)').matches;

if (canUseFancyCursor) {
  document.body.classList.add('cursor-active');

  let ringX = 0;
  let ringY = 0;
  let mouseX = 0;
  let mouseY = 0;

  const moveDot = (x, y) => {
    dot.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
  };

  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.transform = `translate(${ringX - 14}px, ${ringY - 14}px)`;
    requestAnimationFrame(animateRing);
  };

  window.addEventListener('pointermove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    moveDot(mouseX, mouseY);
  });

  document.querySelectorAll('a, button, .project-card, input, textarea').forEach((el) => {
    el.addEventListener('pointerenter', () => {
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('pointerleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });

  animateRing();
}
