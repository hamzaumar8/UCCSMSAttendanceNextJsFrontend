import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import axios from "../lib/axios";

export const useLevel = () => {
    const router = useRouter();

    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [loading, setLoading] = useState(false);

    const refreshData = () => {
        router.replace(router.asPath);
    };

    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const genrateGroups = async ({ setErrors, setStatus, ...props }) => {
        setLoading(true);
        setErrors([]);
        setStatus(null);
        console.log(props.level);
        await csrf();

        axios
            .put(`/api/v1/generate/level/${props.level}`, props)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    setModalOpen(false);
                    refreshData();
                    toast.success("Group Generated succesfully", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    router.push(`/groups/${props.level}`);
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
        genrateGroups,
    };
};
