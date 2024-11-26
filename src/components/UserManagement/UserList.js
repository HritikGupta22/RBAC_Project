import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser, updateUser, fetchRoles } from "../../services/api.js";
import AddUser from "./AddUser";
import "./UserTable.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]); // Stores roles
  const [editingUser, setEditingUser] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [editedStatus, setEditedStatus] = useState("");

  const loadUsers = async () => {
    const data = await fetchUsers();
    setUsers(data);
  };

  const loadRoles = async () => {
    const data = await fetchRoles();
    setRoles(data);
  };

  useEffect(() => {
    loadUsers();
    loadRoles(); 
  }, []);

  const handleDelete = async (userId) => {
    await deleteUser(userId);
    loadUsers(); 
  };

  const handleEditClick = (user) => {
    setEditingUser(user.id);
    setEditedName(user.name);
    setEditedEmail(user.email);
    setEditedRole(user.role);
    setEditedStatus(user.status);
  };

  const handleSave = async () => {
    const updatedUser = {
      name: editedName,
      email: editedEmail,
      role: editedRole,
      status: editedStatus,
    };
    await updateUser(editingUser, updatedUser);
    setEditingUser(null);
    loadUsers(); 
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  return (
    <div className="user-management">
      <h2>Users</h2>
      <AddUser onUserAdded={loadUsers} />
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {editingUser === user.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                    />
                  </td>
                  <td>
                    <select
                      value={editedRole}
                      onChange={(e) => setEditedRole(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      value={editedStatus}
                      onChange={(e) => setEditedStatus(e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td>
                    <button onClick={() => handleEditClick(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
