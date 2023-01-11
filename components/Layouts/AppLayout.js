import Navigation from "./Navigation";
import { useAuth } from "../../src/hooks/auth";
import SideNav from "./SideNav";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import Modal from "../Modal";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../../src/atoms/modalAtom.js";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import PageLoader from "../PageLoader";

const AppLayout = ({ header = "", children }) => {
    const router = useRouter();
    const { user, isLoading } = useAuth({ middleware: "auth" });

    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);

    if (isLoading || !user) {
        return <PageLoader loading={isLoading} />;
    }
    // if (user.role === "STF") router.push("/staff");
    // if (user.role === "USR") router.push("/user");

    return (
        <div className="bg-[#E5E5E5]">
            {/* Side Navigation */}
            <SideNav />
            <main className="bg-gray-100 ease-soft-in-out xl:ml-[18rem] relative min-h-screen rounded-xl transition-all duration-200">
                <Navigation user={user} header={header} />

                {/* Page Content */}
                <section className="w-full px-6 sm:px-8 lg:px-12 py-6  sm:py-8 mx-auto">
                    {children}
                </section>
            </main>
            <AnimatePresence>
                {modalOpen && (
                    <Modal
                        handleClose={() => setModalOpen(false)}
                        type={modalType}
                    />
                )}
            </AnimatePresence>

            <ToastContainer />
        </div>
    );
};

export default AppLayout;
