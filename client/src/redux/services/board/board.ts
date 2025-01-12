import axios from "axios";
const API_URL = "/api/boards";
import { board,objectId} from '../../../types/type'
type obj = board & objectId
const getBoards = async (keyword:{code:string}) => {
  console.log(keyword);
  
  const response= await axios.get(`${API_URL}?code=${keyword.code}`);
  console.log(response);
  
  return response.data;
};
const getBoard = async() => {
  const response = await axios.get(`${API_URL}`);
  return await response.data;
};


const createBoard = async (row: board): Promise<object> => {
    const response = await axios.post(API_URL, row);
    return await response.data;
};
const deleteBoard = async(id:string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return await response.data;
};
const updateBoard = async (row: obj) => {
  const response = await axios.put(`${API_URL}/${row?._id}`, row);
  return await response.data;
};

const reportService = {
  createBoard,
  getBoard,
  deleteBoard,
  updateBoard,
  getBoards
};
export default reportService;
