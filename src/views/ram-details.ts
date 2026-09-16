import { invoke } from "@tauri-apps/api/core";

interface RamInfo {
  total: number;
  used: number;
  available: number;
  usage: number;
}

let ramInterval: number | undefined;

function bytesToGb(bytes: number) {
  return (bytes / 1024 / 1024 / 1024).toFixed(1);
}

export async function showRamDetails() {
  const content = document.getElementById("content");

  if (!content) return;

  if (ramInterval) {
    clearInterval(ramInterval);
    ramInterval = undefined;
  }

  content.innerHTML = `
    <div class="details-page">

      <button
        id="back-system"
        class="details-back"
      >
        <span class="details-back-arrow">←</span>
        System
      </button>

      <div class="widget ram-details-widget">

        <h2>RAM Details</h2>

        <div class="details-grid">

          <div class="detail-card">
            <div class="detail-title">Użycie</div>
            <div class="detail-value" id="ram-usage">--</div>
          </div>

          <div class="detail-card">
            <div class="detail-title">Użyte</div>
            <div class="detail-value" id="ram-used">--</div>
          </div>

          <div class="detail-card">
            <div class="detail-title">Dostępne</div>
            <div class="detail-value" id="ram-available">--</div>
          </div>

          <div class="detail-card">
            <div class="detail-title">Całkowita pamięć</div>
            <div class="detail-value" id="ram-total">--</div>
          </div>

          <div class="detail-card">
            <div class="detail-title">Taktowanie</div>
            <div class="detail-value" id="ram-clock">--</div>
          </div>

        </div>

      </div>

    </div>
  `;

  async function updateRam() {
    try {
      const ram = await invoke<RamInfo>("get_ram_info");

      const usage = document.getElementById("ram-usage");
      const used = document.getElementById("ram-used");
      const available = document.getElementById("ram-available");
      const total = document.getElementById("ram-total");

      if (!usage) return;

      usage.textContent = ram.usage.toFixed(1) + " %";

      if (used) {
        used.textContent = bytesToGb(ram.used) + " GB";
      }

      if (available) {
        available.textContent =
          bytesToGb(ram.available) + " GB";
      }

      if (total) {
        total.textContent =
          bytesToGb(ram.total) + " GB";
      }
    } catch (error) {
      console.error("RAM info update error:", error);
    }
  }

  async function loadRamClock() {
    try {
      const clock = await invoke<number>("get_ram_clock");

      const clockElement =
        document.getElementById("ram-clock");

      if (!clockElement) return;

      if (clock > 0) {
        clockElement.textContent =
          clock.toString() + " MHz";
      } else {
        clockElement.textContent =
          "Brak danych";
      }
    } catch (error) {
      console.error("RAM clock error:", error);
    }
  }

  await updateRam();

  loadRamClock();

  ramInterval = window.setInterval(
    updateRam,
    1000
  );

  document
    .getElementById("back-system")
    ?.addEventListener("click", () => {
      if (ramInterval) {
        clearInterval(ramInterval);
        ramInterval = undefined;
      }

      location.reload();
    });
}