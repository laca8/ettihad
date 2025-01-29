import axios from "axios";
const API_URL = "/api/reporters";
import { reporter, objectId } from "../../../types/type";
type obj = reporter & objectId;
const getReporters = async (keyword: { code: string; par: string }) => {
  console.log(keyword);

  const response = await axios.get(
    `${API_URL}?code=${keyword.code}&&par=${keyword.par}`
  );
  console.log(response);

  return response.data;
};
const getReporter = async () => {
  const response = await axios.get(`${API_URL}`);
  return await response.data;
};

const createReporter = async (row: reporter): Promise<object> => {
  const response = await axios.post(API_URL, row);
  return await response.data;
};
const deleteReporter = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return await response.data;
};
const updateReporter = async (row: obj) => {
  const response = await axios.put(`${API_URL}/${row?._id}`, row);
  return await response.data;
};

const reportService = {
  createReporter,
  getReporter,
  deleteReporter,
  updateReporter,
  getReporters,
};
export default reportService;
