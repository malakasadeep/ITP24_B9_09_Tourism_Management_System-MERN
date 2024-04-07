import React, { useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import jspdf from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import '../../assets/css/user/userList.css'

export default function UserReport() {

    const [error, setError] = useState(false);
    const [users, setUsers] = useState([]);

    const handleShowPackages = async () => {
        try {
        const res = await fetch(`/api/user/all-Users`);
        const data = await res.json();
        if (data.success === false) {
            setError(true);
            return;
        }
        setUsers(data);
        } catch (error) {
            setError(true);
        }
    };
    handleShowPackages();


    function generatePDF(users) {
        const doc = new jspdf();
        const tableColumn = [
            "No",
            "Name",
            "Email",
            "Country",
            "Type",
            "Created at",
        ];
        const tableRows = [];
    
        users.slice(0).reverse().map((user, index) => {
            const userProfilePic = new Image();
            userProfilePic.src = user.avatar; // Assuming profilePicture is the URL of the user's profile picture
            const ticketData = [
                index + 1,
                user.username,
                user.email,
                user.country,
                user.usertype,
                moment(user.createdAt).format("MM/DD/YYYY h:mm A"),
            ];
            tableRows.push(ticketData);
        });
    
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
    
        doc.setFontSize(28).setFont("Mooli", "bold").setTextColor(65, 164, 255);
        doc.text("TravelCraft", 80, 15);

        doc.setFont("helvetica", "normal").setFontSize(20).setTextColor(0, 0, 0);
        doc.text("User Details Report", 75, 25);

        doc.setFont("times", "normal").setFontSize(15).setTextColor(100, 100, 100);
        doc.text(`Report Generated Date: ${dateStr}`, 65, 35);

        doc.setFont("courier", "normal").setFontSize(12).setTextColor(150, 150, 150);
        doc.text("TravelCraft.co, Galle Road, Colombo, Sri lanka", 50, 45);

        doc.setFont("courier", "normal").setFontSize(12).setTextColor(150, 150, 150);
        doc.text("--------------------------------------------------------------------------------------------------", 0, 49);

          doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 50,
            styles: { fontSize: 10 },
            headStyles: { fillColor: [31, 41, 55], textColor: [255, 255, 255], fontStyle: 'bold' },
        });
        
        doc.save(`User-Details-Report_${dateStr}.pdf`);
    }
       
  return (
    <div>
        <div className="grid md:grid-cols-2 gap-1">
          <Link
            to="/"
            className="btn1"
          >
            Add User
          </Link>
          <button
            onClick={() => {
              generatePDF(users);
            }}
            className="btn2"
          >
            Generate report
          </button>
          </div>
    </div>
  )
}
