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

<label class="event-label">
Przypomnienie
</label>


<select id="event-reminder">

<option value="0">
Brak
</option>

<option value="5">
5 minut wcześniej
</option>

<option value="10" selected>
10 minut wcześniej
</option>

<option value="15">
15 minut wcześniej
</option>

<option value="30">
30 minut wcześniej
</option>

<option value="60">
60 minut wcześniej
</option>

</select>

<label>

Przypomnienie

</label>

<select id="event-reminder">

<option value="0">

Brak

</option>

<option value="5">

5 minut wcześniej

</option>

<option value="10" selected>

10 minut wcześniej

</option>

<option value="15">

15 minut wcześniej

</option>

<option value="30">

30 minut wcześniej

</option>

<option value="60">

1 godzina wcześniej

</option>

</select>


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

    const reminder = Number(
      (document.getElementById("event-reminder") as HTMLSelectElement).value,
    );

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
      reminder,

      notified: false,
      lastReminder: null,
    };

    onSave(event);

    overlay.remove();
  });
}
