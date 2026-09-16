import { invoke } from "@tauri-apps/api/core";

interface CpuInfo {
  usage: number;
  name: string;
  physical_cores: number;
  logical_threads: number;
  frequency: number;
  average_frequency: number;
}

let cpuInterval: number | undefined;

export async function showCpuDetails() {
  const content = document.getElementById("content");

  if (!content) return;

  if (cpuInterval) {
    clearInterval(cpuInterval);
    cpuInterval = undefined;
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

      <div class="widget cpu-details-widget">

        <h2>CPU Details</h2>

        <div class="details-grid">

          <div class="detail-card">
            <div class="detail-title">Model</div>
            <div class="detail-value" id="cpu-name">--</div>
          </div>

          <div class="detail-card">
            <div class="detail-title">Użycie</div>
            <div class="detail-value" id="cpu-usage">--</div>
          </div>

          <div class="detail-card">
            <div class="detail-title">Rdzenie fizyczne</div>
            <div class="detail-value" id="cpu-cores">--</div>
          </div>

          <div class="detail-card">
            <div class="detail-title">Wątki logiczne</div>
            <div class="detail-value" id="cpu-threads">--</div>
          </div>

          <div class="detail-card">
            <div class="detail-title">Taktowanie</div>
            <div class="detail-value" id="cpu-frequency">--</div>
          </div>

          <div class="detail-card">
            <div class="detail-title">Średnie taktowanie</div>
            <div class="detail-value" id="cpu-average-frequency">--</div>
          </div>

        </div>

      </div>

    </div>
  `;

  async function updateCpu() {
    try {
      const cpu = await invoke<CpuInfo>("get_cpu_info");

      const name = document.getElementById("cpu-name");
      const usage = document.getElementById("cpu-usage");
      const cores = document.getElementById("cpu-cores");
      const threads = document.getElementById("cpu-threads");
      const frequency = document.getElementById("cpu-frequency");
      const averageFrequency = document.getElementById(
        "cpu-average-frequency"
      );

      if (!name) return;

      name.textContent = cpu.name;

      if (usage) {
        usage.textContent = cpu.usage.toFixed(1) + " %";
      }

      if (cores) {
        cores.textContent = cpu.physical_cores.toString();
      }

      if (threads) {
        threads.textContent = cpu.logical_threads.toString();
      }

      if (frequency) {
        frequency.textContent =
          (cpu.frequency / 1000).toFixed(2) + " GHz";
      }

      if (averageFrequency) {
        averageFrequency.textContent =
          (cpu.average_frequency / 1000).toFixed(2) + " GHz";
      }
    } catch (error) {
      console.error("CPU update error:", error);
    }
  }

  await updateCpu();

  cpuInterval = window.setInterval(updateCpu, 1000);

  document
    .getElementById("back-system")
    ?.addEventListener("click", () => {
      if (cpuInterval) {
        clearInterval(cpuInterval);
        cpuInterval = undefined;
      }

      location.reload();
    });
}