import React, { useState, useEffect } from "react";
import { addUser, fetchRoles } from "../../services/api";
import "./UserTable.css";

const AddUser = ({ onUserAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Active");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
   
    const loadRoles = async () => {
      const rolesData = await fetchRoles();
      setRoles(rolesData);
    };
    loadRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, email, role, status };
    await addUser(newUser);
    onUserAdded(); 
    setName("");
    setEmail("");
    setRole("");
    setStatus("Active");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Email"
      />
      <select value={role} onChange={(e) => setRole(e.target.value)} required>
        <option value="" disabled>
          Select Role
        </option>
        {roles.map((r) => (
          <option key={r.id} value={r.name}>
            {r.name}
          </option>
        ))}
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
