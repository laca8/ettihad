import axios from "axios";
const API_URL = "/api/sponsor";
import { sponsor,objectId} from '../../../types/type'
type obj = sponsor & objectId
const getSponsors = async (keyword:{name:string,code:string}) => {
  console.log(keyword);
  
  const response = await axios.get(`${API_URL}?code=${keyword.code}&&name=${keyword.name}`);
  return response.data;
};
const getSponsor = async() => {
  const response = await axios.get(`${API_URL}`);
  return await response.data;
};
// interface Config {
//     headers: {
//         [key: string]: string;
//     };
// }

const createSponsor = async (row: sponsor): Promise<object> => {
    const response = await axios.post(API_URL, row);
    return await response.data;
};
const deleteSponsor = async(id:string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return await response.data;
};
const updateSponsor = async (row: obj) => {
  const response = await axios.put(`${API_URL}/${row?._id}`, row);
  return await response.data;
};

const reportService = {
  createSponsor,
  getSponsor,
  deleteSponsor,
  updateSponsor,
  getSponsors
};
export default reportService;
