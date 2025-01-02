import axios from "axios";
const API_URL = "/api/sport/game";
import { sport,objectId} from '../../../types/type'
type obj = sport & objectId
const getGames = async (keyword:{name:string,code:string}) => {
  console.log(keyword);
  
  const response = await axios.get(`${API_URL}/?code=${keyword.code}&&name=${keyword.name}`);
  return response.data;
};
const getGame = async() => {
  const response = await axios.get(`${API_URL}`);
  return await response.data;
};
const createGame = async (row:sport): Promise<object> => {
  const response = await axios.post(API_URL, row);
  return await response.data;
};
const deleteGame = async(id:string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return await response.data;
};
const updateGame = async (row: obj) => {
  const response = await axios.put(`${API_URL}/${row?._id}`, row);
  return await response.data;
};

const reportService = {
  createGame,
  getGame,
  deleteGame,
  updateGame,
  getGames
};
export default reportService;
