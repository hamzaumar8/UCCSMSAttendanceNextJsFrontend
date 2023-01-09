import { useAuth } from "../../src/hooks/auth";
import { AnimatePresence } from "framer-motion";
import Modal from "../Modal";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../../src/atoms/modalAtom.js";
import { useRouter } from "next/router";
import LecturerNavigation from "./Navigation/LecturerNavigation";
import LecturerSideNav from "./SideNav/LecturerSideNav";

const LecturerLayout = ({ header = "", children }) => {
    const router = useRouter();

    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);
    const { user, isLoading } = useAuth({ middleware: "auth" });

    if (isLoading || !user) {
        return <>Loading...</>;
    }

    if (user.role !== "STF") {
        if (user.role === "ADM") router.push("/dashboard");
        if (user.role === "USR" || user.role === "REP") router.push("/user");
    }
    return (
        <div className="bg-[#E5E5E5]">
            {/* Side Navigation */}
            <LecturerSideNav />
            <main className="ease-in-out xl:ml-[18rem] relative min-h-screen rounded-xl transition-all duration-200">
                <LecturerNavigation user={user} header={header} />
                {/* Page Content */}
                <section className="w-full sm:px-6 sm:pb-10">
                    {children}
                </section>
            </main>
            <AnimatePresence>
                {modalOpen && (
                    <Modal
                        handleClose={() => setModalOpen(false)}
                        // type="slideUp"
                        type={modalType}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default LecturerLayout;
