import Cookies from "js-cookie";

export const saveAuthToken = token => {
    Cookies.set("token", token);
};

export const removeAuthToken = () => {
    Cookies.remove("token");
};
