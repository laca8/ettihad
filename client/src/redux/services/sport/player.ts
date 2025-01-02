import axios from "axios";
const API_URL = "/api/sport/player";
import { player,objectId} from '../../../types/type'
type obj = player & objectId
const getPlayers = async (keyword:{name:string,code:string}) => {
  console.log(keyword);
  
  const response = await axios.get(`${API_URL}?code=${keyword.code}&&name=${keyword.name}`);
  return response.data;
};
const getPlayer = async() => {
  const response = await axios.get(`${API_URL}`);
  return await response.data;
};
// interface Config {
//     headers: {
//         [key: string]: string;
//     };
// }

const createPlayer = async (row: player): Promise<object> => {
    const response = await axios.post(API_URL, row);
    return await response.data;
};
const deletePlayer = async(id:string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return await response.data;
};
const updatePlayer = async (row: obj) => {
  const response = await axios.put(`${API_URL}/${row?._id}`, row);
  return await response.data;
};

const reportService = {
  createPlayer,
  getPlayer,
  deletePlayer,
  updatePlayer,
  getPlayers
};
export default reportService;
