import {postRequest} from "../utils/ajax";

export const getAllOrders = (data, callback) => {
    const url = `http://localhost:8080/getAllOrders`;
    postRequest(url, data, callback);
};

