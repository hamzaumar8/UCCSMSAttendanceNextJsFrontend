import { useAuth } from "../../src/hooks/auth";
import { AnimatePresence } from "framer-motion";
import Modal from "../Modal";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../../src/atoms/modalAtom.js";
import { useRouter } from "next/router";
import LecturerNavigation from "./Lecturer/LecturerNavigation";
import LecturerBackNavigation from "./Lecturer/LecturerBackNavigation";
import LecturerSideNav from "./Lecturer/LecturerSideNav";
import PageLoader from "../PageLoader";

const LecturerLayout = ({ header = "", backNav = "", children }) => {
    const router = useRouter();
    const { user, isLoading } = useAuth({ middleware: "auth" });

    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);

    if (user?.role === "ADM") router.push("/dashboard");
    if (user?.role === "USR" || user?.role === "REP") router.push("/user");

    if (isLoading || !user) {
        return <PageLoader loading={isLoading} />;
    }
    return (
        <div className="bg-white sm:bg-[#E5E5E5]">
            {/* Side Navigation */}
            <LecturerSideNav />
            <main className="ease-in-out xl:ml-[18rem] relative min-h-screen rounded-xl transition-all duration-200">
                {backNav ? (
                    <LecturerBackNavigation backNav={backNav} />
                ) : (
                    <LecturerNavigation user={user} header={header} />
                )}
                {/* Page Content */}
                <section className="w-full sm:px-6 sm:pb-10">
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
        </div>
    );
};

export default LecturerLayout;
