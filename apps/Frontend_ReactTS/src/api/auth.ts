import axios from "axios";

const API_URL = "http://localhost:5255/api/auth"; 

export const register = async (email: string, password: string) => {
    return axios.post(`${API_URL}/register`, { email, password });
};
