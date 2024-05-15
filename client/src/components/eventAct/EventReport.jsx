import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import jspdf from "jspdf";
import "jspdf-autotable";
import "../../assets/css/user/userList.css";

export default function EventReport({ events }) {
  function generatePDF(events) {
    const doc = new jspdf(); //Creates a new instance of jspdf, which represents a PDF document.
    const tableColumn = [
      //Defines an array tableColumn containing the column headers for the table in the PDF.
      "No",
      "Type",
      "Title",
      "Date",
      "Time",
      "Location",
      "Price",
      "Participants",
    ];
    const tableRows = []; //Initializes an empty array tableRows to store rows of data for the table.

    events
      .slice(0)
      .reverse()
      .map((events, index) => {
        const eventdata = [
          index + 1,
          events.type,
          events.title,
          events.date.split("T")[0],
          events.time,
          events.location,
          "$" + events.price,
          events.participants,
        ];
        tableRows.push(eventdata);
      });

    const date = Date().split(" "); // Gets the current date and formats it as a string (MM-DD-YYYY).
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    const logo = new Image();
    logo.src = "../../assets/img/Logo14.png";

    doc.setFontSize(28).setFont("Mooli", "bold").setTextColor(65, 164, 255);
    doc.text("TourCraft", 80, 15);

    doc.setFont("helvetica", "normal").setFontSize(20).setTextColor(0, 0, 0);
    doc.text("Event Details Report", 65, 25);

    doc.setFont("times", "normal").setFontSize(15).setTextColor(100, 100, 100);
    doc.text(`Report Generated Date: ${dateStr}`, 65, 35);

    doc
      .setFont("courier", "normal")
      .setFontSize(12)
      .setTextColor(150, 150, 150);
    doc.text("TravelCraft.co, Galle Road, Colombo, Sri lanka", 50, 45);

    doc
      .setFont("courier", "normal")
      .setFontSize(12)
      .setTextColor(150, 150, 150);
    doc.text(
      "--------------------------------------------------------------------------------------------------",
      0,
      49
    );

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50,
      styles: { fontSize: 10 },
      headStyles: {
        fillColor: [31, 41, 55],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
    });

    doc.save(`Event-Details-Report_${dateStr}.pdf`); // Saves the PDF document with a filename containing the current.
  }
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-1 ">
        <Link to={"/admin/add-event"} className="btn1">
          Add New Event
        </Link>
        <button
          onClick={() => {
            generatePDF(events);
          }}
          className="btn2"
        >
          Generate report
        </button>
      </div>
    </div>
  );
}
