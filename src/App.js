import React, { useState } from "react";
import UserList from "./components/UserManagement/UserList";
import RoleList from "./components/RoleManagement/RoleList";
import "./App.css";

const App = () => {
  const [activePage, setActivePage] = useState("users");

  return (
    <div className="app-container">
    <h1>ADMIN ACCESS PORTAL</h1>
      <nav className="navigation">
        <button
          className={activePage === "users" ? "active" : ""}
          onClick={() => setActivePage("users")}
        >
          User Management
        </button>
        <button
          className={activePage === "roles" ? "active" : ""}
          onClick={() => setActivePage("roles")}
        >
          Role Management
        </button>
      </nav>
      <div className="content">
        {activePage === "users" && <UserList />}
        {activePage === "roles" && <RoleList />}
      </div>
    </div>
  );
};

export default App;


