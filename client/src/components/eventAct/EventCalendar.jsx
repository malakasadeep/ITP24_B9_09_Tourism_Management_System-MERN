import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function EventCalendarPage() {
  const [events, setEvents] = useState([]);

  useEffect(async () => {
    const res = await fetch(`/api/events/`);
    const data = await res.json();
    const formattedEvents = data.map((event) => {
      const backgroundColor = event.type === "Activity" ? "#FF0000" : "#00FF00";
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
