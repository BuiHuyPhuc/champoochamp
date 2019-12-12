import axios from "axios";
import { ghtk } from "../constants";

const callghtkAPI = (url, query = '', method = 'POST', data = null) => axios({
  url: `${ghtk.apiDev}${url}${query}`,
  method,
  data,
  headers: {
    token: `${ghtk.token}`
  },
}).catch(error => console.log(`ERROR_CALL_GHTK_API from ${ghtk.apiDev}${url}: ${error.message}`));

export default callghtkAPI;