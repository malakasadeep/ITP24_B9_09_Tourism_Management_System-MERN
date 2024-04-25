import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import jspdf from "jspdf";
import "jspdf-autotable";
import "../../assets/css/user/userList.css";

export default function GuidReport({ guides }) {
  function generatePDF(guides) {
    const doc = new jspdf();
    const tableColumn = ["No", "Name", "Language", "Email", "NIC", "Address"];
    const tableRows = [];

    guides
      .slice(0)
      .reverse()
      .map((guides, index) => {
        const data = [
          index + 1,
          guides.name,
          guides.language,
          guides.email,
          guides.NIC,
          guides.address,
        ];
        tableRows.push(data);
      });

    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    doc.setFontSize(28).setFont("Mooli", "bold").setTextColor(65, 164, 255);
    doc.text("TourCraft", 80, 15);

    doc.setFont("helvetica", "normal").setFontSize(20).setTextColor(0, 0, 0);
    doc.text("Tour Guid Details Report", 65, 25);

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

    doc.save(`Tour-Guid-Details-Report_${dateStr}.pdf`);
  }
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-1 ">
        <Link to={"/admin/guid/add"} className="btn1">
          Add New Guider
        </Link>
        <button
          onClick={() => {
            generatePDF(guides);
          }}
          className="btn2"
        >
          Generate report
        </button>
      </div>
    </div>
  );
}
