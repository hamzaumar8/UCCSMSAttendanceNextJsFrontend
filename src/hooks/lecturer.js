import useSWR from "swr";
import axios from "../lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

export const useLecturer = () => {
    const router = useRouter();

    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [loading, setLoading] = useState(false);

    // CSRF
    const csrf = () => axios.get("/sanctum/csrf-cookie");
    const addLecturer = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();
        axios
            .post("/api/v1/lecturers", props)
            .then(res => {
                if (res.data.status === "lecturer-added") {
                    setLoading(false);
                    toast.success("Student was added successfully!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setModalOpen(false);
                }
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    return {
        loading,
        addLecturer,
    };
};
