import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import jspdf from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import "../../assets/css/user/userList.css";

export default function VehicleReport({vehicles}) {

  function generatePDF(vehicles) {
    const doc = new jspdf();
    const tableColumn = [
      "No",
      "Vehicle",
      "Owner Name",
      "Reg.No",
      "Location",
      "No of Seats",
      "Price",
    ];
    const tableRows = [];

    vehicles
      .slice(0)
      .reverse()
      .map((vehicles, index) => {
        const Data = [
          index + 1,
          vehicles.brand + " " + vehicles.model,
          vehicles.ownername,
          vehicles.regno,
          vehicles.location,
          vehicles.seats,
          "$" + vehicles.price,
        ];
        tableRows.push(Data);
      });

    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];


    doc.setFontSize(28).setFont("Mooli", "bold").setTextColor(65, 164, 255);
    doc.text("TourCraft", 80, 15);

    doc.setFont("helvetica", "normal").setFontSize(20).setTextColor(0, 0, 0);
    doc.text("Vehicles Details Report", 75, 25);

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

    doc.save(`Vehicles-Details-Report_${dateStr}.pdf`);
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-1 ml-9">
        <Link to={"/admin/vehicle/add"} className="btn1">
          Add New Vehicle
        </Link>
        <button
          onClick={() => {
            generatePDF(vehicles);
          }}
          className="btn2"
        >
          Generate report
        </button>
      </div>
    </div>
  );
}
