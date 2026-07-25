import { invoke } from "@tauri-apps/api/core";

interface GpuInfo {
  name: string;

  usage: number;

  temperature: number;

  memory_used: number;

  memory_total: number;

  graphics_clock: number;

  memory_clock: number;

  power_usage: number;

  power_limit: number;
}

export async function showGpuDetails() {
  const content = document.getElementById("content");

  if (!content) return;

  content.innerHTML = `


<div class="details-page">



<button
id="back-system"
class="details-back"
>

← System

</button>





<div class="widget gpu-details-widget">



<h2>

🎮 GPU Details

</h2>





<div class="details-grid">





<div class="detail-card">

<div class="detail-title">

Model

</div>


<div 
class="detail-value"
id="gpu-name"
>

--

</div>

</div>







<div class="detail-card">

<div class="detail-title">

Użycie

</div>


<div 
class="detail-value"
id="gpu-usage"
>

--

</div>

</div>







<div class="detail-card">

<div class="detail-title">

Temperatura

</div>


<div 
class="detail-value"
id="gpu-temp"
>

--

</div>

</div>







<div class="detail-card">

<div class="detail-title">

VRAM

</div>


<div 
class="detail-value"
id="gpu-memory"
>

--

</div>

</div>







<div class="detail-card">

<div class="detail-title">

Taktowanie rdzenia

</div>


<div 
class="detail-value"
id="gpu-clock"
>

--

</div>

</div>







<div class="detail-card">

<div class="detail-title">

Taktowanie pamięci

</div>


<div 
class="detail-value"
id="gpu-memory-clock"
>

--

</div>

</div>







<div class="detail-card">

<div class="detail-title">

Pobór mocy

</div>


<div 
class="detail-value"
id="gpu-power"
>

--

</div>

</div>







<div class="detail-card">

<div class="detail-title">

Limit mocy

</div>


<div 
class="detail-value"
id="gpu-power-limit"
>

--

</div>

</div>






</div>




</div>



</div>


`;

  try {
    const gpu = await invoke<GpuInfo>("get_gpu_info");

    document.getElementById("gpu-name")!.textContent = gpu.name;

    document.getElementById("gpu-usage")!.textContent =
      gpu.usage.toFixed(1) + " %";

    document.getElementById("gpu-temp")!.textContent = gpu.temperature + " °C";

    document.getElementById("gpu-memory")!.textContent =
      (gpu.memory_used / 1024 / 1024).toFixed(0) +
      " MB / " +
      (gpu.memory_total / 1024 / 1024).toFixed(0) +
      " MB";

    document.getElementById("gpu-clock")!.textContent =
      gpu.graphics_clock + " MHz";

    document.getElementById("gpu-memory-clock")!.textContent =
      gpu.memory_clock + " MHz";

    document.getElementById("gpu-power")!.textContent = gpu.power_usage + " W";

    document.getElementById("gpu-power-limit")!.textContent =
      gpu.power_limit + " W";
  } catch (error) {
    console.error("GPU info error:", error);
  }

  document.getElementById("back-system")?.addEventListener("click", () => {
    location.reload();
  });
}
