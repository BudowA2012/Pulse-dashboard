import { invoke } from "@tauri-apps/api/core";

interface DiskInfo {
  name: string;
  mount: string;
  total_space: number;
}

export const diskWidget = {
  disks: [] as DiskInfo[],

  render() {
    return "";
  },

  async update() {
    const disks = await invoke<DiskInfo[]>("get_disks");

    const dashboard = document.querySelector(".system-dashboard");

    if (!dashboard) return;

    // usuń stare dyski przy odświeżaniu
    document.querySelectorAll(".disk-widget").forEach((el) => {
      el.remove();
    });

    dashboard.insertAdjacentHTML(
      "beforeend",

      disks
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
        .join(""),
    );
  },

  formatSize(bytes: number) {
    const gb = bytes / 1024 / 1024 / 1024;

    if (gb > 1000) {
      return (gb / 1024).toFixed(2) + " TB";
    }

    return gb.toFixed(1) + " GB";
  },
};
