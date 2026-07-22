import type { CalendarEvent } from "../storage";

export function openCalendarEditor(
  date: string,
  onSave: (event: CalendarEvent) => void,
) {
  const overlay = document.createElement("div");

  overlay.className = "calendar-overlay";

  overlay.innerHTML = `


<div class="calendar-editor">


<div class="calendar-editor-header">


<h2>
Nowe wydarzenie
</h2>


<button id="calendar-close">

×

</button>


</div>



<input 
id="event-title"
placeholder="Nazwa wydarzenia"
/>



<input 
id="event-time"
type="time"
/>



<textarea
id="event-description"
placeholder="Opis"
></textarea>




<button id="event-save">

Zapisz

</button>


</div>


`;

  document.body.appendChild(overlay);

  document
    .getElementById("calendar-close")
    ?.addEventListener("click", () => overlay.remove());

  document.getElementById("event-save")?.addEventListener("click", () => {
    const title = (document.getElementById("event-title") as HTMLInputElement)
      .value;

    const time = (document.getElementById("event-time") as HTMLInputElement)
      .value;

    const description = (
      document.getElementById("event-description") as HTMLTextAreaElement
    ).value;

    const event: CalendarEvent = {
      id: crypto.randomUUID(),

      title,

      description,

      date,

      time,

      createdAt: new Date().toISOString(),
    };

    onSave(event);

    overlay.remove();
  });
}
