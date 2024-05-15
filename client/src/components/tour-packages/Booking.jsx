import React, { useState } from "react";
import { useSelector } from "react-redux";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";

export default function Booking({ packagee }) {
  const { currentUser } = useSelector((state) => state.user);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    const days = parseInt(packagee.days);
    if (e.target.value && !isNaN(days)) {
      const endDate = new Date(e.target.value);
      endDate.setDate(endDate.getDate() + days);
      setEndDate(endDate.toISOString().split("T")[0]);
    } else {
      setEndDate(null);
    }
  };

  const generateOrderId = () => {
    const orderId = Math.random().toString().substr(2, 9).padStart(9, "0");
    setOrderId(orderId);
    return orderId;
  };

  const handleGeneratePdf = () => {
    const orderId = generateOrderId(); // Generate order ID
    const qrCodeData =
      orderId +
      "\n" +
      startDate +
      "\n" +
      endDate +
      "\n" +
      packagee.name +
      "\n" +
      packagee.price +
      "\n" +
      currentUser.name +
      "\n" +
      currentUser.email;

    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Set blue theme styles
    const blueColor = "#007bff";
    doc.setTextColor(blueColor);
    doc.setDrawColor(blueColor);

    // Add content to the PDF
    doc.text("Tour Craft Tourism", 50, 20);
    doc.text("Booking Bill", 60, 30);
    doc.text("------------------Package Details------------------", 20, 40);
    doc.text(`Order ID: ${orderId}`, 20, 50);
    doc.text(`Start Date: ${startDate}`, 20, 60);
    doc.text(`End Date: ${endDate}`, 20, 70);
    doc.text(`Package: ${packagee.title}`, 20, 80);
    doc.text(`Price: ${packagee.price}`, 20, 90);
    doc.text(`-------------------Customer Details----------------- `, 20, 100);
    doc.text(`Customer Name: ${currentUser.username}`, 20, 110);
    doc.text(`Email: ${currentUser.email}`, 20, 120);
    doc.text("Visit our website: www.tourcraft.com", 20, 250);

    // Add QR code to the PDF
    doc.addImage(qrCodeData, "JPEG", 20, 110, 50, 50);

    // Download the PDF
    doc.save("Package_Booking_Bill.pdf");
  };

  return (
    <div className="ml-10 mr-10">
      <div className="mb-4">
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={handleStartDateChange}
          className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {endDate && (
        <div className="mb-4">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            End Date:
          </label>
          <input
            type="text"
            id="endDate"
            value={endDate}
            readOnly
            className="block w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>
      )}
      <div id="qrcode" className="justify-center">
        {orderId ? <QRCode value={orderId} size={100} /> : ""}
      </div>
      <button
        onClick={handleGeneratePdf}
        disabled={!startDate || !endDate}
        className="bg-blue-500 w-full text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out text-center cursor-pointer mb-5 mt-5"
      >
        Book the Package
      </button>
    </div>
  );
}
