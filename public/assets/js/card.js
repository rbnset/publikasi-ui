document.addEventListener("DOMContentLoaded", () => {
  const wrap = document.getElementById("roadmapCards");
  if (!wrap) return;

  const cards = [...wrap.querySelectorAll(".card")];
  if (!cards.length) return;

  // Mode "fit" mulai lg (>=1024). Di bawah itu, biarkan scroll.
  const mqDesktop = window.matchMedia("(min-width: 1024px)");

  function showInfo(card, show) {
    const info = card.querySelector(".card-info");
    if (!info) return;
    info.classList.toggle("hidden", !show);
    info.classList.toggle("flex", show);
  }

  function resetInlineFlex() {
    cards.forEach((c) => (c.style.flex = ""));
  }

  function applyActive(index = 0) {
    if (!mqDesktop.matches) {
      // mobile/tablet: scroll allowed
      wrap.classList.add("overflow-x-auto");
      resetInlineFlex();
      // minimal 1 info tampil agar tidak kosong
      cards.forEach((c, i) => showInfo(c, i === index));
      return;
    }

    // desktop: no scroll + fit to container
    wrap.classList.remove("overflow-x-auto");

    const gap = 20; // gap-5 = 20px (default Tailwind)
    const n = cards.length;
    const W = wrap.clientWidth;
    const gaps = gap * (n - 1);

    // expanded lebih kecil dari sebelumnya supaya tetap muat max-width container
    const EXPANDED_RATIO = 0.42;
    const expanded = Math.max(280, Math.min(460, Math.floor(W * EXPANDED_RATIO)));
    const collapsed = Math.max(150, Math.floor((W - gaps - expanded) / (n - 1)));

    cards.forEach((card, i) => {
      const active = i === index;
      card.style.flex = `0 1 ${active ? expanded : collapsed}px`; // flex-basis [web:232]
      showInfo(card, active);
    });
  }

  // init
  applyActive(0);

  // hover desktop
  cards.forEach((card, idx) => {
    card.addEventListener("mouseenter", () => {
      if (mqDesktop.matches) applyActive(idx);
    });
    card.addEventListener("focusin", () => applyActive(idx));
  });

  wrap.addEventListener("mouseleave", () => {
    if (mqDesktop.matches) applyActive(0);
  });

  // recalc
  mqDesktop.addEventListener?.("change", () => applyActive(0));
  window.addEventListener("resize", () => applyActive(0));
});
