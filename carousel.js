/* SALON ANIA — carousel tim (tombol, progress bar, drag mouse, keyboard) */
(function () {
  document.querySelectorAll('[data-carousel]').forEach(function (c) {
    var track = c.querySelector('.track'), prev = c.querySelector('[data-prev]'), next = c.querySelector('[data-next]'), bar = c.querySelector('.c-bar span');
    var step = function () {
      return track.firstElementChild.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 16);
    };
    var update = function () {
      var max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= max - 4;
      var w = Math.min(100, track.clientWidth / track.scrollWidth * 100);
      bar.style.width = w + '%';
      bar.style.left = (max > 0 ? track.scrollLeft / max * (100 - w) : 0) + '%';
    };
    prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    addEventListener('load', update);
    update();
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); next.click(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev.click(); }
    });

    // drag dengan mouse (sentuhan memakai scroll bawaan)
    var down = false, sx = 0, sl = 0, moved = false;
    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; sx = e.clientX; sl = track.scrollLeft;
    });
    addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - sx;
      if (Math.abs(dx) > 5) { moved = true; track.classList.add('dragging'); }
      if (moved) track.scrollLeft = sl - dx;
    });
    addEventListener('pointerup', function () {
      if (!down) return;
      down = false;
      if (moved) {
        track.classList.remove('dragging');
        track.scrollTo({ left: Math.round(track.scrollLeft / step()) * step(), behavior: 'smooth' });
      }
    });
    track.addEventListener('click', function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);
  });
})();
