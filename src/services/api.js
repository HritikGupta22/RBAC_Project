import axios from "axios";

const BASE_URL =  process.env.REACT_APP_API_URL || "http://localhost:3001"; 

export const fetchUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};
 

export const fetchRoles = async () => {
    const response = await axios.get(`${BASE_URL}/roles`);
    return response.data;
  };

export const addUser = async (user) => {
  const response = await axios.post(`${BASE_URL}/users`, user);
  return response.data;
};

export const addRole = async (role) => {
  const response = await axios.post(`${BASE_URL}/roles`, role);
  return response.data;
};
  
export const deleteUser = async (userId) => {
    const response = await axios.delete(`${BASE_URL}/users/${userId}`);
    return response.data;
};
  
export const updateUser = async (userId, updatedUser) => {
    const response = await axios.put(`${BASE_URL}/users/${userId}`, updatedUser);
    return response.data;
};

  
export const deleteRole = async (roleId) => {
    await axios.delete(`${BASE_URL}/roles/${roleId}`);
};
  
export const updateRole = async (roleId, updatedRole) => {
    await axios.put(`${BASE_URL}/roles/${roleId}`, updatedRole);
};
  