/* Windowmac landing page: page motion. demo.js runs the two interactive demos; this file adds
   the cursor arrow, the scroll-driven tilt of the hero demo, scroll reveals, the header and the
   little ring in "How it works". Everything here is decoration: the page works without it. */
(() => {
  "use strict";

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const inside = (r, p, pad = 0) => p.x >= r.left - pad && p.x <= r.right + pad && p.y >= r.top - pad && p.y <= r.bottom + pad;

  // ---------- Scroll reveals ----------
  const reveals = [...document.querySelectorAll("[data-reveal]")];
  const settle = (el) => {
    // Once it has arrived, drop the reveal styles so the element's own hover transitions apply.
    const d = parseFloat(getComputedStyle(el).getPropertyValue("--d")) || 0;
    setTimeout(() => el.removeAttribute("data-reveal"), 1100 + d * 90);
  };
  if (!reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        en.target.classList.add("in");
        io.unobserve(en.target);
        settle(en.target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => { el.classList.add("in"); el.removeAttribute("data-reveal"); });
  }

  // ---------- Header: glass gets denser on scroll, a pill follows the current section ----------
  const top = document.querySelector(".top");
  const nav = top && top.querySelector("nav");
  const pill = nav && nav.querySelector(".nav-pill");
  const links = nav ? [...nav.querySelectorAll("a[href^='#']")] : [];
  let current = null;

  function movePill(a) {
    if (!pill) return;
    if (!a) { pill.style.opacity = "0"; return; }
    pill.style.left = a.offsetLeft + "px";
    pill.style.width = a.offsetWidth + "px";
    pill.style.opacity = "1";
  }
  links.forEach((a) => {
    a.addEventListener("mouseenter", () => movePill(a));
    a.addEventListener("focus", () => movePill(a));
  });
  if (nav) nav.addEventListener("mouseleave", () => movePill(current));

  if ("IntersectionObserver" in window && links.length) {
    const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const sio = new IntersectionObserver((entries) => {
      for (const en of entries) {
        const a = byId.get(en.target.id);
        if (!a) continue;
        if (en.isIntersecting) {
          links.forEach((l) => l.classList.toggle("on", l === a));
          current = a;
          if (!nav.matches(":hover")) movePill(a);
        } else if (current === a) {
          a.classList.remove("on");
          current = null;
          if (!nav.matches(":hover")) movePill(null);
        }
      }
    }, { rootMargin: "-45% 0px -50% 0px" });
    byId.forEach((_, id) => { const s = document.getElementById(id); if (s) sio.observe(s); });
  }

  // ---------- Hero demo: lies back, stands up as it scrolls into view ----------
  const stage = document.getElementById("demo");
  function tilt() {
    if (!stage || reduceMotion) return;
    const r = stage.getBoundingClientRect();
    const vh = innerHeight;
    const p = clamp((r.top - vh * 0.1) / (vh * 0.7), 0, 1);
    stage.style.setProperty("--tilt", p.toFixed(3));
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      if (top) top.classList.toggle("scrolled", scrollY > 8);
      tilt();
      kick();
    });
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll, { passive: true });
  onScroll();

  // ---------- "Flick" card: the ring lights up toward the cursor ----------
  const DIRS = 8, C = 60, R_OUT = 56, R_IN = 31;
  const pt = (r, deg) => {
    const a = (deg * Math.PI) / 180;
    return `${(C + r * Math.cos(a)).toFixed(2)} ${(C - r * Math.sin(a)).toFixed(2)}`;
  };
  document.querySelectorAll(".mini-ring").forEach((svg) => {
    let html = "";
    for (let i = 0; i < DIRS; i++) {
      const a1 = i * 45 - 22.5 + 2.2, a2 = i * 45 + 22.5 - 2.2;
      html += `<path class="seg" d="M ${pt(R_OUT, a1)} A ${R_OUT} ${R_OUT} 0 0 0 ${pt(R_OUT, a2)} L ${pt(R_IN, a2)} A ${R_IN} ${R_IN} 0 0 1 ${pt(R_IN, a1)} Z"/>`;
    }
    svg.innerHTML = html + `<circle class="hub" cx="60" cy="60" r="24"/>`;
    const segs = [...svg.querySelectorAll(".seg")];
    const card = svg.closest(".anim");
    const dot = card.querySelector(".flick-dot");
    const order = [0, 2, 4, 6, 1, 5, 3, 7];
    let k = 0;
    const show = (i) => {
      segs.forEach((s, j) => s.classList.toggle("on", j === i));
      if (!dot) return;
      if (i < 0) { dot.style.setProperty("--fx", "0px"); dot.style.setProperty("--fy", "0px"); return; }
      const a = (i * 45 * Math.PI) / 180, d = 44;
      dot.style.setProperty("--fx", (Math.cos(a) * d).toFixed(1) + "px");
      dot.style.setProperty("--fy", (-Math.sin(a) * d).toFixed(1) + "px");
    };
    if (reduceMotion) { show(0); return; }
    let timer = 0;
    const tick = () => {
      // Out to a direction, back to the centre, next direction.
      if (k % 2 === 0) show(order[(k / 2) % order.length]); else show(-1);
      k++;
      timer = setTimeout(tick, k % 2 ? 1300 : 500);
    };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([en]) => {
        clearTimeout(timer);
        if (en.isIntersecting) timer = setTimeout(tick, 400);
      }).observe(card);
    } else tick();
  });

  // ---------- The arrow: a dashed curve from the cursor to the download button ----------
  // Inside each [data-arrow-zone], a small Windowmac-style ring sits under the cursor with the
  // segment facing the button lit, and a dashed arc runs from it to the [data-arrow] button.
  let kick = () => {};
  if (!finePointer) return;

  const targets = [...document.querySelectorAll("[data-arrow]")].map((el) => ({
    el,
    zone: el.closest("[data-arrow-zone]") || el.parentElement,
    light: el.dataset.arrowTone === "light",
  }));
  if (!targets.length) return;
  const avoid = [...document.querySelectorAll("[data-arrow-avoid]")];

  const canvas = document.createElement("canvas");
  canvas.className = "arrow-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0;
  function size() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  size();
  addEventListener("resize", () => { size(); kick(); }, { passive: true });

  let mouse = null, active = null, alpha = 0, dash = 0, raf = 0;
  let spin = 0; // eased ring angle, so the lit segment glides rather than jumps

  function pick() {
    if (!mouse) return null;
    for (const el of avoid) if (inside(el.getBoundingClientRect(), mouse)) return null;
    for (const t of targets) if (inside(t.zone.getBoundingClientRect(), mouse)) return t;
    return null;
  }

  function draw(g, a) {
    const ink = active.light ? "255, 255, 255" : "20, 21, 58";
    const blue = active.light ? "159, 211, 255" : "10, 132, 255";
    const { x0, y0, x1, y1 } = g;

    // Ring under the cursor.
    const R = 17, seg = Math.PI / 4;
    const lit = Math.round(spin / seg);
    ctx.lineWidth = 6;
    ctx.lineCap = "butt";
    for (let i = 0; i < 8; i++) {
      const mid = i * seg;
      ctx.beginPath();
      ctx.arc(x0, y0, R, mid - seg / 2 + 0.07, mid + seg / 2 - 0.07);
      const on = ((i - lit) % 8 + 8) % 8 === 0;
      ctx.strokeStyle = on ? `rgba(${blue}, ${a})` : `rgba(${ink}, ${0.14 * a})`;
      ctx.stroke();
    }

    // Dashed arc, bowing gently.
    const sx = x0 + Math.cos(g.ang) * (R + 8), sy = y0 + Math.sin(g.ang) * (R + 8);
    const dx = x1 - sx, dy = y1 - sy, len = Math.hypot(dx, dy) || 1;
    let nx = -dy / len, ny = dx / len;
    if (ny > 0) { nx = -nx; ny = -ny; } // always bow upward
    const bow = Math.min(120, len * 0.22);
    const qx = (sx + x1) / 2 + nx * bow, qy = (sy + y1) / 2 + ny * bow;

    const grad = ctx.createLinearGradient(sx, sy, x1, y1);
    grad.addColorStop(0, `rgba(${ink}, ${0.15 * a})`);
    grad.addColorStop(1, `rgba(${blue}, ${0.95 * a})`);
    ctx.save();
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.setLineDash([2, 9]);
    ctx.lineDashOffset = dash;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.quadraticCurveTo(qx, qy, x1, y1);
    ctx.stroke();
    ctx.restore();

    // Arrowhead along the curve's last tangent.
    const ha = Math.atan2(y1 - qy, x1 - qx), hl = 11;
    ctx.strokeStyle = `rgba(${blue}, ${a})`;
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(x1 - hl * Math.cos(ha - Math.PI / 6), y1 - hl * Math.sin(ha - Math.PI / 6));
    ctx.lineTo(x1, y1);
    ctx.lineTo(x1 - hl * Math.cos(ha + Math.PI / 6), y1 - hl * Math.sin(ha + Math.PI / 6));
    ctx.stroke();

  }

  function frame() {
    raf = 0;
    const t = pick();
    if (t) active = t;
    let goal = 0, g = null;
    if (active && mouse) {
      const r = active.el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const ang = Math.atan2(cy - mouse.y, cx - mouse.x);
      // End just outside the button, on an ellipse around it.
      const ex = r.width / 2 + 14, ey = r.height / 2 + 14;
      const k = 1 / Math.hypot(Math.cos(ang) / ex, Math.sin(ang) / ey);
      const x1 = cx - Math.cos(ang) * k, y1 = cy - Math.sin(ang) * k;
      const dist = Math.hypot(x1 - mouse.x, y1 - mouse.y);
      if (t && !inside(r, mouse, 24)) goal = clamp((dist - 30) / 220, 0, 1);
      g = { x0: mouse.x, y0: mouse.y, x1, y1, cx, cy, ang };
      // Ease the ring's angle toward the button (shortest way round).
      let d = ang - spin;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      spin += d * 0.25;
    }
    alpha += (goal - alpha) * 0.14;
    ctx.clearRect(0, 0, W, H);
    if (g && alpha > 0.01) draw(g, alpha);
    if (!reduceMotion) dash -= 0.35;
    if (alpha > 0.01 || goal > 0) raf = requestAnimationFrame(frame);
  }
  kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

  addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    mouse = { x: e.clientX, y: e.clientY };
    kick();
  }, { passive: true });
  document.addEventListener("mouseleave", () => { mouse = null; kick(); });
  kick();
})();
