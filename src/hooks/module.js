import useSWR from "swr";
import axios from "../lib/axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { toast } from "react-toastify";
import { handleModuleBankState } from "../atoms/moduleAtom";

export const useModule = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [handleModuleBank, setHandleModuleBank] = useRecoilState(
        handleModuleBankState,
    );

    const [loading, setLoading] = useState(false);

    // CSRF
    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const {
        data: SWRmodules,
        error,
        mutate,
    } = useSWR("/api/v1/module/bank", () =>
        axios.get("/api/v1/module/bank").then(response => response.data.data),
    );

    // Add Module to Module Bank
    const addModule = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();
        axios
            .post("/api/v1/module/bank", props)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    setHandleModuleBank(true);
                    setModalOpen(false);
                    toast.success("Module has been added successfully!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status !== 422) {
                    console.log(error);
                } else {
                    setErrors(error.response.data.errors);
                }
            });
    };

    const editModule = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();
        axios
            .put(`/api/v1/module/bank/${props.id}`, props)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    setModalOpen(false);
                    toast.success("Module editted successfully!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status !== 422) {
                    console.log(error);
                } else {
                    setErrors(error.response.data.errors);
                }
            });
    };

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
                    toast.success("Module Mounted Successfully!", {
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

    const editMountModule = async ({ setErrors, setStatus, ...props }) => {
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
                    toast.success("Module Mounted Successfully!", {
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
        addModule,
        editModule,
        mountModule,
        editMountModule,
    };
};
