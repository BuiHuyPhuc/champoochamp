import axios from "axios";
import { apiPort } from "../constants";

const callAPI = (url, query = '', method = 'GET', data = null, headers = null) => axios({
  url: `${apiPort}/api/${url}${query}`,
  method,
  data,
  headers
}).catch(error => console.log(`ERROR_CALL_API from ${url}: ${error.message}`));

export default callAPI;