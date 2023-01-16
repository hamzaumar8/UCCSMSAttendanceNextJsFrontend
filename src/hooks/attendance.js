import useSWR from "swr";
import axios from "../lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./auth";
import { modalTypeState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";

export const useAttendance = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [modalType, setModalType] = useRecoilState(modalTypeState);

    const csrf = () => axios.get("/sanctum/csrf-cookie");
    const refreshData = () => {
        router.replace(router.asPath);
    };
    const addAttendance = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        await csrf();
        setErrors([]);
        setStatus(null);

        axios
            .post("/api/v1/attendance_lecturer", props)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    refreshData();
                    setModalType("checkInSuccess");
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

    const acceptAttendance = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        await csrf();
        setErrors([]);
        setStatus(null);

        axios
            .put(`/api/v1/accept/attendance/${props.id}`, props)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    console.log(res.data);
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
        addAttendance,
        acceptAttendance,
    };
};
