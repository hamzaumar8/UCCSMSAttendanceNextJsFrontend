import useSWR from "swr";
import axios from "../lib/axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { toast } from "react-toastify";

export const useModule = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
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
            .then(res => {
                if (res.data.status === "module-mounted-succesffully") {
                    setLoading(false);
                    setModalOpen(false);
                    toast.success("Moudule Mounted Successfully!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch(error => {
                if (error.response.status !== 422) throw error;
                setErrors(Object.values(error.response.data.errors).flat());
                setLoading(false);
            });
    };

    const editModule = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        console.log(props.id);

        await csrf();
        axios
            .put(`/api/v1/modules/${props.id}`, props)
            .then(res => {
                if (res.data.status === "module-editted") {
                    setLoading(false);
                    setModalOpen(false);
                    toast.success("Moudule Mounted Successfully!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch(error => {
                if (error.response.status !== 422) throw error;
                setErrors(error.response.data.errors);
                setLoading(false);
            });
    };

    return {
        loading,
        mountModule,
        editModule,
    };
};
