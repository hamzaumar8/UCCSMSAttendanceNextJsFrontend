import HeadTitle from "../../../components/HeadTitle";
import LecturerLayout from "../../../components/Layouts/LecturerLayout";
import axios from "../../../src/lib/axios";
import { CalendarDaysIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../../../src/atoms/modalAtom";
import { useAuth } from "../../../src/hooks/auth";
import useSWR from "swr";
import { useEffect, useState } from "react";
import {
    eachDayOfInterval,
    addDays,
    addWeeks,
    format,
    getTime,
    startOfWeek,
    endOfWeek,
} from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import AttendanceCard from "../../../components/Staff/Attendance/AttendanceCard";
import ElementNotFound from "../../../components/ElementNorFound";
import ModuleCardLecturer from "../../../components/Cards/ModuleCardLecturer";

const StaffModules = () => {
    const { user } = useAuth({ middleware: "auth" });

    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);

    const now = new Date();
    const calendarWeekInterval = eachDayOfInterval({
        start: startOfWeek(now),
        end: endOfWeek(now),
    });
    const [currentDate, setCurrentDate] = useState(now);

    const {
        data: lecturerModules,
        error,
        mutate,
    } = useSWR(`/api/v1/lecturer/modules`, () =>
        axios
            .get(`/api/v1/lecturer/modules`)
            .then(response => response.data.data),
    );

    console.log(lecturerModules);

    return (
        <LecturerLayout header="My Modules">
            <HeadTitle title="Lecturer Modules" />

            {/* Main Content  */}
            <div className="relative rounded-t-xl sm:rounded-b-xl bg-white  pb-20 sm:min-h-0">
                <div className="flex justify-between items-center py-6 px-4 pt-1 sm:pt-4">
                    <h2 className="text-black-text font-extrabold text-2xl">
                        My Modules
                    </h2>
                </div>
                <div className="relative px-4 pb-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentDate}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}>
                            {lecturerModules?.length > 0 ? (
                                <div className="space-y-4 sm:space-y-0 sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {lecturerModules?.map((module, index) => {
                                        return (
                                            <ModuleCardLecturer
                                                key={index}
                                                module={module}
                                            />
                                        );
                                    })}
                                </div>
                            ) : (
                                <ElementNotFound>
                                    <h2 className="text-xl sm:text-2xl text-primary font-bold">
                                        No Active Module Availble
                                    </h2>
                                    <p className="text-gray-text font-[500]">
                                        Sorry! You don't have any module checked
                                        in for the day yet.
                                    </p>
                                </ElementNotFound>
                            )}
                        </motion.div>
                    </AnimatePresence>
                    <div className="fixed bottom-20 right-4">
                        <button
                            onClick={() => {
                                setModalOpen(true);
                                setModalType("slideUp");
                            }}
                            className="inline-flex items-center px-6 py-3 bg-primary text-white border border-transparent rounded-full font-semibold text-xs capitalize tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity:25 transition ease-in-out duration-150 space-x-2">
                            <CalendarDaysIcon className="h-5 w-5" />
                            <span className="text-xs ">Check In</span>
                        </button>
                    </div>
                </div>
            </div>
        </LecturerLayout>
    );
};

export default StaffModules;

export async function getServerSideProps() {
    // const studentsResponse = await axios.get("api/v1/students");
    // const students = studentsResponse.data.data;
    return {
        props: {},
    };
}
