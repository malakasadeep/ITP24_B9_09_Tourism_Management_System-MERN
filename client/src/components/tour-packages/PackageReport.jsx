import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import jspdf from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import "../../assets/css/user/userList.css";

export default function PackageReport() {
  const [error, setError] = useState(false);
  const [packages, setPackages] = useState([]);

  const handleShowPackages = async () => {
    try {
      const res = await fetch(`/api/Package/all-packages`);
      const data = await res.json();
      if (data.success === false) {
        setError(true);
        return;
      }
      setPackages(data);
    } catch (error) {
      setError(true);
    }
  };
  handleShowPackages();

  function generatePDF(packages) {
    const doc = new jspdf();
    const tableColumn = [
      "No",
      "Title",
      "Category",
      "Type",
      "Days",
      "Citys",
      "Price",
      "Offer",
      "Created at",
    ];
    const tableRows = [];

    packages
      .slice(0)
      .reverse()
      .map((packages, index) => {
        const packagedata = [
          index + 1,
          packages.title,
          packages.category,
          packages.type,
          packages.days,
          packages.citys,
          "$" + packages.price,
          packages.offer.toString(),
          moment(packages.createdAt).format("MM/DD/YYYY h:mm A"),
        ];
        tableRows.push(packagedata);
      });

    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    const logo = new Image();
    logo.src = "../../assets/img/Logo14.png";

    doc.setFontSize(28).setFont("Mooli", "bold").setTextColor(65, 164, 255);
    doc.text("TourCraft", 80, 15);

    doc.setFont("helvetica", "normal").setFontSize(20).setTextColor(0, 0, 0);
    doc.text("Package Details Report", 65, 25);

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

    doc.save(`Package-Details-Report_${dateStr}.pdf`);
  }
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-1 ">
        <Link to={"/admin/packages/add-pkg"} className="btn1">
          Add New Package
        </Link>
        <button
          onClick={() => {
            generatePDF(packages);
          }}
          className="btn2"
        >
          Generate report
        </button>
      </div>
    </div>
  );
}
