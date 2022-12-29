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
                if (res.data.status === "student-added-succesffully") {
                    setLoading(false);
                    toast.success("Student was added successfully!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setModalOpen(false);
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
    };
};
