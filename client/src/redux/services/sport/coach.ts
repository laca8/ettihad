import axios from "axios";
const API_URL = "/api/sport/coach";
import { coach,objectId} from '../../../types/type'
type obj = coach & objectId
const getCoachs = async (keyword:{name:string,code:string}) => {
  console.log(keyword);
  const response = await axios.get(`${API_URL}?code=${keyword.code}&&name=${keyword.name}`);
  return response.data;
};
const getCoach = async() => {
  const response = await axios.get(`${API_URL}`);
  return await response.data;
};
// interface Config {
//     headers: {
//         [key: string]: string;
//     };
// }

const createCoach = async (row: coach): Promise<object> => {
    const response = await axios.post(API_URL, row);
    return await response.data;
};
const deleteCoach = async(id:string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return await response.data;
};
const updateCoach = async (row: obj) => {
  const response = await axios.put(`${API_URL}/${row?._id}`, row);
  return await response.data;
};

const reportService = {
  createCoach,
  getCoach,
  deleteCoach,
  updateCoach,
  getCoachs
};
export default reportService;
