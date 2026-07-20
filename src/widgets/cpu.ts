import { invoke } from "@tauri-apps/api/core";
import { Widget } from "./widget";
import { Chart } from "../services/charts";

class CpuWidget extends Widget {
  private chart: Chart;

  constructor() {
    super("cpu", "🖥 CPU");

    this.chart = new Chart("cpu-chart");
  }

  render(): string {
    return `

        <div class="widget">

            <h2>
            ${this.title}
            </h2>


            <div
            class="value"
            id="cpu-value"
            >
            --
            </div>


            <div
            class="chart"
            id="cpu-chart"
            >
            </div>


        </div>

        `;
  }

  async update() {
    const usage = await invoke<number>("get_cpu_usage").catch(() => 0);

    const value = document.getElementById("cpu-value");

    if (value) {
      value.textContent = usage.toFixed(1) + " %";
    }

    this.chart.add(usage);
  }
}

export const cpuWidget = new CpuWidget();
