import { CalendarDayCard } from "../components/calendar-day-card";

import {
  loadCalendarEvents,
  saveCalendarEvents,
} from "../services/calendar-storage";

import { openCalendarEditor } from "../components/calendar-editor";

import type { CalendarEvent } from "../storage";

import { removeCalendarEvent } from "../services/calendar-storage";

class CalendarWidget {
  private currentDate: Date;

  private events: CalendarEvent[] = [];

  constructor() {
    this.currentDate = new Date();
  }

  private bindDeleteButtons() {
    document.querySelectorAll(".calendar-delete-event").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");

        if (!id) return;

        removeCalendarEvent(id);

        this.events = loadCalendarEvents();

        this.renderCalendar();
      });
    });
  }

  render() {
    return `


<div class="calendar-widget">



<div class="calendar-top">



<button id="calendar-prev">

←

</button>




<h2 id="calendar-title">

</h2>




<button id="calendar-next">

→

</button>



</div>







<div class="calendar-weekdays">


<div>Pon</div>

<div>Wt</div>

<div>Śr</div>

<div>Czw</div>

<div>Pt</div>

<div>Sob</div>

<div>Nd</div>


</div>







<div 
class="calendar-grid"
id="calendar-grid">

</div>





</div>


`;
  }

  setup() {
    this.events = loadCalendarEvents();

    this.renderCalendar();

    this.bindMonthButtons();
    this.bindDeleteButtons();
  }

  private bindMonthButtons() {
    document.getElementById("calendar-prev")?.addEventListener("click", () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);

      this.renderCalendar();
    });

    document.getElementById("calendar-next")?.addEventListener("click", () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);

      this.renderCalendar();
    });
  }

  private renderCalendar() {
    const grid = document.getElementById("calendar-grid");

    const title = document.getElementById("calendar-title");

    if (!grid || !title) return;

    const year = this.currentDate.getFullYear();

    const month = this.currentDate.getMonth();

    const monthName = this.currentDate.toLocaleString("pl-PL", {
      month: "long",
      year: "numeric",
    });

    title.textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    grid.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const emptyDays = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < emptyDays; i++) {
      grid.innerHTML += `

<div class="calendar-empty">

</div>

`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

      const dayEvents = this.events.filter((event) => event.date === date);

      const card = new CalendarDayCard(day, dayEvents);

      grid.innerHTML += card.render();
    }

    this.bindDayButtons();
    this.bindDeleteButtons();
  }

  private bindDayButtons() {
    document.querySelectorAll(".calendar-add-event").forEach((button) => {
      button.addEventListener("click", () => {
        const day = button.getAttribute("data-day");

        if (!day) return;

        const date = `${this.currentDate.getFullYear()}-${String(this.currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        openCalendarEditor(date, (event) => {
          this.events.push(event);

          this.saveEvents();

          this.renderCalendar();
        });
      });
    });
  }

  private saveEvents() {
    saveCalendarEvents(this.events);
  }
}

export const calendarWidget = new CalendarWidget();
