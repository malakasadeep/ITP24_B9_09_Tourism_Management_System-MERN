import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";//plugin for FullCalendar that provides a basic "grid" view.

function EventCalendarPage() {
  const [events, setEvents] = useState([]);// store the events fetched from the API.

  useEffect(async () => {
    const res = await fetch(`/api/events/`);// fetches events data from the API
    const data = await res.json();
    const formattedEvents = data.map((event) => {
      const backgroundColor = event.type === "Activity" ? "#FF0000" : "#00FF00";//if event type is activity then backgroundColor is green. if not red.
      const textColor = event.type === "Activity" ? "#FFFFFF" : "#000000";
      const borderColor = backgroundColor;
      return {
        ...event,
        start: event.date.split("T")[0],
        backgroundColor,
        borderColor,
        allDay: true,
        textColor,
      };
    });
    setEvents(formattedEvents);
  }, []);

  return (
    <div className="flex w-full justify-center items-center">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        height="auto"
        style={{ width: "100%" }}
      />
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default EventCalendarPage;
