import { invoke } from "@tauri-apps/api/core";
import { showDiskDetails } from "../views/disk-details";

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
    const disks = await invoke<DiskInfo[]>("get_disks").catch(() => []);

    const dashboard = document.querySelector(".system-dashboard");

    if (!dashboard) return;

    document.querySelectorAll(".disk-widget").forEach((el) => el.remove());

    dashboard.insertAdjacentHTML(
      "beforeend",

      disks
        .map((disk) => {
          return `


<div 
class="widget disk-widget system-clickable"
data-disk="${disk.mount}"
>


<h2>

💽 ${disk.mount}

</h2>



<div class="disk-name">

${disk.name || "Unknown disk"}

</div>



<div class="disk-size">

${this.formatSize(disk.total_space)}

</div>



</div>


`;
        })
        .join(""),
    );

    this.setup();
  },

  setup() {
    document.querySelectorAll(".disk-widget").forEach((widget) => {
      widget.addEventListener("click", () => {
        const mount = widget.getAttribute("data-disk");

        if (mount) {
          showDiskDetails(mount);
        }
      });
    });
  },

  formatSize(bytes: number) {
    const gb = bytes / 1024 / 1024 / 1024;

    if (gb > 1000) {
      return (gb / 1024).toFixed(2) + " TB";
    }

    return gb.toFixed(1) + " GB";
  },
};
