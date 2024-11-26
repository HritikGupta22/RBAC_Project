import React, { useEffect, useState } from "react";
import { fetchRoles, deleteRole, updateRole } from "../../services/api";
import AddRole from "./AddRole";
import "./RoleTable.css";

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [editingRole, setEditingRole] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedPermissions, setEditedPermissions] = useState("");

  const loadRoles = async () => {
    const data = await fetchRoles();
    setRoles(data);
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const handleDelete = async (roleId) => {
    await deleteRole(roleId);
    loadRoles(); 
  };

  const handleEditClick = (role) => {
    setEditingRole(role.id);
    setEditedName(role.name);
    setEditedPermissions(role.permissions.join(", "));
  };

  const handleSave = async () => {
    const updatedRole = {
      name: editedName,
      permissions: editedPermissions.split(",").map((perm) => perm.trim()), 
    };
    await updateRole(editingRole, updatedRole);
    setEditingRole(null);
    loadRoles(); 
  };

  const handleCancel = () => {
    setEditingRole(null);
  };

  return (
    <div className="role-management">
      <h2>Roles</h2>
      <AddRole onRoleAdded={loadRoles} />
      <table className="role-table">
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              {editingRole === role.id ? (
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
                      type="text"
                      value={editedPermissions}
                      onChange={(e) => setEditedPermissions(e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{role.name}</td>
                  <td>{role.permissions.join(", ")}</td>
                  <td>
                    <button onClick={() => handleEditClick(role)}>Edit</button>
                    <button onClick={() => handleDelete(role.id)}>Delete</button>
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

export default RoleList;
