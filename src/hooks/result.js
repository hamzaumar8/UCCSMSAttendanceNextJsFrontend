import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../lib/axios";

export const useResult = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const refreshData = () => {
        router.replace(router.asPath);
    };

    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const editResult = async ({ setErrors, setStatus, result }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();
        axios
            .put(`/api/v1/results/${result.id}`, result)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    refreshData();
                    toast.success("Result updated!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status !== 422) {
                    console.log(error);
                } else {
                    setErrors(Object.keys(error.response.data.errors).flat());
                }
            });
    };

    const updateResultStatus = async ({ id }) => {
        setLoading(true);
        await csrf();

        axios
            .get(`/api/v1/update_status/result/${id}`)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    refreshData();
                    toast.success("Result status updated!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch(error => {
                setLoading(false);
                console.log(error);
            });
    };

    return {
        loading,
        editResult,
        updateResultStatus,
    };
};
