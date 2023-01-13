import useSWR from "swr";
import axios from "../lib/axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./auth";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { toast } from "react-toastify";

export const useStudent = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [loading, setLoading] = useState(false);

    const refreshData = () => {
        router.replace(router.asPath);
    };

    // CSRF
    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const addStudent = async ({ setErrors, setStatus, formData, ...props }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();

        axios
            .post("/api/v1/students", formData)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    setModalOpen(false);
                    refreshData();
                    toast.success("Student was added successfully!", {
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

    const editStudent = async ({
        setErrors,
        setStatus,
        formData,
        ...props
    }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();

        axios
            .post(`/api/v1/students/${props.id}`, formData)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    setModalOpen(false);
                    refreshData();
                    toast.success("Student was added successfully!", {
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

    const importStudent = async ({ setErrors, setStatus, formData }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();
        axios
            .post("/api/v1/import/students/", formData)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    setModalOpen(false);
                    refreshData();
                    toast.success("CSV imported successfully!", {
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
    return {
        loading,
        addStudent,
        editStudent,
        importStudent,
    };
};
