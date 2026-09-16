import { invoke } from "@tauri-apps/api/core";

interface DiskInfo {
  name: string;
  mount: string;
  total_space: number;
  available_space: number;
  file_system: string;
  disk_type: string;
}

let diskInterval:
  number | undefined;


function formatSize(
  bytes: number
) {
  const gb =
    bytes /
    1024 /
    1024 /
    1024;

  if (gb >= 1000) {
    return (
      (gb / 1024).toFixed(2) +
      " TB"
    );
  }

  return gb.toFixed(1) + " GB";
}


export async function showDiskDetails(
  mount: string
) {
  const content =
    document.getElementById(
      "content"
    );

  if (!content) return;


  if (diskInterval) {
    clearInterval(
      diskInterval
    );

    diskInterval =
      undefined;
  }


  content.innerHTML = `
    <div class="details-page">

      <button
        id="back-system"
        class="details-back"
      >
        <span class="details-back-arrow">
          ←
        </span>

        System
      </button>


      <div class="widget disk-details-widget">

        <h2>
          Disk ${mount}
        </h2>


        <div class="details-grid">

          <div class="detail-card">

            <div class="detail-title">
              Nazwa
            </div>

            <div
              class="detail-value"
              id="disk-detail-name"
            >
              --
            </div>

          </div>


          <div class="detail-card">

            <div class="detail-title">
              Dysk
            </div>

            <div
              class="detail-value"
              id="disk-detail-mount"
            >
              --
            </div>

          </div>


          <div class="detail-card">

            <div class="detail-title">
              Pojemność
            </div>

            <div
              class="detail-value"
              id="disk-detail-total"
            >
              --
            </div>

          </div>


          <div class="detail-card">

            <div class="detail-title">
              Zajęte
            </div>

            <div
              class="detail-value"
              id="disk-detail-used"
            >
              --
            </div>

          </div>


          <div class="detail-card">

            <div class="detail-title">
              Wolne
            </div>

            <div
              class="detail-value"
              id="disk-detail-free"
            >
              --
            </div>

          </div>


          <div class="detail-card">

            <div class="detail-title">
              Zapełnienie
            </div>

            <div
              class="detail-value"
              id="disk-detail-usage"
            >
              --
            </div>

          </div>


          <div class="detail-card">

            <div class="detail-title">
              System plików
            </div>

            <div
              class="detail-value"
              id="disk-detail-filesystem"
            >
              --
            </div>

          </div>


          <div class="detail-card">

            <div class="detail-title">
              Typ
            </div>

            <div
              class="detail-value"
              id="disk-detail-type"
            >
              --
            </div>

          </div>

        </div>

      </div>

    </div>
  `;


  async function updateDisk() {
    try {
      const disks =
        await invoke<DiskInfo[]>(
          "get_disks"
        );

      const disk =
        disks.find(
          (item) =>
            item.mount === mount
        );

      if (!disk) return;


      const used =
        disk.total_space -
        disk.available_space;


      const usage =
        disk.total_space > 0
          ? (
              used /
              disk.total_space
            ) * 100
          : 0;


      const name =
        document.getElementById(
          "disk-detail-name"
        );

      if (!name) return;


      name.textContent =
        disk.name ||
        "Unknown disk";


      document.getElementById(
        "disk-detail-mount"
      )!.textContent =
        disk.mount;


      document.getElementById(
        "disk-detail-total"
      )!.textContent =
        formatSize(
          disk.total_space
        );


      document.getElementById(
        "disk-detail-used"
      )!.textContent =
        formatSize(used);


      document.getElementById(
        "disk-detail-free"
      )!.textContent =
        formatSize(
          disk.available_space
        );


      document.getElementById(
        "disk-detail-usage"
      )!.textContent =
        usage.toFixed(1) + " %";


      document.getElementById(
        "disk-detail-filesystem"
      )!.textContent =
        disk.file_system ||
        "Unknown";


      document.getElementById(
        "disk-detail-type"
      )!.textContent =
        disk.disk_type ||
        "Unknown";

    } catch (error) {
      console.error(
        "Disk details error:",
        error
      );
    }
  }


  await updateDisk();


  diskInterval =
    window.setInterval(
      updateDisk,
      2000
    );


  document
    .getElementById(
      "back-system"
    )
    ?.addEventListener(
      "click",
      () => {
        if (diskInterval) {
          clearInterval(
            diskInterval
          );

          diskInterval =
            undefined;
        }

        window.dispatchEvent(
          new Event(
            "show-system"
          )
        );
      }
    );
}