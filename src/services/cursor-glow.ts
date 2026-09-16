import { getSettings } from "./settings-service";

let glow: HTMLDivElement | null = null;

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;

let animationFrame: number | null = null;

function animate() {
  if (!glow) return;

  currentX += (targetX - currentX) * 0.14;
  currentY += (targetY - currentY) * 0.14;

  glow.style.transform = `
    translate3d(
      ${currentX}px,
      ${currentY}px,
      0
    )
    translate(-50%, -50%)
  `;

  animationFrame =
    requestAnimationFrame(animate);
}

function updateGlowState() {
  if (!glow) return;

  const settings = getSettings();

  const enabled =
    settings.cursorGlow &&
    settings.visualEffects;

  glow.classList.toggle(
    "pulse-cursor-glow-enabled",
    enabled
  );
}

export function startCursorGlow() {
  if (glow) return;

  glow = document.createElement("div");

  glow.className = "pulse-cursor-glow";

  document.body.appendChild(glow);

  window.addEventListener(
    "pointermove",
    (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    }
  );

  window.addEventListener(
    "pointerleave",
    () => {
      glow?.classList.add(
        "pulse-cursor-glow-hidden"
      );
    }
  );

  window.addEventListener(
    "pointerenter",
    () => {
      glow?.classList.remove(
        "pulse-cursor-glow-hidden"
      );
    }
  );

  window.addEventListener(
    "pulse-settings-changed",
    updateGlowState
  );

  updateGlowState();

  animationFrame =
    requestAnimationFrame(animate);
}

export function stopCursorGlow() {
  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame);

    animationFrame = null;
  }

  glow?.remove();

  glow = null;
}