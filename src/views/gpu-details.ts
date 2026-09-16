import { invoke } from "@tauri-apps/api/core";

interface GpuInfo {
  name: string;
  usage: number;
  temperature: number;
  memory_used: number;
  memory_total: number;
  graphics_clock: number;
  memory_clock: number;
}

let gpuInterval: number | undefined;

export async function showGpuDetails() {
  const content = document.getElementById("content");

  if (!content) return;

  if (gpuInterval) {
    clearInterval(gpuInterval);
    gpuInterval = undefined;
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

      <div class="widget gpu-details-widget">

        <h2>🎮 GPU Details</h2>

        <div class="details-grid">

          <div class="detail-card">
            <div class="detail-title">Model</div>
            <div class="detail-value" id="gpu-name">--</div>
          </div>

          <div class="detail-card">
            <div class="detail-title">Użycie</div>
            <div class="detail-value" id="gpu-usage">--</div>
          </div>

          <div class="detail-card">
            <div class="detail-title">Temperatura</div>
            <div class="detail-value" id="gpu-temp">--</div>
          </div>

          <div class="detail-card">
            <div class="detail-title">VRAM użyte</div>
            <div class="detail-value" id="gpu-memory-used">--</div>
          </div>

          <div class="detail-card">
            <div class="detail-title">VRAM całkowite</div>
            <div class="detail-value" id="gpu-memory-total">--</div>
          </div>

          <div class="detail-card">
            <div class="detail-title">GPU Clock</div>
            <div class="detail-value" id="gpu-clock">--</div>
          </div>

          <div class="detail-card">
            <div class="detail-title">Memory Clock</div>
            <div class="detail-value" id="gpu-memory-clock">--</div>
          </div>

        </div>

      </div>

    </div>
  `;

  async function updateGpu() {
    try {
      const gpu = await invoke<GpuInfo>("get_gpu_info");

      const name = document.getElementById("gpu-name");

      if (!name) return;

      name.textContent = gpu.name;

      const usage = document.getElementById("gpu-usage");
      const temp = document.getElementById("gpu-temp");
      const memoryUsed = document.getElementById("gpu-memory-used");
      const memoryTotal = document.getElementById("gpu-memory-total");
      const clock = document.getElementById("gpu-clock");
      const memoryClock = document.getElementById("gpu-memory-clock");

      if (usage) {
        usage.textContent = gpu.usage.toFixed(1) + " %";
      }

      if (temp) {
        temp.textContent = gpu.temperature + " °C";
      }

      if (memoryUsed) {
        memoryUsed.textContent =
          (gpu.memory_used / 1024 / 1024 / 1024).toFixed(1) + " GB";
      }

      if (memoryTotal) {
        memoryTotal.textContent =
          (gpu.memory_total / 1024 / 1024 / 1024).toFixed(1) + " GB";
      }

      if (clock) {
        clock.textContent = gpu.graphics_clock + " MHz";
      }

      if (memoryClock) {
        memoryClock.textContent = gpu.memory_clock + " MHz";
      }
    } catch (error) {
      console.error("GPU update error:", error);
    }
  }

  await updateGpu();

  gpuInterval = window.setInterval(updateGpu, 1000);

  document
    .getElementById("back-system")
    ?.addEventListener("click", () => {
      if (gpuInterval) {
        clearInterval(gpuInterval);
        gpuInterval = undefined;
      }

      location.reload();
    });
}