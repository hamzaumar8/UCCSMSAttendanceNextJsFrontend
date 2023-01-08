import useSWR from "swr";
import axios from "../lib/axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const useSemester = () => {
    const [loading, setLoading] = useState(false);

    // CSRF
    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const {
        data: semester,
        error,
        mutate,
    } = useSWR("/api/v1/semester", () =>
        axios
            .get("/api/v1/semester")
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error;
            }),
    );

    const addSemester = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();

        axios
            .post("/api/v1/semester", props)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    toast.success("Semester set succesfully", {
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

    const editSemester = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();
        axios
            .put(`/api/v1/semester/${props.id}`, props)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    toast.success("Semester update successfully!", {
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
    const promoteStudent = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);

        await csrf();
        axios
            .put(`/api/v1/student/level/promotion/${props.id}`, props)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    toast.success("Promotion done successfully!", {
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
        semester,
        addSemester,
        editSemester,
        promoteStudent,
    };
};
