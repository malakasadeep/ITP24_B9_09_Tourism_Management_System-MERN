import React, { useState } from "react";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";

export default function EventBooking({ event, user }) {
  const [quantity, setQuantity] = useState(1); // State for quantity of tickets
  const [totalPrice, setTotalPrice] = useState(event.ticketPrice); // State for total price
  const [orderId, setOrderId] = useState(null); // State for order ID
  const { currentUser } = useSelector((state) => state.user);

  // Function to handle quantity change
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);

    // Calculate total price based on quantity and ticket price
    setTotalPrice(newQuantity * event.price);
  };

  // Function to generate order ID
  const generateOrderId = () => {
    const orderId = Math.random().toString().substr(2, 9).padStart(9, "0");
    setOrderId(orderId);
    return orderId;
  };

  // Function to handle booking and generate PDF
  const handleBookTickets = () => {
    const orderId = generateOrderId(); // Generate order ID
    const qrCodeData =
      orderId + "\n" + event.name + "\n" + quantity + "\n" + totalPrice;

    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Set blue theme styles
    const blueColor = "#007bff";
    doc.setTextColor(blueColor);
    doc.setDrawColor(blueColor);

    // Add content to the PDF
    doc.text("Event Booking", 50, 20);
    doc.text(`Event Name: ${event.title}`, 20, 30);
    doc.text(`Event Date: ${event.date}`, 20, 40);
    doc.text(`Quantity: ${quantity}`, 20, 50);
    doc.text(`Total Price: ${totalPrice}`, 20, 60);
    doc.text(`Customer Name: ${currentUser.username}`, 20, 70);
    doc.text(`Email: ${currentUser.email}`, 20, 80);

    // Add QR code to the PDF
    doc.addImage(qrCodeData, "JPEG", 20, 90, 50, 50);

    // Download the PDF
    doc.save("Event_Booking_Bill.pdf");

    // Perform booking logic here
    // For now, let's just log the booking details
    console.log("Booking Details:");
    console.log("Event Name:", event.name);
    console.log("Event Date:", event.date);
    console.log("Quantity:", quantity);
    console.log("Total Price:", totalPrice);
    console.log("Customer Name:", currentUser.name);
    console.log("Email:", currentUser.email);
  };

  return (
    <div className="container mx-auto max-w-md p-5">
      <h1 className="text-3xl font-semibold text-center mb-5">Event Booking</h1>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <label
            htmlFor="quantity"
            className="text-sm font-medium text-gray-700"
          >
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            min={1}
            onChange={handleQuantityChange}
            className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-4">
          <label
            htmlFor="totalPrice"
            className="text-sm font-medium text-gray-700"
          >
            Total Price:
          </label>
          <input
            type="text"
            id="totalPrice"
            value={"$ " + totalPrice}
            readOnly
            className="border rounded-md px-4 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div className="flex justify-center">
          {orderId && <QRCode value={orderId} size={100} />}
        </div>
        <button
          onClick={handleBookTickets}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out text-center"
          disabled={quantity < 1}
        >
          Book Tickets
        </button>
      </div>
    </div>
  );
}
