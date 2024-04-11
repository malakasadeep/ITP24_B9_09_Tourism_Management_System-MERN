import React from "react";
import "../../assets/css/adminContent.css";
import { Sidebar } from "../Sidebar";
import { Route, Routes } from "react-router-dom";
import AddUser from "./AddUser";

export default function AdminAddUser() {
  return (
    <div
      className="dashboard"
      style={{ background: "#dde6ed", padding: "20px" }}
    >
      <Sidebar />
      <div className="dashboard--content">
        <div className="ml-60">
          <Routes>
            <Route path="/" element={<AddUser />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
