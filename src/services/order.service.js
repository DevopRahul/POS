import axios from "axios";

const API_URL="https://test.ubsbill.com/apptest/sys/order";

class OrderService{

    addOrder(order)
    {
        return axios.post(API_URL+"/postorder",order);
    }

    findAll(order)
    {
        return axios.get(API_URL+"/getorder",order);
    }

    deleteorder(id)
    {
        return axios.delete(API_URL + "/orders/" + id);
    } 
    
    addOrderFood(order)
    {
        return axios.post(API_URL+"/postorder",order);
    }
    
}

export default new OrderService; 