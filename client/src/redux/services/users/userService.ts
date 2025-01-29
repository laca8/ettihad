import axios from "axios";
const API_URL = "/api/users";
import { user } from "../../../types/type";
const getUsers = async () => {
  const response = await axios.get(`${API_URL}`);
  console.log(response);

  return response.data;
};
const loginUser = async (row: { name: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, row);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return await response.data;
};

const createUser = async (row: user): Promise<object> => {
  const response = await axios.post(`${API_URL}/register`, row);
  return await response.data;
};
const deleteUser = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return await response.data;
};
const logout = async () => {
  localStorage.removeItem("user");
};
const reportService = {
  createUser,
  loginUser,
  getUsers,
  deleteUser,
  logout,
};
export default reportService;
