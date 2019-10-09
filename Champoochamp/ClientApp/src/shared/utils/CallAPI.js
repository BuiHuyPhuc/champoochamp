import axios from "axios";
import { API_PORT } from "../constants";

const CallAPI = (url, query = '', method = 'GET', data = null, headers = null) => axios({
  url: `${API_PORT}/api/${url}${query}`,
  method,
  data,
  headers
}).catch(error => console.log(`ERROR_CALL_API from ${url}: ${error.message}`));

export default CallAPI;