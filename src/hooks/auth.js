import useSWR from "swr";
import axios from "../lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const useAuth = ({ middleware } = {}) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    const {
        data: user,
        error,
        mutate,
    } = useSWR("/api/v1/user", () =>
        axios
            .get("/api/v1/user")
            .then(res => res.data.data)
            .catch(error => {
                console.log(error.response.data.errors);
            }),
    );

    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const login = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        await csrf();
        setErrors([]);
        setStatus(null);

        axios
            .post("/login", props)
            .then(() => {
                setLoading(false);
                mutate();
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf();

        setErrors([]);
        setStatus(null);

        axios
            .post("/forgot-password", { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf();

        setErrors([]);
        setStatus(null);

        axios
            .post("/reset-password", { token: router.query.token, ...props })
            .then(response =>
                router.push("/login?reset=" + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post("/email/verification-notification")
            .then(response => setStatus(response.data.status));
    };

    const logout = async () => {
        if (!error) {
            await axios.post("/logout").then(() => mutate());
        }

        window.location.pathname = "/login";
    };

    useEffect(() => {
        if (user) setIsLoading(false);

        if (middleware === "guest" && user) {
            if (user.role === "ADM") router.push("/dashboard");
            if (user.role === "STF") router.push("/staff");
            if (user.role === "USR") router.push("/user");
        }

        if (middleware === "auth" && error) logout();
    }, [user, error]);

    return {
        user,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
        loading,
        isLoading,
    };
};
