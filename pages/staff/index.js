import HeadTitle from "../../components/HeadTitle";
import LecturerLayout from "../../components/Layouts/LecturerLayout";
import axios from "../../src/lib/axios";
import { CalendarDaysIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../../src/atoms/modalAtom";
import { useAuth } from "../../src/hooks/auth";
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
import AttendanceCard from "../../components/Staff/Attendance/AttendanceCard";

const StaffDashboard = () => {
    const { user } = useAuth({ middleware: "auth" });

    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);

    const now = new Date();
    const calendarWeekInterval = eachDayOfInterval({
        start: startOfWeek(now),
        end: endOfWeek(now),
    });
    const [calendarStartDate, setCalendarStartDate] = useState("");
    const [currentDate, setCurrentDate] = useState(now);

    const {
        data: attendances,
        error,
        mutate,
    } = useSWR(`/api/v1/attendance/lecturer`, () =>
        axios
            .get(`/api/v1/attendance/lecturer`)
            .then(response => response.data.data),
    );

    return (
        <LecturerLayout header="Here's an overview of all attendaces">
            <HeadTitle title="Lecturer Dashboard" />

            <div className="bg-[#E5E5E5] relative flex items-center justify-around py-4 before:absolute before:w-full before:h-4 before:bg-white before:bottom-0 before:rounded-t-3xl pb-8 sm:before:h-0">
                {calendarWeekInterval.map((day, index) => {
                    return (
                        <button
                            onClick={() => setCurrentDate(day)}
                            key={index}
                            className="flex flex-col items-center transition duration-200 ease-in-out">
                            <div
                                className={`text-[0.6rem] font-bold  uppercase transition duration-200 ease-in-out ${
                                    format(day, "MM/dd/yyyy") ===
                                    format(currentDate, "MM/dd/yyyy")
                                        ? "text-primary"
                                        : "text-black-text"
                                }`}>
                                {format(day, "MM/dd/yyyy") ===
                                format(now, "MM/dd/yyyy")
                                    ? "Today"
                                    : format(day, "EEE")}
                            </div>
                            <div
                                className={`text-sm p-1 rounded-full inline-flex items-center justify-center h-7 w-7 transition duration-200  ease-in-out ${
                                    format(day, "MM/dd/yyyy") ===
                                    format(currentDate, "MM/dd/yyyy")
                                        ? "bg-primary text-white"
                                        : "text-black-text"
                                }`}>
                                {format(day, "dd")}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Main Content  */}
            <div className="relative rounded-t-xl sm:rounded-b-xl bg-white  pb-20 sm:min-h-0">
                <div className="flex justify-between items-center py-6 px-4 pt-1 sm:pt-4">
                    <h2 className="text-black-text font-extrabold text-2xl">
                        Attendance
                    </h2>
                    <div className="px-6 border border-primary rounded-full py-2 space-x-1 flex items-center justify-center text-primary font-bold text-sm">
                        <span>Daily</span>
                        {/* <ChevronDownIcon className="w-4 h-5" /> */}
                    </div>
                </div>
                <div className="relative px-4 pb-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentDate}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}>
                            <div className="space-y-4 sm:space-y-0 sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {attendances
                                    ?.filter(
                                        item =>
                                            item.date ===
                                            format(currentDate, "yyyy-MM-dd"),
                                    )
                                    .map((attendance, index) => {
                                        return (
                                            <AttendanceCard
                                                key={index}
                                                attendance={attendance}
                                            />
                                        );
                                    })}
                            </div>
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

export default StaffDashboard;
