import useSWR from "swr";
import axios from "../lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./auth";

export const useAttendance = () => {
    const router = useRouter();

    const { user, csrf } = useAuth({ middleware: "auth" });

    const [loading, setLoading] = useState(false);

    const addAttendance = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        await csrf();
        setErrors([]);
        setStatus(null);

        axios
            .post("/api/v1/attendances", props)
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error;
                setErrors(error.response.data.errors);
            });
        setLoading(false);
    };

    // const {
    //     data: lecturerAttendance,
    //     error,
    //     mutate,
    // } = useSWR(`api/v1/attandances/${user.lecturer.id}`, () =>
    //     axios
    //         .get(`api/v1/attendances/${user.lecturer.id}`)
    //         .then(response => response.data.data),
    // );

    return {
        loading,
        addAttendance,
        // lecturerAttendance,
    };
};
