import React from "react";
import { AdminCard } from "../AdminCard";
import { UserList } from "./UserList";

import "../../assets/css/adminContent.css";
import { Sidebar } from "../Sidebar";
import { Route, Routes } from "react-router-dom";

export const AdminUM = () => {
  return (
    <div
      className="dashboard"
      style={{ background: "#dde6ed", padding: "20px" }}
    >
      <Sidebar />
      <div className="dashboard--content">
        <div>
          <Routes>
            <Route path="/" element={<UserList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
