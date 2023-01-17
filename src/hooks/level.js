import { useRouter } from "next/router";
import { useState } from "react";
import axios from "../lib/axios";

export const useLevel = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const refreshData = () => {
        router.replace(router.asPath);
    };

    const csrf = () => axios.get("/sanctum/csrf-cookie");

    return {
        loading,
    };
};
