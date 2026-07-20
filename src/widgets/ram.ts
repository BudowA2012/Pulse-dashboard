import { invoke } from "@tauri-apps/api/core";
import { Widget } from "./widget";
import { Chart } from "../services/charts";

class RamWidget extends Widget {
  private chart: Chart;

  constructor() {
    super("ram", "💾 RAM");

    this.chart = new Chart("ram-chart");
  }

  render(): string {
    return `

        <div class="widget">

            <h2>
            ${this.title}
            </h2>


            <div
            class="value"
            id="ram-value"
            >
            --
            </div>


            <div
            class="chart"
            id="ram-chart"
            >
            </div>


        </div>

        `;
  }

  async update() {
    const usage = await invoke<number>("get_ram_usage").catch(() => 0);

    const value = document.getElementById("ram-value");

    if (value) {
      value.textContent = usage.toFixed(1) + " %";
    }

    this.chart.add(usage);
  }
}

export const ramWidget = new RamWidget();
