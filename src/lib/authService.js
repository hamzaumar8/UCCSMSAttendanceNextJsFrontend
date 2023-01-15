import Cookies from "js-cookie";

export const saveAuthToken = token => {
    Cookies.set("token", token);
};

export const removeAuthToken = () => {
    Cookies.remove("token");
};

export const saveAuthUser = user => {
    Cookies.set("user", user);
};
