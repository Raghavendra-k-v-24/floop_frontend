(() => {
  const { reviewId, apiBase } = window.__FLOOP__;

  let commentMode = false;
  let pinsCache = [];

  //////////////////////////////////////////////////////
  // ROOT LAYERS
  //////////////////////////////////////////////////////

  const pinLayer = document.createElement("div");
  Object.assign(pinLayer.style, {
    position: "fixed",
    inset: "0",
    zIndex: "999998",
    pointerEvents: "none",
  });

  const uiLayer = document.createElement("div");
  Object.assign(uiLayer.style, {
    position: "fixed",
    inset: "0",
    zIndex: "999999",
    pointerEvents: "none",
  });

  document.body.append(pinLayer, uiLayer);

  //////////////////////////////////////////////////////
  // COMMENT MODE
  //////////////////////////////////////////////////////

  window.addEventListener("message", (e) => {
    if (e.data?.type !== "FLOOP_TOGGLE_COMMENT_MODE") return;

    commentMode = !!e.data.enabled;
    document.body.style.cursor = commentMode ? "crosshair" : "default";

    removeUI();
  });

  //////////////////////////////////////////////////////
  // LOAD PINS
  //////////////////////////////////////////////////////

  fetch(`${apiBase}/api/pin?reviewId=${reviewId}`)
    .then((r) => r.json())
    .then((pins) => {
      pinsCache = pins;
      rerenderPins();
    });

  //////////////////////////////////////////////////////
  // CLICK HANDLER
  //////////////////////////////////////////////////////

  document.addEventListener("mousedown", (e) => {
    const path = e.composedPath();

    if (path.some((el) => el?.classList?.contains("floop-ui"))) return;

    removeUI();

    if (!commentMode) return;

    const anchor = findAnchor(e.target);

    openCommentBox(e.clientX, e.clientY, anchor);
  });

  //////////////////////////////////////////////////////
  // FIND STABLE ANCHOR
  //////////////////////////////////////////////////////

  function findAnchor(el) {
    while (el && el !== document.body) {
      if (el.id) return el;

      if (el.dataset && Object.keys(el.dataset).length) return el;

      if (el.getAttribute("role")) return el;

      if (["BUTTON", "A", "H1", "H2", "H3", "IMG"].includes(el.tagName))
        return el;

      el = el.parentElement;
    }

    return document.body;
  }

  //////////////////////////////////////////////////////
  // SAFE SELECTOR
  //////////////////////////////////////////////////////

  function buildSelector(el) {
    if (el.id) return `#${CSS.escape(el.id)}`;

    if (el.classList.length)
      return `${el.tagName.toLowerCase()}.${CSS.escape(el.classList[0])}`;

    return el.tagName.toLowerCase();
  }

  //////////////////////////////////////////////////////
  // TEXT FINGERPRINT
  //////////////////////////////////////////////////////

  function getTextHint(el) {
    const text = el.innerText || el.alt || el.title || "";

    return text.trim().replace(/\s+/g, " ").slice(0, 120);
  }

  //////////////////////////////////////////////////////
  // COMMENT BOX
  //////////////////////////////////////////////////////

  function openCommentBox(x, y, anchor) {
    removeUI();

    const selector = buildSelector(anchor);
    const textHint = getTextHint(anchor);
    const tagName = anchor.tagName.toLowerCase();

    const rect = anchor.getBoundingClientRect();

    const offsetX = (x - rect.left) / rect.width;
    const offsetY = (y - rect.top) / rect.height;

    const host = document.createElement("div");
    host.className = "floop-ui";
    host.style.position = "fixed";
    host.style.left = `${x}px`;
    host.style.top = `${y}px`;
    host.style.zIndex = "1000000";
    host.style.pointerEvents = "auto";

    // Prevent overflow EXACTLY like your old script
    if (x + 320 > window.innerWidth) host.style.left = `${x - 320}px`;
    if (y + 260 > window.innerHeight) host.style.top = `${y - 260}px`;

    uiLayer.appendChild(host);

    const shadow = host.attachShadow({ mode: "open" });

    // 🔥 YOUR UI — ZERO CHANGES
    shadow.innerHTML = `
    <style>
      :host { all: initial; }

      .card {
        font-family: Inter, Arial, sans-serif;
        background: white;
        width: 300px;
        height: 250px;
        border: 2px solid #EBEFF4;
        border-radius: 12px;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        box-sizing: border-box;
      }

      .header { font-weight: 600; font-size: 14px; }

      .body {
        flex-grow: 1;
        border: 2px solid #EBEFF4;
        border-radius: 12px;
        background: #F9FAFB;
        padding: 6px;
      }

      textarea {
        width: 100%;
        height: 100%;
        resize: none;
        border: none;
        outline: none;
        background: transparent;
        font-family: inherit;
        font-size: 13px;
      }

      .footer { display: flex; gap: 8px; }

      button {
        font-size: 14px;
        padding: 4px 12px;
        border-radius: 4px;
        cursor: pointer;
      }

      .submit {
        background: #3a3cff;
        color: white;
        border: none;
      }

      .cancel {
        background: white;
        border: 1px solid #EBEFF4;
      }
    </style>

    <div class="card">
      <div class="header">Comment</div>
      <div class="body">
        <textarea placeholder="Enter comment..."></textarea>
      </div>
      <div class="footer">
        <button class="submit">Submit</button>
        <button class="cancel">Cancel</button>
      </div>
    </div>
  `;

    // 🔥 CRITICAL — stop event leak (fixes typing bug forever)
    shadow.addEventListener("mousedown", (e) => e.stopPropagation());

    const textarea = shadow.querySelector("textarea");
    const submit = shadow.querySelector(".submit");
    const cancel = shadow.querySelector(".cancel");

    textarea.focus();

    cancel.onclick = () => host.remove();

    submit.onclick = () => {
      const comment = textarea.value.trim();
      if (!comment) return;

      savePin({
        selector,
        textHint,
        tagName,
        offsetX,
        offsetY,
        comment,
      });

      host.remove();
    };

    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submit.click();
      }
    });
  }

  //////////////////////////////////////////////////////
  // SAVE PIN
  //////////////////////////////////////////////////////

  function savePin(data) {
    fetch(`${apiBase}/api/pin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reviewId,
        selector: data.selector,
        textHint: data.textHint,
        tagName: data.tagName,
        x: data.offsetX,
        y: data.offsetY,
        comment: data.comment,
        pageUrl: location.pathname,
      }),
    })
      .then((r) => r.json())
      .then(({ pin }) => {
        pin.comment = data.comment;
        pinsCache.push(pin);
        renderPin(pin);
      });
  }

  //////////////////////////////////////////////////////
  // SMART RESOLVER (THE MAGIC)
  //////////////////////////////////////////////////////

  function resolveAnchor(pin) {
    // 1️⃣ selector
    let el = document.querySelector(pin.selector);
    if (el) return el;

    // 2️⃣ text fingerprint
    if (pin.textHint) {
      const candidates = [...document.querySelectorAll(pin.tagName)];

      const match = candidates.find((c) =>
        c.innerText?.includes(pin.textHint.slice(0, 20)),
      );

      if (match) return match;
    }

    return null;
  }

  //////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////

  function rerenderPins() {
    pinLayer.innerHTML = "";
    pinsCache.forEach(renderPin);
  }

  // function renderPin(pin) {
  //   const target = resolveAnchor(pin);
  //   if (!target) return;

  //   const rect = target.getBoundingClientRect();

  //   const left = rect.left + rect.width * pin.position.x;
  //   const top = rect.top + rect.height * pin.position.y;

  //   const el = document.createElement("img");
  //   el.src = `${window.location.origin}/pin.svg`;

  //   Object.assign(el.style, {
  //     position: "fixed",
  //     left: `${left}px`,
  //     top: `${top}px`,
  //     width: "26px",
  //     transform: "translate(-50%,-100%)",
  //     cursor: "pointer",
  //     pointerEvents: "auto",
  //   });

  //   el.onmouseenter = () => showPreview(left, top, pin.comment);

  //   pinLayer.appendChild(el);
  // }

  //////////////////////////////////////////////////////
  // PREVIEW
  //////////////////////////////////////////////////////

  // function showPreview(x, y, comment) {
  //   removeUI();

  //   const host = document.createElement("div");
  //   host.className = "floop-ui";

  //   Object.assign(host.style, {
  //     position: "fixed",
  //     left: `${x}px`,
  //     top: `${y + 24}px`,
  //     pointerEvents: "auto",
  //   });

  //   const shadow = host.attachShadow({ mode: "open" });

  //   shadow.innerHTML = `
  //     <style>
  //     :host {
  //       all: initial;
  //     }

  //     .card {
  //       font-family: Inter, Arial, sans-serif;
  //       background: white;
  //       width: 300px;
  //       border: 2px solid #EBEFF4;
  //       border-radius: 12px;
  //       padding: 12px;
  //       display: flex;
  //       flex-direction: column;
  //       gap: 8px;
  //       box-sizing: border-box;

  //       opacity: 0;
  //       transform: translateY(8px) scale(0.96);
  //       animation: floopFadeIn 160ms ease-out forwards;

  //       will-change: transform, opacity;
  //     }

  //     @keyframes floopFadeIn {
  //       to {
  //         opacity: 1;
  //         transform: translateY(0) scale(1);
  //       }
  //     }

  //     .header {
  //       font-weight: 600;
  //       font-size: 14px;
  //     }

  //     .body {
  //       border: 2px solid #EBEFF4;
  //       border-radius: 12px;
  //       background: #F9FAFB;
  //       padding: 12px;
  //       font-size: 13px;
  //       line-height: 1.4;
  //       text-align: justify;
  //       color: #111;
  //       word-break: break-word;
  //     }
  //   </style>

  //   <div class="card">
  //     <div class="header">Feedback</div>
  //     <div class="body"></div>
  //   </div>
  // `;

  //   uiLayer.appendChild(host);
  // }

  function renderPin(pin) {
    const target = resolveAnchor(pin);
    if (!target) return;

    const rect = target.getBoundingClientRect();

    const left = rect.left + rect.width * pin.position.x;
    const top = rect.top + rect.height * pin.position.y;

    const el = document.createElement("img");
    el.src = `${window.location.origin}/pin.svg`;

    Object.assign(el.style, {
      position: "fixed",
      left: `${left}px`,
      top: `${top}px`,
      width: "26px",
      transform: "translate(-50%,-100%)",
      cursor: "pointer",
      pointerEvents: "auto",
    });

    let hoverTimeout;

    el.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout);

      showPreview(left, top, pin.comment, el);
    });

    el.addEventListener("mouseleave", () => {
      hoverTimeout = setTimeout(() => {
        // check if mouse entered preview
        if (!document.querySelector(":hover")?.closest(".floop-ui")) {
          removeUI();
        }
      }, 120); // tiny delay = smooth UX
    });

    pinLayer.appendChild(el);
  }

  function showPreview(x, y, comment, pinEl) {
    removeUI();

    const host = document.createElement("div");
    host.className = "floop-ui";
    host.style.position = "fixed";
    host.style.left = `${x}px`;
    host.style.top = `${y}px`;
    host.style.zIndex = "1000000";
    host.style.pointerEvents = "auto";

    if (x + 320 > window.innerWidth) host.style.left = `${x - 320}px`;
    if (y + 260 > window.innerHeight) host.style.top = `${y - 260}px`;

    const shadow = host.attachShadow({ mode: "open" });

    shadow.innerHTML = `
    <style>
      :host { all: initial; }

      .card {
        font-family: Inter, Arial, sans-serif;
        background: white;
        width: 300px;
        border: 2px solid #EBEFF4;
        border-radius: 12px;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        box-sizing: border-box;

        opacity: 0;
        transform: translateY(8px) scale(0.96);
        animation: floopFadeIn 160ms ease-out forwards;
        will-change: transform, opacity;
      }

      @keyframes floopFadeIn {
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .header {
        font-weight: 600;
        font-size: 14px;
      }

      .body {
        border: 2px solid #EBEFF4;
        border-radius: 12px;
        background: #F9FAFB;
        padding: 12px;
        font-size: 13px;
        line-height: 1.4;
        text-align: justify;
        color: #111;
        word-break: break-word;
      }
    </style>

    <div class="card">
      <div class="header">Feedback</div>
      <div class="body"></div>
    </div>
  `;

    shadow.querySelector(".body").textContent =
      comment || "No feedback provided";

    uiLayer.appendChild(host);

    let hoverTimeout;

    host.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout);
    });

    host.addEventListener("mouseleave", () => {
      hoverTimeout = setTimeout(() => {
        // if cursor is not back on pin
        if (!pinEl.matches(":hover")) {
          removeUI();
        }
      }, 120);
    });
  }

  //////////////////////////////////////////////////////
  // CLEAN
  //////////////////////////////////////////////////////

  function removeUI() {
    uiLayer.innerHTML = "";
  }

  //////////////////////////////////////////////////////
  // AUTO REFLOW
  //////////////////////////////////////////////////////

  let timer;

  function reflow() {
    clearTimeout(timer);
    timer = setTimeout(rerenderPins, 120);
  }

  window.addEventListener("scroll", reflow, true);
  window.addEventListener("resize", reflow);
})();
