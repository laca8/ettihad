import axios from "axios";
const API_URL = "/api/infra";
import { infra,objectId} from '../../../types/type'
type obj = infra & objectId
const getInfras = async (keyword:{name:string,code:string}) => {
  console.log(keyword);
  
  const response = await axios.get(`${API_URL}?code=${keyword.code}&&name=${keyword.name}`);
  return response.data;
};
const getInfra = async() => {
  const response = await axios.get(`${API_URL}`);
  return await response.data;
};
// interface Config {
//     headers: {
//         [key: string]: string;
//     };
// }

const createInfra = async (row: infra): Promise<object> => {
    const response = await axios.post(API_URL, row);
    return await response.data;
};
const deleteInfra = async(id:string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return await response.data;
};
const updateInfra = async (row: obj) => {
  const response = await axios.put(`${API_URL}/${row?._id}`, row);
  return await response.data;
};

const reportService = {
  createInfra,
  getInfra,
  deleteInfra,
  updateInfra,
  getInfras
};
export default reportService;
