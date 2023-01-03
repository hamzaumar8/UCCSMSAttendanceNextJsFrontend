import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { handleResultState } from "../atoms/resultAtom";
import axios from "../lib/axios";

export const useResult = () => {
    const [loading, setLoading] = useState(false);
    const [handleResult, setHandleResult] = useRecoilState(handleResultState);

    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const editResult = async ({ setErrors, setStatus, result }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        console.log(result);
        await csrf();
        // console.log("save", result);
        axios
            .put(`/api/v1/results/${result.id}`, result)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    setHandleResult(!handleResult);
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

    return {
        loading,
        editResult,
    };
};
