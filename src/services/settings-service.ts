export type PulseTheme =
  | "dark"
  | "light";

export type StartPage =
  | "system"
  | "weather"
  | "notes"
  | "calendar";


export interface PulseSettings {
  theme: PulseTheme;

  accentColor: string;

  visualEffects: boolean;

  cursorGlow: boolean;

  startPage: StartPage;

  systemRefreshInterval: number;

  diskRefreshInterval: number;
}


const STORAGE_KEY =
  "pulse-settings";


const defaultSettings: PulseSettings = {
  theme: "dark",

  accentColor: "#7aa7ff",

  visualEffects: true,

  cursorGlow: true,

  startPage: "system",

  systemRefreshInterval: 3000,

  diskRefreshInterval: 15000,
};


export function getSettings():
PulseSettings {
  try {
    const saved =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (!saved) {
      return {
        ...defaultSettings
      };
    }

    const parsed =
      JSON.parse(saved);

    return {
      ...defaultSettings,
      ...parsed,
    };
  } catch {
    return {
      ...defaultSettings
    };
  }
}


export function saveSettings(
  newSettings: Partial<PulseSettings>
) {
  const current =
    getSettings();

  const updated:
  PulseSettings = {
    ...current,
    ...newSettings,
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );

  applySettings(updated);

  window.dispatchEvent(
    new CustomEvent(
      "pulse-settings-changed",
      {
        detail: updated,
      }
    )
  );

  return updated;
}


export function applySettings(
  settings:
  PulseSettings =
  getSettings()
) {
  const root =
    document.documentElement;

  root.dataset.pulseTheme =
    settings.theme;

  root.style.setProperty(
    "--pulse-accent",
    settings.accentColor
  );

  if (settings.visualEffects) {
    root.classList.remove(
      "pulse-effects-disabled"
    );
  } else {
    root.classList.add(
      "pulse-effects-disabled"
    );
  }

  root.classList.toggle(
    "pulse-cursor-glow-disabled",
    !settings.cursorGlow
  );
}


export function resetSettings() {
  localStorage.removeItem(
    STORAGE_KEY
  );

  applySettings(
    defaultSettings
  );

  window.dispatchEvent(
    new CustomEvent(
      "pulse-settings-changed",
      {
        detail:
          defaultSettings,
      }
    )
  );

  return {
    ...defaultSettings
  };
}