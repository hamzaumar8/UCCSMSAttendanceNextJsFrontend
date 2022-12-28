import { XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { modalEditState } from "../src/atoms/modalAtom";
import Backdrop from "./Backdrop";
import LecturerAddForm from "./Modals/Lecturers/LecturerAddForm";
import ModuleEditForm from "./Modals/Module/ModuleEditForm";
import CheckInModal from "./Modals/Staff/CheckInModal";
import StudentAddForm from "./Modals/students/StudentAddForm";
import SlideUp from "./SlideUp";
import ModuleMountForm from "./Modals/Module/ModuleMountForm";
import ModuleAddForm from "./Modals/Module/ModuleAddForm";

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

const gifYouUp = {
    hidden: {
        opacity: 0,
        scale: 0,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2,
            ease: "easeIn",
        },
    },
    exit: {
        opacity: 0,
        scale: 0,
        transition: {
            duration: 0.15,
            ease: "easeOut",
        },
    },
};

const Modal = ({ handleClose, type }) => {
    const [modalEdit, setModalEdit] = useRecoilState(modalEditState);
    return (
        <>
            {type === "addStudent" && (
                <Backdrop>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="rounded-lg flex flex-col justify-center z-0 bg-primary-accent w-full max-w-xl mx-6  after:absolute after:-top-2 after:-left-2 after:w-full after:h-full after:bg-white after:-z-10 after:rounded-lg after:shadow-md">
                        <StudentAddForm onClick={handleClose} />
                    </motion.div>
                </Backdrop>
            )}

            {type === "addModule" && (
                <Backdrop>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="rounded-lg flex flex-col justify-center z-0 bg-primary-accent w-full max-w-xl mx-6  after:absolute after:-top-2 after:-left-2 after:w-full after:h-full after:bg-white after:-z-10 after:rounded-lg after:shadow-md">
                        <ModuleAddForm onClick={handleClose} />
                    </motion.div>
                </Backdrop>
            )}

            {type === "mountModule" && (
                <Backdrop>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="rounded-lg flex flex-col justify-center z-0 bg-primary-accent w-full max-w-xl mx-6  after:absolute after:-top-2 after:-left-2 after:w-full after:h-full after:bg-white after:-z-10 after:rounded-lg after:shadow-md">
                        <ModuleMountForm onClick={handleClose} />
                    </motion.div>
                </Backdrop>
            )}

            {type === "editModule" && (
                <Backdrop>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="rounded-lg flex flex-col justify-center z-0 bg-primary-accent w-full max-w-xl mx-6  after:absolute after:-top-2 after:-left-2 after:w-full after:h-full after:bg-white after:-z-10 after:rounded-lg after:shadow-md">
                        <ModuleEditForm
                            onClick={handleClose}
                            module={modalEdit}
                        />
                    </motion.div>
                </Backdrop>
            )}

            {type === "addlecturer" && (
                <Backdrop>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="rounded-lg flex flex-col justify-center z-0 bg-primary-accent w-full max-w-xl mx-6  after:absolute after:-top-2 after:-left-2 after:w-full after:h-full after:bg-white after:-z-10 after:rounded-lg after:shadow-md">
                        <LecturerAddForm onClick={handleClose} />
                    </motion.div>
                </Backdrop>
            )}

            {type === "gifYouUp" && (
                <Backdrop onClick={handleClose}>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        className="rounded-lg md:rounded-r-none flex flex-col md:flex-row bg-[#1D2226] w-full max-w-6xl -mt-[7vh] mx-6 overflow-hidden"
                        variants={gifYouUp}
                        initial="hidden"
                        animate="visible"
                        exit="exit">
                        <motion.img
                            alt=""
                            onDoubleClick={handleClose}
                            src={"post.photoUrl"}
                            className="object-contain max-h-[80vh] w-full max-w-3xl"
                        />
                        {/*
                    <div className="w-full md:w-3/5 bg-white">
                        <Post post={post} modalPost />
                    </div> */}
                    </motion.div>
                </Backdrop>
            )}

            {type === "slideUp" && (
                <SlideUp onClick={handleClose}>
                    <CheckInModal />
                </SlideUp>
            )}
        </>
    );
};

export default Modal;
