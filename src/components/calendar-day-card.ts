import type { CalendarEvent } from "../storage";

export class CalendarDayCard {
  constructor(
    private day: number,
    private events: CalendarEvent[],
  ) {}

  render() {
    return `


<div 
class="calendar-day-card"
data-day="${this.day}"
>


<div class="calendar-day-header">


<div class="calendar-day-number">

${this.day}

</div>



<button 
class="calendar-add-event"
data-day="${this.day}">
+
</button>


</div>





<div class="calendar-events">


${this.events
  .map(
    (event) => `

<div class="calendar-mini-event">

${event.title}

</div>

`,
  )
  .join("")}


</div>



</div>


`;
  }
}
