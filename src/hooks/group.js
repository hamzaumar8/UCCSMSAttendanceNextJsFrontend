import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import axios from "../lib/axios";

export const useGroup = () => {
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
        await csrf();

        axios
            .post("/api/v1/groups", props)
            .then(res => {
                if (res.data.status === "success") {
                    setLoading(false);
                    setModalOpen(false);
                    toast.success("Group Generated succesfully", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    refreshData();
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
    const deleteGroup = async ({ id }) => {
        setLoading(true);
        await csrf();

        axios
            .delete(`/api/v1/groups/${id}`)
            .then(res => {
                setLoading(false);
                toast.success("Group Generated succesfully", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                refreshData();
            })
            .catch(error => {
                setLoading(false);
                console.log(error);
            });
    };

    return {
        loading,
        genrateGroups,
        deleteGroup,
    };
};
