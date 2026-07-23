import type { CalendarEvent } from "../storage";

export class CalendarDayCard {
  constructor(
    private day: number,

    private events: CalendarEvent[],

    private isToday: boolean = false,
  ) {}

  render() {
    return `



<div class="calendar-day-card ${this.isToday ? "today" : ""}">



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

<div 
class="calendar-mini-event"
data-event-id="${event.id}">



<div class="calendar-event-info">



<div class="calendar-event-title">

${event.title}

</div>



<div class="calendar-event-time">

${event.time}

</div>



</div>





<button 
class="calendar-delete-event"
data-id="${event.id}">

×

</button>




</div>


`,
  )

  .join("")}






</div>




</div>



`;
  }
}
