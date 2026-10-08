(() => {
  const header = document.querySelector('.nr-header');
  if (!header) return;

  const isHome = header.classList.contains('home-page');
  const logo = header.querySelector('.cust-header-logo');
  const menuBar = header.querySelector('.cust-menu-bar');
  const menu = header.querySelector('.header-menu-wrapper');
  const mobMenu = header.querySelector('.header-mob-menu-wrapper');
  const cart = document.querySelector('.nr-cart-drawer');
  const overlay = document.querySelector('.nr-cart-overlay');
  const searchModal = document.querySelector('.nr-search-modal');
  const storyViewer = document.querySelector('.nr-story-viewer');

  const morphLogo = () => {
    if (!isHome || !logo) return;
    const y = window.scrollY;
    const range = Math.min(window.innerHeight * 0.55, 520);
    const t = Math.min(1, Math.max(0, y / range));
    const ease = 1 - Math.pow(1 - t, 1.35);
    const startW = window.innerWidth * 0.96;
    const endW = window.innerWidth * 0.12;
    const startTop = window.innerWidth * 0.06;
    const endTop = window.innerWidth * 0.0125;
    const startLeft = window.innerWidth * 0.02;
    const endLeft = window.innerWidth * 0.0695;
    logo.style.width = `${startW + (endW - startW) * ease}px`;
    logo.style.top = `${startTop + (endTop - startTop) * ease}px`;
    logo.style.left = `${startLeft + (endLeft - startLeft) * ease}px`;
  };

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-at-top', y < 8);
    header.classList.toggle('is-scroll-down', y >= 8);
    const atBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 80;
    header.classList.toggle('is-at-bottom', atBottom);
    morphLogo();
  };

  const openMenu = () => {
    menuBar?.querySelector('.hamburger-menu')?.classList.add('active');
    menu?.classList.add('active');
    mobMenu?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    menuBar?.querySelector('.hamburger-menu')?.classList.remove('active');
    menu?.classList.remove('active');
    mobMenu?.classList.remove('active');
    document.body.style.overflow = '';
  };

  menuBar?.addEventListener('click', () => {
    if (menu?.classList.contains('active') || mobMenu?.classList.contains('active')) closeMenu();
    else openMenu();
  });

  document.querySelectorAll('[data-nr-cart-open]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      cart?.classList.add('is-open');
      overlay?.classList.add('is-open');
    });
  });
  document.querySelectorAll('[data-nr-cart-close]').forEach((el) => {
    el.addEventListener('click', () => {
      cart?.classList.remove('is-open');
      overlay?.classList.remove('is-open');
    });
  });

  document.querySelectorAll('[data-nr-search-open]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      searchModal?.classList.add('is-open');
      searchModal?.querySelector('input')?.focus();
    });
  });
  document.querySelectorAll('[data-nr-search-close]').forEach((el) => {
    el.addEventListener('click', () => searchModal?.classList.remove('is-open'));
  });

  document.querySelectorAll('[data-nr-story-open]').forEach((el) => {
    el.addEventListener('click', () => {
      storyViewer?.classList.add('is-open');
      const video = storyViewer?.querySelector('video');
      if (video) video.play().catch(() => {});
    });
  });
  document.querySelectorAll('[data-nr-story-close]').forEach((el) => {
    el.addEventListener('click', () => {
      storyViewer?.classList.remove('is-open');
      const video = storyViewer?.querySelector('video');
      if (video) video.pause();
    });
  });

  document.querySelectorAll('.header-mob-acc .acc-header').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const content = btn.nextElementSibling;
      if (!content) return;
      content.style.maxHeight = content.style.maxHeight ? '' : `${content.scrollHeight}px`;
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', morphLogo);
  header.classList.add('is-at-top');
  morphLogo();
})();
