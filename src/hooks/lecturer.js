import useSWR from "swr";
import axios from "../lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { handleLecturerState } from "../atoms/lecturerAtom";

export const useLecturer = () => {
    const router = useRouter();

    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [loading, setLoading] = useState(false);
    const [handleLecturer, setHandleLecturer] =
        useRecoilState(handleLecturerState);

    // CSRF
    const csrf = () => axios.get("/sanctum/csrf-cookie");

    // Add Lecturer
    const addLecturer = async ({
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
            .post("/api/v1/lecturers", formData)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    setHandleLecturer(true);
                    setModalOpen(false);
                    toast.success("Lecturer was added successfully!", {
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

    const editLecturer = async ({
        setErrors,
        setStatus,
        formData,
        ...props
    }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        // for (var pair of formData.entries()) {
        //     console.log(pair[0] + " - " + pair[1]);
        // }

        await csrf();
        axios
            .post(`/api/v1/lecturers/${props.id}`, formData)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    setHandleLecturer(true);
                    setModalOpen(false);
                    toast.success("Lecturer was editted successfully!", {
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
        addLecturer,
        editLecturer,
    };
};
