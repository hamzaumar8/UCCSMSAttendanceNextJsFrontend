import useSWR from "swr";
import axios from "../lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter();

    // Loading
    const [isLoading, setIsLoading] = useState(true);

    // User
    const {
        data: user,
        error,
        mutate,
    } = useSWR("/api/v1/user", () =>
        axios
            .get("/api/v1/user")
            .then(res => res.data.data)
            .catch(error => {
                if (error.response.status !== 409) throw error;

                router.push("/verify-email");
            }),
    );

    // CSRF
    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const register = async ({ setErrors, ...props }) => {
        await csrf();

        setErrors([]);

        axios
            .post("/register", props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    // Login
    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf();

        setErrors([]);
        setStatus(null);

        axios
            .post("/login", props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
                // setErrors(Object.values(error.response.data.errors).flat());
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

    // Logout
    const logout = async () => {
        if (!error) {
            await axios.post("/logout").then(() => mutate());
        }

        window.location.pathname = "/login";
    };

    useEffect(() => {
        if (user) setIsLoading(false);

        if (middleware === "guest" && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated);

        if (
            window.location.pathname === "/verify-email" &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated);

        if (middleware === "auth" && error && !user) logout();
        // if (middleware == "auth" && !user) logout();
    }, [user, error]);

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        isLoading,
        csrf,
        logout,
    };
};
