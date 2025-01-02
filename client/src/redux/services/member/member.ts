import axios from "axios";
const API_URL = "/api/member";
import { member,objectId} from '../../../types/type'
type obj = member & objectId
const getMembers = async (keyword:{name:string,code:string}) => {
  console.log(keyword);
  
  const response = await axios.get(`${API_URL}?code=${keyword.code}&&name=${keyword.name}`);
  return response.data;
};
const getMember = async() => {
  const response = await axios.get(`${API_URL}`);
  return await response.data;
};
// interface Config {
//     headers: {
//         [key: string]: string;
//     };
// }

const createMember = async (row: member): Promise<object> => {
    const response = await axios.post(API_URL, row);
    return await response.data;
};
const deleteMember = async(id:string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return await response.data;
};
const updateMember = async (row: obj) => {
  const response = await axios.put(`${API_URL}/${row?._id}`, row);
  return await response.data;
};

const reportService = {
  createMember,
  getMember,
  deleteMember,
  updateMember,
  getMembers
};
export default reportService;
