import axios from "axios";
import AuthService from "./auth.service";

const API_URL="https://test.ubsbill.com/apptest/sys/fooditems";
const currentUser =AuthService.getCurrentUser();
class ReceipeService {

    addReceipe(receipe)
    {
        return axios.post(API_URL+"/addfood",receipe);
    }

    getReceipe(receipe)
    {
       
        return axios.get(API_URL+`/getfood/${currentUser.storeid}`,receipe);
    }

    deletereceipe(id)
    {
        return axios.delete(API_URL +"/deletefood/" + id);
    } 
  }

export default new ReceipeService; 


