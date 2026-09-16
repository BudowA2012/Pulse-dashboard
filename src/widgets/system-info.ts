import { invoke } from "@tauri-apps/api/core";

interface SystemInfo {
  host_name: string;
  os_name: string;
  os_version: string;
  kernel_version: string;
  architecture: string;
  uptime: number;
}

let uptimeInterval:
  number | undefined;


function formatUptime(
  seconds: number
) {
  const days =
    Math.floor(
      seconds / 86400
    );

  const hours =
    Math.floor(
      (seconds % 86400) /
      3600
    );

  const minutes =
    Math.floor(
      (seconds % 3600) /
      60
    );

  const secs =
    Math.floor(
      seconds % 60
    );


  if (days > 0) {
    return (
      `${days} d ` +
      `${hours} h ` +
      `${minutes} min`
    );
  }


  return (
    `${hours} h ` +
    `${minutes} min ` +
    `${secs} s`
  );
}


export const systemInfoWidget = {

  render() {
    return `
      <div
        class="widget system-info-widget"
        id="system-info-widget"
      >

        <h2>
          System info
        </h2>


        <div class="system-info-list">

          <div class="system-info-row">

            <span>
              Uptime
            </span>

            <strong
              id="system-uptime"
            >
              --
            </strong>

          </div>


          <div class="system-info-row">

            <span>
              Komputer
            </span>

            <strong
              id="system-hostname"
            >
              --
            </strong>

          </div>


          <div class="system-info-row">

            <span>
              System
            </span>

            <strong
              id="system-os"
            >
              --
            </strong>

          </div>


          <div class="system-info-row">

            <span>
              Architektura
            </span>

            <strong
              id="system-architecture"
            >
              --
            </strong>

          </div>

        </div>

      </div>
    `;
  },


  async setup() {
    if (uptimeInterval) {
      clearInterval(
        uptimeInterval
      );

      uptimeInterval =
        undefined;
    }


    try {
      const info =
        await invoke<SystemInfo>(
          "get_system_info"
        );


      const hostname =
        document.getElementById(
          "system-hostname"
        );

      const os =
        document.getElementById(
          "system-os"
        );

      const architecture =
        document.getElementById(
          "system-architecture"
        );

      const uptime =
        document.getElementById(
          "system-uptime"
        );


      if (!hostname) return;


      hostname.textContent =
        info.host_name;


      if (os) {
        os.textContent =
          info.os_version ||
          info.os_name;
      }


      if (architecture) {
        architecture.textContent =
          info.architecture;
      }


      let currentUptime =
        info.uptime;


      if (uptime) {
        uptime.textContent =
          formatUptime(
            currentUptime
          );
      }


      uptimeInterval =
        window.setInterval(
          () => {
            const element =
              document.getElementById(
                "system-uptime"
              );

            if (!element) {
              if (
                uptimeInterval
              ) {
                clearInterval(
                  uptimeInterval
                );

                uptimeInterval =
                  undefined;
              }

              return;
            }


            currentUptime++;


            element.textContent =
              formatUptime(
                currentUptime
              );

          },
          1000
        );

    } catch (error) {
      console.error(
        "System info error:",
        error
      );
    }
  },
};