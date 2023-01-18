import useSWR from "swr";
import axios from "../lib/axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { modalTypeState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import {
    attendanceLecStuState,
    confirmModalState,
} from "../atoms/attendanceAtom";

export const useAttendance = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [modalType, setModalType] = useRecoilState(modalTypeState);
    const [confirmModal, setConfirmModal] = useRecoilState(confirmModalState);
    const [attendanceLecStu, setAttendanceLecStu] = useRecoilState(
        attendanceLecStuState,
    );
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

    const recordAttendance = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        await csrf();
        setErrors([]);
        setStatus(null);

        axios
            .post("/api/v1/attendances/", props)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    console.log(res.data);
                }
            })
            .catch(error => {
                setLoading(false);
                setConfirmModal(false);
                setAttendanceLecStu(true);
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
        recordAttendance,
    };
};
