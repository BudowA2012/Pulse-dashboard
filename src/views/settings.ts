import {
  getSettings,
  saveSettings,
  resetSettings,
  type PulseSettings,
  type PulseTheme,
  type StartPage,
} from "../services/settings-service";

let activeSection = "appearance";

export function showSettingsPage() {
  const content = document.getElementById("content");

  if (!content) return;

  renderSettings();

  setupSettings();
}

function renderSettings() {
  const content = document.getElementById("content");

  if (!content) return;

  const settings = getSettings();

  content.innerHTML = `
    <div class="settings-page">

      <div class="settings-header">

        <div>

          <h1>Ustawienia</h1>

          <p>
            Dostosuj Pulse do siebie
          </p>

        </div>

      </div>


      <div class="settings-layout">

        <div class="settings-sidebar">

          <button
            class="settings-nav-item ${
              activeSection === "appearance"
                ? "active"
                : ""
            }"
            data-settings-section="appearance"
          >
            Wygląd
          </button>

          <button
            class="settings-nav-item ${
              activeSection === "general"
                ? "active"
                : ""
            }"
            data-settings-section="general"
          >
            Ogólne
          </button>

          <button
            class="settings-nav-item ${
              activeSection === "system"
                ? "active"
                : ""
            }"
            data-settings-section="system"
          >
            System
          </button>

          <button
            class="settings-nav-item ${
              activeSection === "notifications"
                ? "active"
                : ""
            }"
            data-settings-section="notifications"
          >
            Powiadomienia
          </button>

          <button
            class="settings-nav-item ${
              activeSection === "about"
                ? "active"
                : ""
            }"
            data-settings-section="about"
          >
            O Pulse
          </button>

        </div>


        <div class="settings-content">

          ${renderSection(settings)}

        </div>

      </div>

    </div>
  `;
}

function renderSection(
  settings: PulseSettings
) {
  if (activeSection === "appearance") {
    return renderAppearance(settings);
  }

  if (activeSection === "general") {
    return renderGeneral(settings);
  }

  if (activeSection === "system") {
    return renderSystem(settings);
  }

  if (activeSection === "notifications") {
    return renderNotifications();
  }

  return renderAbout();
}

function renderAppearance(
  settings: PulseSettings
) {
  const accents = [
    "#7aa7ff",
    "#a78bfa",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
  ];

  return `
    <div class="settings-section">

      <div class="settings-section-title">

        <h2>Wygląd</h2>

        <p>
          Personalizacja interfejsu Pulse
        </p>

      </div>


      <div class="settings-card">

        <div class="settings-card-info">

          <div class="settings-card-title">
            Motyw
          </div>

          <div class="settings-card-description">
            Wybierz wygląd aplikacji
          </div>

        </div>


        <div class="settings-control-group">

          <button
            class="settings-choice ${
              settings.theme === "dark"
                ? "selected"
                : ""
            }"
            data-theme="dark"
          >
            Ciemny
          </button>

          <button
            class="settings-choice ${
              settings.theme === "light"
                ? "selected"
                : ""
            }"
            data-theme="light"
          >
            Jasny
          </button>

        </div>

      </div>


      <div class="settings-card">

        <div class="settings-card-info">

          <div class="settings-card-title">
            Kolor akcentu
          </div>

          <div class="settings-card-description">
            Główny kolor interfejsu
          </div>

        </div>


        <div class="accent-list">

          ${accents
            .map(
              (color) => `
                <button
                  class="accent-option ${
                    settings.accentColor.toLowerCase() ===
                    color.toLowerCase()
                      ? "selected"
                      : ""
                  }"
                  data-accent="${color}"
                  style="--accent-preview: ${color}"
                  aria-label="${color}"
                >
                </button>
              `
            )
            .join("")}

          <input
            type="color"
            id="custom-accent"
            class="custom-accent"
            value="${settings.accentColor}"
            title="Własny kolor"
          />

        </div>

      </div>


      <div class="settings-card">

        <div class="settings-card-info">

          <div class="settings-card-title">
            Efekty wizualne
          </div>

          <div class="settings-card-description">
            Animacje, przejścia i efekty interfejsu
          </div>

        </div>


        <label class="settings-switch">

          <input
            type="checkbox"
            id="visual-effects"
            ${
              settings.visualEffects
                ? "checked"
                : ""
            }
          />

          <span class="settings-switch-track">
          </span>

        </label>

      </div>


      <div class="settings-card">

        <div class="settings-card-info">

          <div class="settings-card-title">
            Poświata kursora
          </div>

          <div class="settings-card-description">
            Delikatne światło podążające za kursorem
          </div>

        </div>


        <label class="settings-switch">

          <input
            type="checkbox"
            id="cursor-glow"
            ${
              settings.cursorGlow
                ? "checked"
                : ""
            }
          />

          <span class="settings-switch-track">
          </span>

        </label>

      </div>

    </div>
  `;
}

function renderGeneral(
  settings: PulseSettings
) {
  return `
    <div class="settings-section">

      <div class="settings-section-title">

        <h2>Ogólne</h2>

        <p>
          Podstawowe zachowanie Pulse
        </p>

      </div>


      <div class="settings-card">

        <div class="settings-card-info">

          <div class="settings-card-title">
            Strona startowa
          </div>

          <div class="settings-card-description">
            Widok otwierany przy uruchomieniu Pulse
          </div>

        </div>


        <select
          class="settings-select"
          id="start-page"
        >

          <option
            value="system"
            ${
              settings.startPage === "system"
                ? "selected"
                : ""
            }
          >
            System
          </option>

          <option
            value="weather"
            ${
              settings.startPage === "weather"
                ? "selected"
                : ""
            }
          >
            Pogoda
          </option>

          <option
            value="notes"
            ${
              settings.startPage === "notes"
                ? "selected"
                : ""
            }
          >
            Notatki
          </option>

          <option
            value="calendar"
            ${
              settings.startPage === "calendar"
                ? "selected"
                : ""
            }
          >
            Kalendarz
          </option>

        </select>

      </div>


      <div class="settings-card">

        <div class="settings-card-info">

          <div class="settings-card-title">
            Reset ustawień
          </div>

          <div class="settings-card-description">
            Przywróć ustawienia domyślne Pulse
          </div>

        </div>


        <button
          class="settings-secondary-button"
          id="reset-settings"
        >
          Przywróć
        </button>

      </div>

    </div>
  `;
}

function renderSystem(
  settings: PulseSettings
) {
  return `
    <div class="settings-section">

      <div class="settings-section-title">

        <h2>System</h2>

        <p>
          Monitorowanie podzespołów
        </p>

      </div>


      <div class="settings-card">

        <div class="settings-card-info">

          <div class="settings-card-title">
            Odświeżanie podzespołów
          </div>

          <div class="settings-card-description">
            CPU, GPU i RAM
          </div>

        </div>


        <select
          class="settings-select"
          id="system-refresh"
        >

          <option
            value="1000"
            ${
              settings.systemRefreshInterval === 1000
                ? "selected"
                : ""
            }
          >
            1 sekunda
          </option>

          <option
            value="3000"
            ${
              settings.systemRefreshInterval === 3000
                ? "selected"
                : ""
            }
          >
            3 sekundy
          </option>

          <option
            value="5000"
            ${
              settings.systemRefreshInterval === 5000
                ? "selected"
                : ""
            }
          >
            5 sekund
          </option>

        </select>

      </div>


      <div class="settings-card">

        <div class="settings-card-info">

          <div class="settings-card-title">
            Odświeżanie dysków
          </div>

          <div class="settings-card-description">
            Częstotliwość aktualizacji danych dysków
          </div>

        </div>


        <select
          class="settings-select"
          id="disk-refresh"
        >

          <option
            value="10000"
            ${
              settings.diskRefreshInterval === 10000
                ? "selected"
                : ""
            }
          >
            10 sekund
          </option>

          <option
            value="15000"
            ${
              settings.diskRefreshInterval === 15000
                ? "selected"
                : ""
            }
          >
            15 sekund
          </option>

          <option
            value="30000"
            ${
              settings.diskRefreshInterval === 30000
                ? "selected"
                : ""
            }
          >
            30 sekund
          </option>

        </select>

      </div>

    </div>
  `;
}

function renderNotifications() {
  return `
    <div class="settings-section">

      <div class="settings-section-title">

        <h2>Powiadomienia</h2>

        <p>
          Ustawienia przypomnień i komunikatów
        </p>

      </div>


      <div class="settings-empty">
        Ustawienia powiadomień dodamy w kolejnym kroku.
      </div>

    </div>
  `;
}

function renderAbout() {
  return `
    <div class="settings-section">

      <div class="settings-section-title">

        <h2>O Pulse</h2>

        <p>
          Informacje o aplikacji
        </p>

      </div>


      <div class="settings-card">

        <div class="settings-card-info">

          <div class="settings-card-title">
            Pulse
          </div>

          <div class="settings-card-description">
            Smart Dashboard
          </div>

        </div>

      </div>

    </div>
  `;
}

function setupSettings() {
  document
    .querySelectorAll<HTMLElement>(
      "[data-settings-section]"
    )
    .forEach((button) => {
      button.addEventListener("click", () => {
        const section =
          button.dataset.settingsSection;

        if (!section) return;

        activeSection = section;

        renderSettings();
        setupSettings();
      });
    });


  document
    .querySelectorAll<HTMLElement>(
      "[data-theme]"
    )
    .forEach((button) => {
      button.addEventListener("click", () => {
        const theme =
          button.dataset.theme as PulseTheme;

        saveSettings({
          theme,
        });

        renderSettings();
        setupSettings();
      });
    });


  document
    .querySelectorAll<HTMLElement>(
      "[data-accent]"
    )
    .forEach((button) => {
      button.addEventListener("click", () => {
        const accent =
          button.dataset.accent;

        if (!accent) return;

        saveSettings({
          accentColor: accent,
        });

        renderSettings();
        setupSettings();
      });
    });


  document
    .getElementById("custom-accent")
    ?.addEventListener("input", (event) => {
      const input =
        event.currentTarget as HTMLInputElement;

      saveSettings({
        accentColor: input.value,
      });
    });


  document
    .getElementById("visual-effects")
    ?.addEventListener("change", (event) => {
      const input =
        event.currentTarget as HTMLInputElement;

      saveSettings({
        visualEffects: input.checked,
      });
    });


  document
    .getElementById("cursor-glow")
    ?.addEventListener("change", (event) => {
      const input =
        event.currentTarget as HTMLInputElement;

      saveSettings({
        cursorGlow: input.checked,
      });
    });


  document
    .getElementById("start-page")
    ?.addEventListener("change", (event) => {
      const select =
        event.currentTarget as HTMLSelectElement;

      saveSettings({
        startPage:
          select.value as StartPage,
      });
    });


  document
    .getElementById("system-refresh")
    ?.addEventListener("change", (event) => {
      const select =
        event.currentTarget as HTMLSelectElement;

      saveSettings({
        systemRefreshInterval:
          Number(select.value),
      });
    });


  document
    .getElementById("disk-refresh")
    ?.addEventListener("change", (event) => {
      const select =
        event.currentTarget as HTMLSelectElement;

      saveSettings({
        diskRefreshInterval:
          Number(select.value),
      });
    });


  document
    .getElementById("reset-settings")
    ?.addEventListener("click", () => {
      resetSettings();

      renderSettings();
      setupSettings();
    });
}