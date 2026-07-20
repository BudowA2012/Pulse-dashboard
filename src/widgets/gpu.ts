import { invoke } from "@tauri-apps/api/core";
import { Widget } from "./widget";
import { Chart } from "../services/charts";

class GpuWidget extends Widget {
  private chart: Chart;

  constructor() {
    super("gpu", "🎮 GPU");

    this.chart = new Chart("gpu-chart");
  }

  render(): string {
    return `

        <div class="widget">

            <h2>
            ${this.title}
            </h2>


            <div
            class="value"
            id="gpu-value"
            >
            --
            </div>


            <div
            class="chart"
            id="gpu-chart"
            >
            </div>


        </div>

        `;
  }

  async update() {
    const usage = await invoke<number>("get_gpu_usage").catch(() => 0);

    const value = document.getElementById("gpu-value");

    if (value) {
      value.textContent = usage.toFixed(1) + " %";
    }

    this.chart.add(usage);
  }
}

export const gpuWidget = new GpuWidget();
