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
    setEvents(formattedEvents);//The formatted events are set in the events state
  }, []);

  return (
    <div className="flex w-full justify-center items-center">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"//sets the initial view of the calendar
        weekends={true}//indicates whether weekends should be displayed.
        events={events}//passes the array of events to be displayed on the calendar
        eventContent={renderEventContent}//specifies a custom function (renderEventContent) to render the content of each event.
        height="auto"
        style={{ width: "100%" }}
      />
    </div>
  );
}

function renderEventContent(eventInfo) {//This function takes an eventInfo object as input, which contains information about the event being rendered.
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default EventCalendarPage;
