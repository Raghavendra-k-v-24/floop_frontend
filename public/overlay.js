(() => {
  const { reviewId, token } = window.__FLOOP__;
  let commentMode = false;

  window.addEventListener("message", (event) => {
    if (!event.data || event.data.type !== "FLOOP_TOGGLE_COMMENT_MODE") return;

    commentMode = Boolean(event.data.enabled);

    // Optional UX feedback
    document.body.style.cursor = commentMode ? "crosshair" : "default";

    // Close any open comment box when toggled
    removeCommentBox();
  });

  // 🔹 Load existing pins
  fetch(`/api/pin?reviewId=${reviewId}`)
    .then((res) => res.json())
    .then((pins) => pins.forEach(renderSinglePin))
    .catch((err) => console.error("Load pins failed", err));

  // 🔹 Capture click
  document.addEventListener(
    "click",
    (e) => {
      if (
        !e.target.closest(".floop-comment-box") &&
        !e.target.closest(".floop-pin")
      ) {
        removeCommentBox();
      }

      if (!commentMode) return;
      if (e.target.closest(".floop-comment-box")) return;
      if (e.target.closest(".floop-pin")) return;

      e.preventDefault();
      e.stopPropagation();

      showCommentBox(e.pageX, e.pageY);
    },
    true,
  );

  function showCommentBox(x, y) {
    removeCommentBox();

    // Host element
    const host = document.createElement("div");
    host.className = "floop-comment-box";
    host.style.position = "absolute";
    host.style.left = `${x}px`;
    host.style.top = `${y}px`;
    host.style.zIndex = "1000000";

    // Prevent overflow
    if (x + 320 > window.innerWidth) host.style.left = `${x - 320}px`;
    if (y + 260 > window.innerHeight) host.style.top = `${y - 260}px`;

    document.body.appendChild(host);

    // Shadow root
    const shadow = host.attachShadow({ mode: "open" });

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

    const textarea = shadow.querySelector("textarea");
    const submit = shadow.querySelector(".submit");
    const cancel = shadow.querySelector(".cancel");

    textarea.focus();

    cancel.onclick = () => host.remove();

    submit.onclick = () => {
      const text = textarea.value.trim();
      if (!text) return;

      savePin(x, y, text);
      host.remove();
    };

    // Enter = submit, Shift+Enter = newline
    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submit.click();
      }
    });
  }

  function savePin(clickX, clickY, comment) {
    const x = clickX / window.innerWidth;
    const y = clickY / window.innerHeight;

    fetch("/api/pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reviewId,
        pageUrl: location.pathname,
        x,
        y,
        comment,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }
        return res.json();
      })
      .then(({ pin }) => {
        pin.comment = comment;
        renderSinglePin(pin); // ✅ instant render
      })
      .catch((err) => {
        console.error("Save pin failed:", err);
        alert("Failed to save comment");
      });
  }

  function renderSinglePin(pin) {
    if (document.querySelector(`[data-pin-id="${pin._id}"]`)) return;

    const PIN_ICON_URL = `${window.location.origin}/pin.svg`;
    const el = document.createElement("img");
    el.dataset.pinId = pin._id;
    el.className = "floop-pin";
    el.src = PIN_ICON_URL;
    el.alt = "Pin";

    el.style.cssText = `
  position:absolute;
  left:${pin.position.x * window.innerWidth}px;
  top:${pin.position.y * window.innerHeight}px;
  width:32px;
  height:32px;
  cursor:pointer;
  z-index:999999;
  transform: translate(-50%, -100%);
`;

    // 🔑 attach comment data
    el.dataset.comment = pin.comment;

    el.addEventListener("click", (e) => {
      e.stopPropagation();
      showCommentPreview(
        pin.position.x * window.innerWidth,
        pin.position.y * window.innerHeight,
        el.dataset.comment,
      );
    });

    document.body.appendChild(el);
  }

  function showCommentPreview(x, y, comment) {
    removeCommentBox();

    // Host element
    const host = document.createElement("div");
    host.className = "floop-comment-box";
    host.style.position = "absolute";
    host.style.left = `${x}px`;
    host.style.top = `${y}px`;
    host.style.zIndex = "1000000";

    // Prevent overflow
    if (x + 320 > window.innerWidth) host.style.left = `${x - 320}px`;
    if (y + 260 > window.innerHeight) host.style.top = `${y - 260}px`;

    document.body.appendChild(host);

    // Shadow root
    const shadow = host.attachShadow({ mode: "open" });

    shadow.innerHTML = `
    <style>
      :host {
        all: initial;
      }

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

    // Safe text insertion
    shadow.querySelector(".body").textContent =
      comment || "No feedback provided";
  }

  function removeCommentBox() {
    document
      .querySelectorAll(".floop-comment-box")
      .forEach((el) => el.remove());
  }
})();
