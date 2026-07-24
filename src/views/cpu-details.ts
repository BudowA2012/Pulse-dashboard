import { invoke } from "@tauri-apps/api/core";

interface CpuInfo {
  usage: number;

  name: string;

  physical_cores: number;

  logical_threads: number;

  frequency: number;

  average_frequency: number;
}

export async function showCpuDetails() {
  const content = document.getElementById("content");

  if (!content) return;

  content.innerHTML = `


<div class="details-page">



<button id="back-system" class="details-back">

← System

</button>




<div class="widget cpu-details-widget">



<h2>

🖥 CPU Details

</h2>




<div class="details-grid">





<div class="detail-card">

<div class="detail-title">

Model

</div>


<div class="detail-value" id="cpu-name">

--

</div>

</div>







<div class="detail-card">

<div class="detail-title">

Użycie

</div>


<div class="detail-value" id="cpu-usage">

--

</div>

</div>







<div class="detail-card">

<div class="detail-title">

Rdzenie fizyczne

</div>


<div class="detail-value" id="cpu-cores">

--

</div>

</div>







<div class="detail-card">

<div class="detail-title">

Wątki logiczne

</div>


<div class="detail-value" id="cpu-threads">

--

</div>

</div>







<div class="detail-card">

<div class="detail-title">

Aktualne taktowanie

</div>


<div class="detail-value" id="cpu-frequency">

--

</div>

</div>







<div class="detail-card">

<div class="detail-title">

Średnie taktowanie

</div>


<div class="detail-value" id="cpu-average-frequency">

--

</div>

</div>






</div>



</div>




</div>


`;

  try {
    const cpu = await invoke<CpuInfo>("get_cpu_info");

    document.getElementById("cpu-name")!.textContent = cpu.name;

    document.getElementById("cpu-usage")!.textContent =
      cpu.usage.toFixed(1) + " %";

    document.getElementById("cpu-cores")!.textContent =
      cpu.physical_cores.toString();

    document.getElementById("cpu-threads")!.textContent =
      cpu.logical_threads.toString();

    document.getElementById("cpu-frequency")!.textContent =
      (cpu.frequency / 1000).toFixed(2) + " GHz";

    document.getElementById("cpu-average-frequency")!.textContent =
      (cpu.average_frequency / 1000).toFixed(2) + " GHz";
  } catch (error) {
    console.error("CPU info error:", error);
  }

  document.getElementById("back-system")?.addEventListener("click", () => {
    // wracamy do systemu

    location.reload();
  });
}
