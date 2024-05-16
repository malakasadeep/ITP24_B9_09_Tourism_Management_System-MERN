import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function EventCalendarPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`/api/events/`);
      const data = await res.json();
      const formattedEvents = data.map((event) => {
        const backgroundColor =
          event.type === "Activity" ? "#10B981" : "#EF4444";
        const textColor = "#FFFFFF";
        return {
          ...event,
          start: event.date.split("T")[0],
          backgroundColor,
          textColor,
          borderColor: backgroundColor,
        };
      });
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleDateClick = (info) => {
    const clickedDateEvents = events.filter(
      (event) => event.start === info.dateStr
    );
    if (clickedDateEvents.length > 0) {
      alert(
        `Events on ${info.dateStr}:\n${clickedDateEvents
          .map((event) => event.title)
          .join("\n")}`
      );
    } else {
      alert(`No events on ${info.dateStr}`);
    }
  };

  return (
    <div className="flex justify-center items-center p-5">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        height="auto"
        dayMaxEventRows={3} // Maximum number of events displayed per day
        dayMaxEvents={true} // Display a "+n more" link when there are too many events
        dateClick={handleDateClick}
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        themeSystem="tailwind"
        slotMinTime="06:00:00" // Set minimum time in the day view
        slotMaxTime="22:00:00" // Set maximum time in the day view
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
        }}
        locales="en" // Set calendar locale to English
        locale="en" // Set calendar locale to English
        selectable={true} // Allow date selection
        selectMirror={true} // Display a mirror of the selection
        dayHeaderFormat={{ weekday: "short" }} // Display short weekday names
        firstDay={1} // Start week on Monday
        aspectRatio={1.5} // Aspect ratio of the calendar
        nowIndicator={true} // Show current time indicator
        slotEventOverlap={false} // Do not allow events to overlap in time
        allDaySlot={false} // Hide all-day slot
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
