import axios from "axios";

const API_URL = "http://172.16.4.3:5000/api/auth"; 

export const register = async (email: string, password: string) => {
    return axios.post(`${API_URL}/register`, { email, password });
};
