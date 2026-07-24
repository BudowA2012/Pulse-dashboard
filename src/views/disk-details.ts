export function showDiskDetails(name: string) {
  const content = document.getElementById("content");

  if (!content) return;

  content.innerHTML = `


<div class="system-details">


<button class="details-back" id="back-system">

← Powrót

</button>



<div class="widget">


<h1>

💽 Dysk ${name}

</h1>



<p>

Tutaj będą informacje o dysku

</p>


</div>


</div>


`;

  document.getElementById("back-system")?.addEventListener("click", () => {
    location.reload();
  });
}
