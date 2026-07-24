import { invoke } from "@tauri-apps/api/core";

interface DiskInfo {
  name: string;

  mount: string;

  total_space: number;
}

export const diskWidget = {
  render() {
    return `

      <div id="disk-container">

      </div>

    `;
  },

  async update() {
    const disks = await invoke<DiskInfo[]>("get_disks");

    const container = document.getElementById("disk-container");

    if (!container) return;

    container.innerHTML = disks
      .map(
        (disk) => `


      <div class="widget disk-widget">


        <div class="widget-title">

          💽 ${disk.mount}

        </div>



        <div class="disk-name">

          ${disk.name || "Unknown disk"}

        </div>



        <div class="disk-size">

          ${this.formatSize(disk.total_space)}

        </div>


      </div>


    `,
      )
      .join("");
  },

  formatSize(bytes: number) {
    const gb = bytes / 1024 / 1024 / 1024;

    if (gb > 1000) {
      return (gb / 1024).toFixed(2) + " TB";
    }

    return gb.toFixed(1) + " GB";
  },
};
