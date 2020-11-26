import axios from "axios";
import store from "./store/index"; 

/**
 * Http
 *
 * Wrapper around the axios ajax library that handles any errors from the backend including 500's
 * and 401's (unauthorised)
 */
export default class Http {
  constructor(){
    this.axios = axios;
    this.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    axios.defaults.baseURL = "http://localhost:3000/";
    const token = localStorage.getItem("user-token");
    console.log(token)
    axios.defaults.headers.common["Authorization"] ='Bearer ' +  token;
    if(token){
      axios.defaults.headers.common["Authorization"] ='Bearer ' +  token;
      store.dispatch("verifyToken");
    }
  }
}
