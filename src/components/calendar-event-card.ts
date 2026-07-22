export interface CalendarEvent {
  id: string;

  title: string;

  description: string;

  date: string;

  time: string;

  createdAt: string;
}

export function calendarEventCard(event: CalendarEvent) {
  return `

<div class="calendar-event-card">


<div class="calendar-event-time">

${event.time}

</div>



<div class="calendar-event-title">

${event.title}

</div>


<div class="calendar-event-description">

${event.description}

</div>



</div>


`;
}
