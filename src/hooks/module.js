import useSWR from "swr";
import axios from "../lib/axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./auth";

export const useModule = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // CSRF
    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const mountModule = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();
        axios
            .post("/api/v1/modules", props)
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error;
                setErrors(Object.values(error.response.data.errors).flat());
            });
        setLoading(false);
    };

    return {
        loading,
        mountModule,
    };
};
