import axios from "axios";
const API_URL = "/api/sport/prize";
import { prize,objectId} from '../../../types/type'
type obj = prize & objectId
const getPrizes = async (keyword:{name:string,code:string}) => {
  console.log(keyword);
  
  const response = await axios.get(`${API_URL}?code=${keyword.code}&&name=${keyword.name}`);
  return response.data;
};
const getPrize = async() => {
  const response = await axios.get(`${API_URL}`);
  return await response.data;
};
// interface Config {
//     headers: {
//         [key: string]: string;
//     };
// }

const createPrize = async (row: prize): Promise<object> => {
    const response = await axios.post(API_URL, row);
    return await response.data;
};
const deletePrize = async(id:string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return await response.data;
};
const updatePrize = async (row: obj) => {
  const response = await axios.put(`${API_URL}/${row?._id}`, row);
  return await response.data;
};

const reportService = {
  createPrize,
  getPrize,
  deletePrize,
  updatePrize,
  getPrizes
};
export default reportService;
