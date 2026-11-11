/* Windowmac landing page: interactive radial-menu demo, layout catalogue, release info. */
(() => {
  "use strict";

  const REPO = "iam8uman/windowmac";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Layouts (same fractions as the app) ----------
  const T = 1 / 3;
  const LAYOUTS = {
    maximize: [0, 0, 1, 1], almostMaximize: [.05, .05, .9, .9],
    leftHalf: [0, 0, .5, 1], rightHalf: [.5, 0, .5, 1], topHalf: [0, 0, 1, .5], bottomHalf: [0, .5, 1, .5],
    topLeftQuarter: [0, 0, .5, .5], topRightQuarter: [.5, 0, .5, .5],
    bottomLeftQuarter: [0, .5, .5, .5], bottomRightQuarter: [.5, .5, .5, .5],
    leftThird: [0, 0, T, 1], leftTwoThirds: [0, 0, 2 * T, 1], horizontalCenterThird: [T, 0, T, 1],
    rightTwoThirds: [T, 0, 2 * T, 1], rightThird: [2 * T, 0, T, 1],
    topThird: [0, 0, 1, T], topTwoThirds: [0, 0, 1, 2 * T], verticalCenterThird: [0, T, 1, T],
    bottomTwoThirds: [0, T, 1, 2 * T], bottomThird: [0, 2 * T, 1, T],
    center: null,
  };
  const TITLES = {
    maximize: "Maximize", almostMaximize: "Almost Maximize", center: "Centre",
    leftHalf: "Left Half", rightHalf: "Right Half", topHalf: "Top Half", bottomHalf: "Bottom Half",
    topLeftQuarter: "Top Left Quarter", topRightQuarter: "Top Right Quarter",
    bottomLeftQuarter: "Bottom Left Quarter", bottomRightQuarter: "Bottom Right Quarter",
    leftThird: "Left Third", leftTwoThirds: "Left Two Thirds", horizontalCenterThird: "Centre Third",
    rightTwoThirds: "Right Two Thirds", rightThird: "Right Third",
    topThird: "Top Third", topTwoThirds: "Top Two Thirds", verticalCenterThird: "Middle Third",
    bottomTwoThirds: "Bottom Two Thirds", bottomThird: "Bottom Third",
  };
  // Default ring, counter-clockwise from the right (matches the app).
  const DIRS = ["right", "topRight", "top", "topLeft", "left", "bottomLeft", "bottom", "bottomRight"];
  const RING = {
    center: [],
    right: ["rightHalf", "rightThird", "rightTwoThirds"],
    topRight: ["topRightQuarter"],
    top: ["maximize", "almostMaximize", "topHalf"],
    topLeft: ["topLeftQuarter"],
    left: ["leftHalf", "leftThird", "leftTwoThirds"],
    bottomLeft: ["bottomLeftQuarter"],
    bottom: ["bottomHalf", "bottomThird", "bottomTwoThirds"],
    bottomRight: ["bottomRightQuarter"],
  };
  const KEYS = {
    ArrowLeft: ["leftHalf", "leftThird", "leftTwoThirds"],
    ArrowRight: ["rightHalf", "rightThird", "rightTwoThirds"],
    ArrowUp: ["topHalf", "topThird", "topTwoThirds"],
    ArrowDown: ["bottomHalf", "bottomThird", "bottomTwoThirds"],
    Enter: ["maximize", "almostMaximize"],
    KeyC: ["center"],
    Digit1: ["topLeftQuarter"], Digit2: ["topRightQuarter"],
    Digit3: ["bottomLeftQuarter"], Digit4: ["bottomRightQuarter"],
  };

  // ---------- Layout catalogue ----------
  const GROUPS = [
    ["General", ["maximize", "almostMaximize", "center"]],
    ["Halves", ["leftHalf", "rightHalf", "topHalf", "bottomHalf"]],
    ["Quarters", ["topLeftQuarter", "topRightQuarter", "bottomLeftQuarter", "bottomRightQuarter"]],
    ["Horizontal thirds", ["leftThird", "leftTwoThirds", "horizontalCenterThird", "rightTwoThirds", "rightThird"]],
    ["Vertical thirds", ["topThird", "topTwoThirds", "verticalCenterThird", "bottomTwoThirds", "bottomThird"]],
  ];
  const catalogue = document.getElementById("catalogue");
  if (catalogue) {
    for (const [name, keys] of GROUPS) {
      const g = document.createElement("div");
      g.className = "group";
      g.innerHTML = `<h3>${name}</h3><ul></ul>`;
      const ul = g.querySelector("ul");
      for (const k of keys) {
        const u = LAYOUTS[k] || [.25, .2, .5, .6];
        const li = document.createElement("li");
        const top = 9; // the little title bar
        li.innerHTML =
          `<div class="screen-mini" aria-hidden="true"><span style="left:calc(${u[0] * 100}% + 3px);top:calc(${top + u[1] * (100 - top)}% + 3px);width:calc(${u[2] * 100}% - 6px);height:calc(${u[3] * (100 - top)}% - 6px)"></span></div>${TITLES[k]}`;
        ul.appendChild(li);
      }
      catalogue.appendChild(g);
    }
  }

  // ---------- Copy buttons ----------
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = document.querySelector(btn.dataset.copy).textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const r = document.createRange();
        r.selectNodeContents(document.querySelector(btn.dataset.copy));
        const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
        document.execCommand("copy");
      }
      btn.textContent = "Copied";
      btn.classList.add("done");
      setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("done"); }, 1800);
    });
  });

  // ---------- GitHub stars ----------
  fetch(`https://api.github.com/repos/${REPO}`)
    .then((r) => (r.ok ? r.json() : null))
    .then((repo) => {
      if (!repo || typeof repo.stargazers_count !== "number") return;
      const n = repo.stargazers_count;
      const text = n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "k" : String(n);
      document.querySelectorAll("[data-stars]").forEach((el) => {
        el.querySelector("span").textContent = text;
        el.hidden = false;
      });
    })
    .catch(() => {});

  // ---------- Latest release ----------
  fetch(`https://api.github.com/repos/${REPO}/releases/latest`)
    .then((r) => (r.ok ? r.json() : null))
    .then((rel) => {
      if (!rel || !rel.tag_name) return;
      document.querySelectorAll("[data-version]").forEach((el) => {
        el.textContent = `Version ${rel.tag_name.replace(/^v/, "")}, free and open source`;
      });
    })
    .catch(() => {});

  // ---------- The demo ----------
  const stage = document.getElementById("demo");
  const display = stage && stage.querySelector(".display");
  if (!display) return;
  const desktop = display.querySelector(".desktop");
  const preview = desktop.querySelector(".preview");
  const ring = desktop.querySelector(".ring");
  const ringSvg = ring.querySelector("svg");
  const label = ring.querySelector(".ring-label");
  const ghost = desktop.querySelector(".ghost");
  const keyHint = desktop.querySelector(".keycap-hint");
  const windows = [...desktop.querySelectorAll(".win")];

  // The visible desktop area, in % of the desktop element (the Dock takes the bottom).
  const AREA = { x: 0, y: 0, w: 100, h: 86 };
  const GAP = 1.2;

  const frames = new Map();
  windows.forEach((w, i) => {
    const s = w.style;
    frames.set(w, {
      x: parseFloat(s.getPropertyValue("--x")), y: parseFloat(s.getPropertyValue("--y")),
      w: parseFloat(s.getPropertyValue("--w")), h: parseFloat(s.getPropertyValue("--h")),
    });
    w.style.zIndex = String(i + 1);
  });
  let active = windows[windows.length - 1];
  active.classList.add("active");

  function setFrame(win, f) {
    frames.set(win, f);
    win.style.setProperty("--x", f.x + "%");
    win.style.setProperty("--y", f.y + "%");
    win.style.setProperty("--w", f.w + "%");
    win.style.setProperty("--h", f.h + "%");
  }

  function raise(win) {
    let max = 0;
    windows.forEach((w) => { max = Math.max(max, +w.style.zIndex || 0); w.classList.remove("active"); });
    win.style.zIndex = String(max + 1);
    win.classList.add("active");
    active = win;
  }

  /** Target frame for an action, with equal gaps at the edges and between windows. */
  function target(action, win) {
    const cur = frames.get(win);
    if (action === "center") {
      return { x: AREA.x + (AREA.w - cur.w) / 2, y: AREA.y + (AREA.h - cur.h) / 2, w: cur.w, h: cur.h };
    }
    const u = LAYOUTS[action];
    const half = GAP / 2;
    const ax = AREA.x + half, ay = AREA.y + half * 1.6, aw = AREA.w - GAP, ah = AREA.h - GAP * 1.6;
    return {
      x: ax + aw * u[0] + half, y: ay + ah * u[1] + half * 1.6,
      w: aw * u[2] - GAP, h: ah * u[3] - GAP * 1.6,
    };
  }

  // Ring drawing ----------------------------------------------------------
  const C = 60, R_OUT = 56, R_IN = 31;
  const pt = (r, deg) => {
    const a = (deg * Math.PI) / 180;
    return `${(C + r * Math.cos(a)).toFixed(2)} ${(C - r * Math.sin(a)).toFixed(2)}`;
  };
  ringSvg.innerHTML =
    DIRS.map((d, i) => {
      const a1 = i * 45 - 22.5 + 2.2, a2 = i * 45 + 22.5 - 2.2;
      return `<path class="seg" data-dir="${d}" d="M ${pt(R_OUT, a1)} A ${R_OUT} ${R_OUT} 0 0 0 ${pt(R_OUT, a2)} L ${pt(R_IN, a2)} A ${R_IN} ${R_IN} 0 0 1 ${pt(R_IN, a1)} Z"/>`;
    }).join("") + `<circle class="hub" cx="60" cy="60" r="24"/>`;
  const segs = new Map([...ringSvg.querySelectorAll(".seg")].map((p) => [p.dataset.dir, p]));
  const hub = ringSvg.querySelector(".hub");

  // Session state ----------------------------------------------------------
  let session = null; // { win, sx, sy, dir, source, list, index, shown }
  const memory = { key: null, win: null, index: 0, frame: null };

  const sameFrame = (a, b) => a && b && ["x", "y", "w", "h"].every((k) => Math.abs(a[k] - b[k]) < 0.5);

  function local(clientX, clientY) {
    const r = desktop.getBoundingClientRect();
    return {
      x: ((clientX - r.left) / r.width) * desktop.offsetWidth,
      y: ((clientY - r.top) / r.height) * desktop.offsetHeight,
    };
  }

  function begin(x, y, win) {
    session = { win, sx: x, sy: y, dir: "center", source: null, list: [], index: 0, shown: false };
    ring.style.left = x + "px";
    ring.style.top = y + "px";
    ring.hidden = false;
    render();
  }

  function choose(source, list, advance) {
    if (!session) return;
    if (session.source === source) {
      if (advance && list.length > 1) session.index = (session.index + 1) % list.length;
    } else {
      session.source = source;
      session.list = list;
      const cont = memory.key === source && memory.win === session.win && sameFrame(memory.frame, frames.get(session.win));
      session.index = cont && list.length > 1 ? (memory.index + 1) % list.length : 0;
    }
    render();
  }

  function moveTo(x, y) {
    if (!session) return;
    const dx = x - session.sx, dy = y - session.sy;
    let dir = "center";
    if (Math.hypot(dx, dy) >= 14) {
      let deg = (Math.atan2(-dy, dx) * 180) / Math.PI;
      if (deg < 0) deg += 360;
      dir = DIRS[Math.floor((deg + 22.5) / 45) % 8];
    }
    if (dir === session.dir) return;
    session.dir = dir;
    if (dir === "center" && session.source && session.source.startsWith("key:")) return;
    choose("dir:" + dir, RING[dir], false);
  }

  function current() {
    return session && session.list.length ? session.list[session.index % session.list.length] : null;
  }

  function render() {
    if (!session) return;
    const action = current();
    const dir = session.source && session.source.startsWith("dir:") ? session.source.slice(4) : null;
    segs.forEach((p, d) => p.classList.toggle("on", d === dir));
    hub.classList.toggle("on", !!action && (dir === "center" || (session.source || "").startsWith("key:")));
    label.querySelector("b").textContent = action ? TITLES[action] : session.source ? "No action" : "Move to choose";
    label.querySelector("small").textContent =
      session.list.length > 1 ? `${session.index + 1} of ${session.list.length} · click to cycle` : "";
    if (action) {
      const f = target(action, session.win);
      if (preview.hidden) {
        const from = frames.get(session.win);
        Object.assign(preview.style, { transition: "none", left: from.x + "%", top: from.y + "%", width: from.w + "%", height: from.h + "%" });
        preview.hidden = false;
        void preview.offsetWidth; // start the grow from the window's frame
        preview.style.transition = "";
      }
      Object.assign(preview.style, { left: f.x + "%", top: f.y + "%", width: f.w + "%", height: f.h + "%" });
    } else {
      preview.hidden = true;
    }
  }

  function end(commit) {
    if (!session) return;
    const s = session;
    const action = current();
    session = null;
    ring.hidden = true;
    preview.hidden = true;
    if (!commit || !action) return;
    const f = target(action, s.win);
    raise(s.win);
    setFrame(s.win, f);
    memory.key = s.source;
    memory.win = s.win;
    memory.index = s.index;
    memory.frame = f;
  }

  // Real input ------------------------------------------------------------
  let pointer = null; // last known pointer position over the stage (client coords)
  let over = false;
  let keySession = false;
  let pointerSession = false;

  const engage = () => { stage.classList.add("engaged"); stopGhost(); };

  stage.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { over = true; engage(); } });
  stage.addEventListener("pointerleave", (e) => {
    if (e.pointerType !== "mouse") return;
    over = false;
    if (keySession) { end(false); keySession = false; }
    stage.classList.remove("engaged");
  });
  stage.addEventListener("pointermove", (e) => {
    pointer = { x: e.clientX, y: e.clientY };
    if (session) { const p = local(e.clientX, e.clientY); moveTo(p.x, p.y); }
  });

  desktop.addEventListener("pointerdown", (e) => {
    engage();
    const win = e.target.closest(".win");
    if (keySession) {
      // Click while holding the trigger: cycle.
      e.preventDefault();
      if (session && session.source) choose(session.source, session.list, true);
      return;
    }
    if (win) raise(win);
    // Press-and-hold works everywhere, including touch screens.
    pointerSession = true;
    desktop.setPointerCapture(e.pointerId);
    const p = local(e.clientX, e.clientY);
    begin(p.x, p.y, win || active);
  });
  desktop.addEventListener("pointermove", (e) => {
    if (pointerSession && session) { const p = local(e.clientX, e.clientY); moveTo(p.x, p.y); }
  });
  const finishPointer = (commit) => () => { if (pointerSession) { pointerSession = false; end(commit); } };
  desktop.addEventListener("pointerup", finishPointer(true));
  desktop.addEventListener("pointercancel", finishPointer(false));

  const armed = () => over || document.activeElement === display;

  window.addEventListener("keydown", (e) => {
    if (!armed()) return;
    if (e.key === "Alt") {
      e.preventDefault();
      if (!keySession && !pointerSession) {
        engage();
        keySession = true;
        let p;
        if (pointer && over) p = local(pointer.x, pointer.y);
        else { const f = frames.get(active); p = { x: ((f.x + f.w / 2) / 100) * desktop.offsetWidth, y: ((f.y + f.h / 2) / 100) * desktop.offsetHeight }; }
        begin(p.x, p.y, active);
      }
      return;
    }
    if (keySession && session) {
      if (e.key === "Escape") { e.preventDefault(); end(false); keySession = false; return; }
      const list = KEYS[e.code];
      if (list) {
        e.preventDefault();
        if (!e.repeat) choose("key:" + e.code, list, true);
      }
    }
  });
  window.addEventListener("keyup", (e) => {
    if (e.key === "Alt" && keySession) {
      e.preventDefault();
      keySession = false;
      end(true);
    }
  });
  window.addEventListener("blur", () => { if (keySession) { keySession = false; end(false); } });
  display.addEventListener("contextmenu", (e) => { if (session) { e.preventDefault(); end(false); keySession = false; pointerSession = false; } });

  // Ghost walkthrough until the visitor takes over ----------------------------
  let ghostOn = false;
  let ghostToken = 0;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function stopGhost() {
    if (!ghostOn) return;
    ghostOn = false;
    ghostToken++;
    ghost.hidden = true;
    keyHint.hidden = true;
    if (!keySession && !pointerSession) end(false);
  }

  function placeGhost(x, y, instant) {
    ghost.classList.toggle("instant", !!instant);
    ghost.style.left = x + "px";
    ghost.style.top = y + "px";
  }

  async function runGhost() {
    if (reduceMotion || ghostOn) return;
    ghostOn = true;
    const token = ++ghostToken;
    const alive = () => ghostOn && token === ghostToken;
    const W = () => desktop.offsetWidth, H = () => desktop.offsetHeight;
    const script = [
      { win: 2, dir: "right", clicks: 0 },
      { win: 0, dir: "left", clicks: 1 },
      { win: 1, dir: "bottomRight", clicks: 0 },
      { win: 2, dir: "top", clicks: 0 },
      { win: 2, dir: "left", clicks: 0 },
      { win: 0, dir: "right", clicks: 0 },
    ];
    ghost.hidden = false;
    placeGhost(W() * 0.5, H() * 0.6, true);
    await sleep(500);
    let step = 0;
    while (alive()) {
      const s = script[step % script.length];
      const win = windows[s.win];
      const f = frames.get(win);
      const gx = ((f.x + f.w * 0.55) / 100) * W(), gy = ((f.y + f.h * 0.5) / 100) * H();
      placeGhost(gx, gy);
      await sleep(650); if (!alive()) return;
      raise(win);
      keyHint.hidden = false; keyHint.classList.add("down");
      begin(gx, gy, win);
      await sleep(380); if (!alive()) return;
      const i = DIRS.indexOf(s.dir), a = (i * 45 * Math.PI) / 180;
      const tx = gx + Math.cos(a) * W() * 0.07, ty = gy - Math.sin(a) * W() * 0.07;
      placeGhost(tx, ty);
      await sleep(260); if (!alive()) return;
      moveTo(tx, ty);
      await sleep(520); if (!alive()) return;
      for (let c = 0; c < s.clicks; c++) {
        ghost.animate([{ transform: "translate(-3px,-2px) scale(1)" }, { transform: "translate(-3px,-2px) scale(.8)" }, { transform: "translate(-3px,-2px) scale(1)" }], { duration: 220 });
        choose(session.source, session.list, true);
        await sleep(650); if (!alive()) return;
      }
      keyHint.classList.remove("down");
      end(true);
      await sleep(1300); if (!alive()) return;
      step++;
    }
  }

  if (!reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (en.isIntersecting && !stage.classList.contains("engaged")) setTimeout(runGhost, 600);
        else if (!en.isIntersecting) stopGhost();
      }
    }, { threshold: 0.45 });
    io.observe(stage);
  }
})();

/* Strip demo: windows as columns on one horizontal strip that scrolls, with the bar of app icons
   at the bottom. Same model as the app (StripLayout): widths are fractions of the screen, gaps are
   even, focusing a column scrolls just enough to show it, and columns off screen peek in at the edge. */
(() => {
  "use strict";
  const root = document.getElementById("strip-demo");
  if (!root) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const screen = root.querySelector(".strip-screen");
  const desk = root.querySelector(".strip-desk");
  const track = root.querySelector(".strip-track");
  const tiles = root.querySelector(".strip-tiles");
  const appLabel = root.querySelector("[data-strip-app]");
  const legend = [...root.querySelectorAll("[data-strip]")];

  const GAP = 1.2;          // % of the screen width
  const VGAP = 2.2;         // % of the screen height
  const PEEK = 0.9;         // how much of an off-screen column shows at the edge
  const PRESETS = [1 / 3, 1 / 2, 2 / 3];
  const MAX = 9;

  const APPS = {
    browser: { name: "Browser", title: "windowmac.vercel.app", glyph: "◎", icon: "linear-gradient(145deg,#5AC8FA,#0A84FF)",
      body: '<div class="body browser"><div class="b-hero"></div><div class="b-line"></div><div class="b-line short"></div><div class="b-grid"><span></span><span></span><span></span></div></div>' },
    terminal: { name: "Terminal", title: "~/windowmac", glyph: "›_", icon: "linear-gradient(145deg,#3A3C66,#11122C)",
      body: '<pre class="body terminal">$ swift test\nExecuted 39 tests, 0 failures\n$ open -g "windowmac://strip/right"\n$ <span class="caret"></span></pre>' },
    notes: { name: "Notes", title: "Ideas", glyph: "✎", icon: "linear-gradient(145deg,#FFE27A,#FFB800)",
      body: '<div class="body notes"><p class="n-title">Launch checklist</p><p>☑ Strip mode</p><p>☑ Bar of icons</p><p>☐ Post on X</p><p>☐ Chiya</p></div>' },
    editor: { name: "Editor", title: "Strip.swift", glyph: "{ }", icon: "linear-gradient(145deg,#B48CFF,#6E3BFF)",
      body: '<div class="body app-editor"><span class="c">// focus scrolls the strip</span>\n<span class="k">mutating func</span> reveal() {\n  <span class="k">if</span> left &lt; scroll {\n    scroll = left\n  }\n}\n<span class="s">"columns"</span></div>' },
    calendar: { name: "Calendar", title: "November", glyph: "31", icon: "linear-gradient(145deg,#FF7A7A,#FF3B30)",
      body: '<div class="body app-calendar">' + Array.from({ length: 28 }, (_, i) => `<span class="${[3, 9, 17].includes(i) ? "ev" : [12, 22].includes(i) ? "ev2" : ""}"></span>`).join("") + "</div>" },
    photos: { name: "Photos", title: "Dashain", glyph: "❀", icon: "conic-gradient(from 30deg,#FF9F0A,#FF375F,#BF5AF2,#0A84FF,#30D158,#FF9F0A)",
      body: '<div class="body app-photos">' + [["#FFB36B", "#FF5E62"], ["#7FD1FF", "#3A7BFF"], ["#9BF0B5", "#1FB574"], ["#E2B0FF", "#9F44D3"], ["#FFE29A", "#FFA94D"], ["#B8C6FF", "#5B6CFF"]].map(([a, b]) => `<span style="--a:${a};--b:${b}"></span>`).join("") + "</div>" },
    mail: { name: "Mail", title: "Inbox", glyph: "✉", icon: "linear-gradient(145deg,#6FB7FF,#1A6DFF)",
      body: '<div class="body app-mail"><p><b>Design review</b>Moved to Thursday</p><p><b>Release 1.2</b>Strip is in</p><p><b>Chiya?</b>4 pm</p></div>' },
    music: { name: "Music", title: "Now Playing", glyph: "♪", icon: "linear-gradient(145deg,#FF6F91,#FF2D55)",
      body: '<div class="body browser"><div class="b-hero" style="background:linear-gradient(135deg,#FF6F91,#BF5AF2)"></div><div class="b-line"></div><div class="b-line short"></div></div>' },
  };
  const START = [["browser", .5], ["terminal", 1 / 3], ["notes", 1 / 3], ["editor", 2 / 3], ["calendar", .5], ["photos", 1 / 3]];
  const EXTRA = ["mail", "music", "notes", "terminal", "browser"];

  let state; // { cols: [{ id, app, w, full, el }], focused, scroll }
  let nextId = 1;

  // ---------- Model ----------
  const colWidth = (c) => (c.full ? 100 - 2 * GAP : c.w * (100 - GAP) - GAP);
  const leftOf = (i) => { let x = GAP; for (let j = 0; j < i; j++) x += colWidth(state.cols[j]) + GAP; return x; };
  const contentWidth = () => (state.cols.length ? leftOf(state.cols.length) : 0);
  const maxScroll = () => Math.max(0, contentWidth() - 100);
  const clamp = () => { state.scroll = Math.min(Math.max(state.scroll, 0), maxScroll()); };
  const visibleFraction = (i) => {
    const l = leftOf(i) - state.scroll, w = colWidth(state.cols[i]);
    return Math.max(0, Math.min(1, (Math.min(l + w, 100) - Math.max(l, 0)) / w));
  };

  function reveal() {
    const i = state.focused;
    if (!state.cols[i]) return;
    const l = leftOf(i), w = colWidth(state.cols[i]);
    if (l - GAP < state.scroll) state.scroll = l - GAP;
    else if (l + w + GAP > state.scroll + 100) state.scroll = l + w + GAP - 100;
    clamp();
  }

  function settle() {
    if (!state.cols.length) return;
    const edges = state.cols.map((_, i) => leftOf(i) - GAP).concat(contentWidth() - 100);
    state.scroll = edges.reduce((best, e) => (Math.abs(e - state.scroll) < Math.abs(best - state.scroll) ? e : best), edges[0]);
    clamp();
    if (visibleFraction(state.focused) < 0.99) {
      let best = state.focused;
      state.cols.forEach((_, i) => { if (visibleFraction(i) > visibleFraction(best)) best = i; });
      state.focused = best;
      reveal();
    }
  }

  const ACTIONS = {
    focusLeft: () => step(-1),
    focusRight: () => step(1),
    moveLeft: () => move(-1),
    moveRight: () => move(1),
    cycleWidth: () => {
      const c = state.cols[state.focused];
      if (c.full) c.full = false;
      else c.w = PRESETS.find((p) => p > c.w + 0.02) ?? PRESETS[0];
      return true;
    },
    fullWidth: () => { const c = state.cols[state.focused]; c.full = !c.full; return true; },
    center: () => {
      const i = state.focused;
      state.scroll = leftOf(i) + colWidth(state.cols[i]) / 2 - 50;
      render(false);
      return "done";
    },
    add: () => addWindow(),
  };

  function step(d) {
    const n = Math.min(Math.max(state.focused + d, 0), state.cols.length - 1);
    if (n === state.focused) return false;
    state.focused = n;
    return true;
  }
  function move(d) {
    const n = Math.min(Math.max(state.focused + d, 0), state.cols.length - 1);
    if (n === state.focused) return false;
    [state.cols[state.focused], state.cols[n]] = [state.cols[n], state.cols[state.focused]];
    state.focused = n;
    return true;
  }

  function run(name) {
    const result = ACTIONS[name] && ACTIONS[name]();
    if (result === "done") return;
    if (result === false) { bump(); return; }
    render(true);
  }

  // ---------- Windows ----------
  function makeWindow(app) {
    const a = APPS[app];
    const el = document.createElement("div");
    el.className = "win";
    el.innerHTML = `<div class="bar"><i title="Close"></i><i></i><i></i><span>${a.title}</span></div>${a.body}`;
    return el;
  }

  function addCol(app, w) {
    const c = { id: nextId++, app, w, full: false, el: makeWindow(app) };
    c.el.dataset.id = c.id;
    return c;
  }

  function addWindow() {
    if (state.cols.length >= MAX) return false;
    const used = new Set(state.cols.map((c) => c.app));
    const app = EXTRA.find((a) => !used.has(a)) || EXTRA[state.cols.length % EXTRA.length];
    const c = addCol(app, 0.5);
    // New windows open next to the focused one, growing out of it.
    const from = state.cols[state.focused];
    if (from && from.el.style.left) {
      ["left", "top", "width", "height"].forEach((k) => (c.el.style[k] = from.el.style[k]));
      c.el.style.opacity = "0";
    }
    track.appendChild(c.el);
    state.cols.splice(state.focused + 1, 0, c);
    state.focused += 1;
    requestAnimationFrame(() => { c.el.style.opacity = ""; render(true); });
    return "done";
  }

  function closeCol(id) {
    const i = state.cols.findIndex((c) => c.id === id);
    if (i < 0) return;
    const [c] = state.cols.splice(i, 1);
    c.el.style.opacity = "0";
    c.el.style.transform = "scale(.92)";
    setTimeout(() => c.el.remove(), 260);
    if (i <= state.focused) state.focused = Math.max(0, state.focused - 1);
    if (!state.cols.length) { reset(); return; }
    render(true);
  }

  // ---------- Drawing ----------
  function render(doReveal) {
    if (doReveal) reveal();
    const h = 100 - 2 * VGAP;
    state.cols.forEach((c, i) => {
      const w = colWidth(c);
      let x = leftOf(i) - state.scroll;
      const parked = x + w < 0 || x > 100;
      if (x + w < 0) x = -w + PEEK;        // off to the left: a sliver at the edge
      else if (x > 100) x = 100 - PEEK;    // off to the right
      Object.assign(c.el.style, { left: x + "%", top: VGAP + "%", width: w + "%", height: h + "%", zIndex: String(i === state.focused ? 3 : parked ? 1 : 2) });
      c.el.classList.toggle("active", i === state.focused);
      c.el.classList.toggle("parked", parked);
    });
    tiles.innerHTML = "";
    state.cols.forEach((c, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = APPS[c.app].glyph;
      b.style.setProperty("--icon", APPS[c.app].icon);
      b.setAttribute("aria-label", `Focus ${APPS[c.app].name}`);
      b.classList.toggle("on", i === state.focused);
      b.classList.toggle("seen", visibleFraction(i) > 0.02);
      b.addEventListener("click", () => { engage(); state.focused = i; render(true); });
      tiles.appendChild(b);
    });
    const f = state.cols[state.focused];
    if (f && appLabel) appLabel.textContent = APPS[f.app].name;
    legend.forEach((b) => { if (b.dataset.strip === "add") b.disabled = state.cols.length >= MAX; });
  }

  function bump() {
    const f = state.cols[state.focused];
    if (f && !reduceMotion) f.el.animate([{ transform: "translateX(0)" }, { transform: "translateX(-.6%)" }, { transform: "translateX(.6%)" }, { transform: "translateX(0)" }], { duration: 220 });
  }

  function reset() {
    track.innerHTML = "";
    state = { cols: START.map(([app, w]) => addCol(app, w)), focused: 0, scroll: 0 };
    state.cols.forEach((c) => track.appendChild(c.el));
    render(true);
  }
  reset();

  // ---------- Input ----------
  let engaged = false;
  function engage() { if (!engaged) { engaged = true; stopGhost(); } }

  let over = false, altDown = false;
  root.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { over = true; engage(); } });
  root.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") over = false; });
  root.addEventListener("focusin", engage);
  const armed = () => over || root.contains(document.activeElement);

  const KEYMAP = {
    KeyA: ["focusLeft", "moveLeft"], KeyD: ["focusRight", "moveRight"],
    KeyW: ["cycleWidth", "fullWidth"], KeyC: [null, "center"],
  };
  window.addEventListener("keydown", (e) => {
    if (!armed()) return;
    if (e.key === "Alt") { altDown = true; e.preventDefault(); return; }
    if (!(e.altKey || altDown)) return;
    const pair = KEYMAP[e.code];
    const name = pair && pair[e.shiftKey ? 1 : 0];
    if (!name) return;
    e.preventDefault();
    engage();
    if (e.repeat && !/focus|move/.test(name)) return;
    run(name);
    flash(name);
  });
  window.addEventListener("keyup", (e) => { if (e.key === "Alt") altDown = false; });
  window.addEventListener("blur", () => { altDown = false; });

  legend.forEach((b) => b.addEventListener("click", () => { engage(); run(b.dataset.strip); flash(b.dataset.strip); }));

  function flash(name) {
    const b = legend.find((x) => x.dataset.strip === name);
    if (!b) return;
    b.classList.add("pressed");
    setTimeout(() => b.classList.remove("pressed"), 220);
  }

  // Click a window to focus it; the red dot closes it.
  track.addEventListener("click", (e) => {
    if (suppressClick) return;
    const win = e.target.closest(".win");
    if (!win) return;
    engage();
    const id = +win.dataset.id;
    if (e.target.matches(".bar i:first-child")) { closeCol(id); return; }
    const i = state.cols.findIndex((c) => c.id === id);
    if (i >= 0) { state.focused = i; render(true); }
  });

  // Sideways scrolling (trackpad, or ⌥ + wheel) slides the strip, then it settles on a column.
  let settleTimer = 0;
  function slide(deltaPercent) {
    state.scroll += deltaPercent;
    clamp();
    root.classList.add("dragging");
    render(false);
  }
  function settleSoon(ms) {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => { root.classList.remove("dragging"); settle(); render(false); }, ms);
  }
  screen.addEventListener("wheel", (e) => {
    const sideways = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    if (!sideways && !(e.altKey || altDown)) return; // let the page scroll
    e.preventDefault();
    engage();
    const px = sideways ? e.deltaX : e.deltaY;
    slide((px * (e.deltaMode === 1 ? 16 : 1) / desk.clientWidth) * 100);
    settleSoon(140);
  }, { passive: false });

  // Drag or swipe the screen sideways (touch, pen or mouse).
  let drag = null, suppressClick = false;
  screen.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".strip-tiles")) return;
    drag = { x: e.clientX, y: e.clientY, id: e.pointerId, moved: false };
  });
  screen.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved) {
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(e.clientY - drag.y)) return;
      drag.moved = true;
      engage();
      screen.setPointerCapture(e.pointerId);
    }
    drag.x = e.clientX;
    slide((-dx / desk.clientWidth) * 100);
  });
  const endDrag = () => {
    if (!drag) return;
    if (drag.moved) {
      suppressClick = true;
      setTimeout(() => (suppressClick = false), 0);
      settleSoon(0);
    }
    drag = null;
  };
  screen.addEventListener("pointerup", endDrag);
  screen.addEventListener("pointercancel", endDrag);

  // ---------- Walkthrough until the visitor takes over ----------
  let ghostToken = 0, ghostOn = false;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const SCRIPT = ["focusRight", "focusRight", "cycleWidth", "focusRight", "focusRight", "moveLeft", "center",
                  "fullWidth", "fullWidth", "add", "focusRight", "focusLeft", "focusLeft", "focusLeft", "focusLeft", "focusLeft"];

  function stopGhost() { ghostOn = false; ghostToken++; }

  async function runGhost() {
    if (reduceMotion || ghostOn || engaged) return;
    ghostOn = true;
    const token = ++ghostToken;
    const alive = () => ghostOn && token === ghostToken && !engaged;
    while (alive()) {
      for (const name of SCRIPT) {
        await sleep(1050);
        if (!alive()) return;
        run(name);
        flash(name);
      }
      await sleep(1400);
      if (!alive()) return;
      reset();
    }
  }

  if (!reduceMotion && "IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (en.isIntersecting) setTimeout(runGhost, 500);
        else stopGhost();
      }
    }, { threshold: 0.4 }).observe(screen);
  }
})();
