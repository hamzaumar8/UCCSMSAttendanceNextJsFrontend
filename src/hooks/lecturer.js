import useSWR from "swr";
import axios from "../lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./auth";

export const useLecturer = ({ user }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const {
        data: currentLecturer,
        error,
        mutate,
    } = useSWR(`api/v1/lecturers/${user?.lecturer.id}`, () =>
        axios
            .get(`api/v1/lecturers/${user?.lecturer.id}`)
            .then(response => response.data.data),
    );

    return {
        loading,
        currentLecturer,
    };
};
