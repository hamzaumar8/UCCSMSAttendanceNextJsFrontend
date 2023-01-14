import Axios from "axios";
import Cookies from "js-cookie";
import { removeAuthToken } from "./authService";

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
});

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            console.error("You are not logged in");
            removeAuthToken();
            // window.location.href = "/login";
            return Promise.reject();
        }
        return Promise.reject(error);
    },
);

axios.interceptors.request.use(config => {
    const token = Cookies.get("token");
    if (token && token != "" && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export default axios;
