import React from "react";
import { Link } from "react-router-dom";

import profile from "../assets/img/icons/admin/user.png";
import pack from "../assets/img/icons/admin/package.png";
import hotell from "../assets/img/icons/admin/hotel.png";
import vehicle from "../assets/img/icons/admin/vehicle.png";
import restaurant from "../assets/img/icons/admin/restaurant.png";
import guid from "../assets/img/icons/admin/guid.png";
import event from "../assets/img/icons/admin/event.png";
import train from "../assets/img/icons/admin/train.png";

const functions = [
  {
    name: "User Profile Management",
    icon: profile,
    link: "/admin/user",
  },
  {
    name: "Tour Package Management",
    icon: pack,
    link: "/admin/packages",
  },
  {
    name: "Hotel and Room Management",
    icon: hotell,
  },
  {
    name: "Vehicle Management",
    icon: vehicle,
  },
  {
    name: "Restourent Management",
    icon: restaurant,
  },
  {
    name: "Tour Guid Management",
    icon: guid,
    link: "/admin/guid"
  },
  {
    name: "Event and Activity Management",
    icon: event,
    link: "/events/admin",
  },
  {
    name: "Train Reservation Management",
    icon: train,
    link: '/admin/train'
  },
];
export const AdminCard = () => {
  return (
    <div className="card--container">
      {functions.map((func, index) => (
        <div className="card" key={index}>
          <Link to={func.link}>
            <div className="card--cover">
              <img src={func.icon}></img>
            </div>
            <div className="card--title">
              <h2>{func.name}</h2>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
