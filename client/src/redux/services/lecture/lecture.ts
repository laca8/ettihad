import axios from "axios";
const API_URL = "/api/lectures";
import { lecture, objectId } from "../../../types/type";
type obj = lecture & objectId;
const getLectures = async (keyword: { code: string; par: string }) => {
  console.log(keyword);

  const response = await axios.get(
    `${API_URL}?code=${keyword.code}&&par=${keyword.par}`
  );
  console.log(response);

  return response.data;
};
const getLecture = async () => {
  const response = await axios.get(`${API_URL}`);
  return await response.data;
};

const createLecture = async (row: lecture): Promise<object> => {
  const response = await axios.post(API_URL, row);
  return await response.data;
};
const deleteLecture = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return await response.data;
};
const updateLecture = async (row: obj) => {
  const response = await axios.put(`${API_URL}/${row?._id}`, row);
  return await response.data;
};

const reportService = {
  createLecture,
  getLecture,
  deleteLecture,
  updateLecture,
  getLectures,
};
export default reportService;
