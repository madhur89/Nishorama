(() => {
  const heroes = document.querySelectorAll('.cust-gallery-hero');
  heroes.forEach((root) => {
    const slides = [...root.querySelectorAll('.swiper-slide')];
    if (!slides.length) return;
    const dotsWrap = root.querySelector('.swiper-pagination');
    let i = 0;
    const delay = Number(root.dataset.autoplay || 4500);

    const go = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, idx) => {
        s.classList.toggle('swiper-slide-active', idx === i);
        s.style.opacity = idx === i ? '1' : '0';
        s.style.zIndex = idx === i ? '2' : '1';
      });
      dotsWrap?.querySelectorAll('button').forEach((d, idx) => {
        d.classList.toggle('swiper-pagination-bullet-active', idx === i);
      });
    };

    if (dotsWrap && !dotsWrap.children.length) {
      slides.forEach((_, idx) => {
        const b = document.createElement('button');
        b.className = 'swiper-pagination-bullet';
        b.type = 'button';
        b.addEventListener('click', () => go(idx));
        dotsWrap.appendChild(b);
      });
    }

    slides.forEach((s) => {
      s.style.position = 'absolute';
      s.style.inset = '0';
      s.style.transition = 'opacity 0.7s ease';
    });
    root.querySelector('.swiper-wrapper')?.style && (root.querySelector('.swiper-wrapper').style.position = 'relative');
    go(0);
    if (slides.length > 1) setInterval(() => go(i + 1), delay);
  });

  document.querySelectorAll('.home-fits-wrapper').forEach((wrap) => {
    const tabs = wrap.querySelectorAll('.fit-tab');
    const panels = wrap.querySelectorAll('.fits-products');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const index = tab.dataset.index;
        tabs.forEach((t) => t.classList.toggle('active', t === tab));
        panels.forEach((p) => p.classList.toggle('active', p.dataset.index === index));
      });
    });
  });

  document.querySelectorAll('[data-nr-timer]').forEach((el) => {
    const end = new Date(el.dataset.nrTimer).getTime();
    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const set = (sel, val) => {
        el.querySelectorAll(sel).forEach((n) => {
          n.textContent = String(val).padStart(2, '0');
        });
      };
      set('[data-days]', d);
      set('[data-hours]', h);
      set('[data-minutes]', m);
      set('[data-seconds]', s);
    };
    tick();
    setInterval(tick, 1000);
  });
})();
