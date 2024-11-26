import React, { useState } from "react";
import { addRole } from "../../services/api";
import "./RoleTable.css";

const AddRole = ({ onRoleAdded }) => {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRole = { name, permissions: permissions.split(",") };
    await addRole(newRole);
    onRoleAdded();  
    setName("");
    setPermissions("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="Role Name"
      />
      <input
        type="text"
        value={permissions}
        onChange={(e) => setPermissions(e.target.value)}
        required
        placeholder="Permissions(comma separated)"
      />
      <button type="submit">Add Role</button>
    </form>
  );
};

export default AddRole;
