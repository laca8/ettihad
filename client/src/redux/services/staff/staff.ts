import axios from "axios";
const API_URL = "/api/staff";
import { staff,objectId} from '../../../types/type'
type obj = staff & objectId
const getStaffs = async (keyword:{name:string,code:string}) => {
  console.log(keyword);
  
  const response = await axios.get(`${API_URL}?code=${keyword.code}&&name=${keyword.name}`);
  return response.data;
};
const getStaff = async() => {
  const response = await axios.get(`${API_URL}`);
  return await response.data;
};
// interface Config {
//     headers: {
//         [key: string]: string;
//     };
// }

const createStaff = async (row: staff): Promise<object> => {
    const response = await axios.post(API_URL, row);
    return await response.data;
};
const deleteStaff = async(id:string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return await response.data;
};
const updateStaff = async (row: obj) => {
  const response = await axios.put(`${API_URL}/${row?._id}`, row);
  return await response.data;
};

const reportService = {
  createStaff,
  getStaff,
  deleteStaff,
  updateStaff,
  getStaffs
};
export default reportService;
