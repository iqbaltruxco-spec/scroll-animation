document.addEventListener('DOMContentLoaded', () => {
  let activeNav = 'Home';
  let activeTourIndex = 2;
  let showAllTours = false;

  const navButtons = document.querySelectorAll('[data-nav-item]');
  const aboutCard = document.getElementById('about-us');
  const toursCard = document.getElementById('tours');

  const menuDrawer = document.getElementById('menu-drawer');
  const openMenuBtn = document.getElementById('open-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const drawerPlanBtn = document.getElementById('drawer-plan-btn');

  const contactModal = document.getElementById('contact-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const formError = document.getElementById('form-error');
  const successSummary = document.getElementById('success-summary');
  const successDoneBtn = document.getElementById('success-done-btn');

  const nameInput = document.getElementById('contact-name');
  const datesInput = document.getElementById('contact-dates');
  const emailInput = document.getElementById('contact-email');
  const preferencesInput = document.getElementById('contact-preferences');

  const openModalButtons = document.querySelectorAll('[data-open-modal]');
  const exploreButtons = document.querySelectorAll('[data-explore-tour]');

  const tourCards = Array.from(document.querySelectorAll('.tour-card'));
  const prevTourBtn = document.getElementById('prev-tour-btn');
  const nextTourBtn = document.getElementById('next-tour-btn');
  const viewMoreBtn = document.getElementById('view-more-btn');
  const allToursGrid = document.getElementById('all-tours-grid');

  const navTargetMap = {
    Home: 'home',
    Discover: 'discover',
    Tours: 'popular-tours',
    'About us': 'about-us',
  };

  function syncNavUI() {
    navButtons.forEach((btn) => {
      const item = btn.getAttribute('data-nav-item');
      btn.classList.toggle('is-active', item === activeNav);
    });

    if (aboutCard) {
      aboutCard.classList.toggle('is-highlighted', activeNav === 'About us');
    }
    if (toursCard) {
      toursCard.classList.toggle('is-highlighted', activeNav === 'Tours');
    }
  }

  function openMenuDrawer() {
    if (!menuDrawer) return;
    menuDrawer.hidden = false;
  }

  function closeMenuDrawer() {
    if (!menuDrawer) return;
    menuDrawer.hidden = true;
  }

  function openContactModal(prefillTour) {
    if (!contactModal) return;
    if (prefillTour && preferencesInput) {
      preferencesInput.value = `Interested in: ${prefillTour}`;
    }
    contactModal.hidden = false;
  }

  function resetContactModal() {
    if (!contactModal) return;
    contactModal.hidden = true;
    if (contactForm) contactForm.hidden = false;
    if (formSuccess) formSuccess.hidden = true;
    if (formError) {
      formError.hidden = true;
      formError.textContent = '';
    }
    if (nameInput) nameInput.value = '';
    if (datesInput) datesInput.value = '';
    if (emailInput) emailInput.value = '';
    if (preferencesInput) preferencesInput.value = '';
  }

  function renderCarousel() {
    const total = tourCards.length;
    if (total === 0) return;

    tourCards.forEach((card, index) => {
      let offset = index - activeTourIndex;
      if (offset > Math.floor(total / 2)) offset -= total;
      if (offset < -Math.floor(total / 2)) offset += total;

      const absOffset = Math.abs(offset);
      const isCenter = offset === 0;

      const translateX = offset * 185;
      const scale = isCenter ? 1 : absOffset === 1 ? 0.88 : 0.76;
      const zIndex = 30 - absOffset * 10;
      const opacity = absOffset > 2 ? 0 : isCenter ? 1 : absOffset === 1 ? 0.92 : 0.78;

      card.style.transform = `translateX(${translateX}px) scale(${scale})`;
      card.style.zIndex = String(zIndex);
      card.style.opacity = String(opacity);
      card.classList.toggle('is-center', isCenter);
    });
  }

  navButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const item = btn.getAttribute('data-nav-item');
      if (!item) return;

      if (btn.tagName === 'A') {
        e.preventDefault();
      }

      activeNav = item;
      syncNavUI();
      closeMenuDrawer();

      if (item === 'Contact') {
        openContactModal();
        return;
      }

      const targetId = navTargetMap[item];
      const targetEl = targetId ? document.getElementById(targetId) : null;
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if (openMenuBtn) {
    openMenuBtn.addEventListener('click', openMenuDrawer);
  }
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMenuDrawer);
  }
  if (menuDrawer) {
    menuDrawer.addEventListener('click', (e) => {
      if (e.target === menuDrawer) {
        closeMenuDrawer();
      }
    });
  }
  if (drawerPlanBtn) {
    drawerPlanBtn.addEventListener('click', () => {
      closeMenuDrawer();
      openContactModal();
    });
  }

  openModalButtons.forEach((btn) => {
    btn.addEventListener('click', () => openContactModal());
  });

  exploreButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const tourTitle = btn.getAttribute('data-explore-tour') || '';
      openContactModal(tourTitle);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', resetContactModal);
  }
  if (successDoneBtn) {
    successDoneBtn.addEventListener('click', resetContactModal);
  }
  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        resetContactModal();
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';

      if (!nameVal || !emailVal) {
        if (formError) {
          formError.textContent = 'Please enter your name and email address.';
          formError.hidden = false;
        }
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailVal)) {
        if (formError) {
          formError.textContent = 'Please enter a valid email address.';
          formError.hidden = false;
        }
        return;
      }

      if (formError) {
        formError.hidden = true;
        formError.textContent = '';
      }
      if (successSummary) {
        successSummary.textContent = `Thank you, ${nameVal}. Our Paris travel specialists will send personalized tour options to ${emailVal}.`;
      }
      contactForm.hidden = true;
      if (formSuccess) formSuccess.hidden = false;
    });
  }

  tourCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (index !== activeTourIndex) {
        activeTourIndex = index;
        renderCarousel();
      }
    });
  });

  if (prevTourBtn) {
    prevTourBtn.addEventListener('click', () => {
      activeTourIndex = (activeTourIndex - 1 + tourCards.length) % tourCards.length;
      renderCarousel();
    });
  }

  if (nextTourBtn) {
    nextTourBtn.addEventListener('click', () => {
      activeTourIndex = (activeTourIndex + 1) % tourCards.length;
      renderCarousel();
    });
  }

  if (viewMoreBtn && allToursGrid) {
    viewMoreBtn.addEventListener('click', () => {
      showAllTours = !showAllTours;
      allToursGrid.hidden = !showAllTours;
      viewMoreBtn.textContent = showAllTours ? 'Hide All Tours' : 'View More Tours';
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenuDrawer();
      resetContactModal();
    }
  });

  syncNavUI();
  renderCarousel();
});
