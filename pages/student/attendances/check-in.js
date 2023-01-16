import HeadTitle from "../../../components/HeadTitle";
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
import StudentLayout from "../../../components/Layouts/StudentLayout";
import Link from "next/link";
import Image from "next/image";
import Errors from "../../../components/Errors";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import { useAttendance } from "../../../src/hooks/attendance";

const RepCheckIn = () => {
    const { loading } = useAttendance();

    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);
    const [checkInTime, setCheckInTime] = useState("");
    const [checkOutTime, setCheckOutTime] = useState("");
    const [moduleValue, setModuleValue] = useState("");
    const [attendanceLecStu, setAttendanceLecStu] = useState(true);
    const [attendanceStatus, setAttendanceStatus] = useState("");

    const now = new Date();
    const checkInNow = event => {
        event.preventDefault();
        let nowHour = now.getHours();
        let nowMin = now.getMinutes();
        if (nowHour < 10) nowHour = `0${nowHour}`;
        if (nowMin < 10) nowMin = `0${nowMin}`;
        setCheckInTime(`${nowHour}:${nowMin}`);
    };
    const checkOutNow = event => {
        event.preventDefault();
        let nowHour = now.getHours();
        let nowMin = now.getMinutes();
        if (nowHour < 10) nowHour = `0${nowHour}`;
        if (nowMin < 10) nowMin = `0${nowMin}`;
        setCheckOutTime(`${nowHour}:${nowMin}`);
    };

    // const {
    //     data: attendances,
    //     error,
    //     mutate,
    // } = useSWR(`/api/v1/attendance/lecturer`, () =>
    //     axios
    //         .get(`/api/v1/attendance/lecturer`)
    //         .then(response => response.data.data),
    // );

    const submitForm = event => {
        event.preventDefault();
        // addAttendance({
        //     lecturer_id: lecturer.id,
        //     module_id: moduleValue,
        //     date: now,
        //     start_time: checkInTime,
        //     end_time: checkOutTime,
        //     setErrors,
        //     setStatus,
        // });
    };
    return (
        <StudentLayout backNav={"/student/attendances"}>
            <HeadTitle title="Lecturer Dashboard" />

            {/* Main Content  */}
            <div className="relative rounded-t-xl sm:rounded-b-xl bg-white sm:min-h-0">
                <div className="flex justify-around items-center px-4 pt-1 sm:pt-4 bg-primary-accent border-b mb-5">
                    <button
                        onClick={() => setAttendanceLecStu(true)}
                        className={`${
                            attendanceLecStu
                                ? "after:bg-primary text-primary"
                                : "after:bg-gray-200"
                        } tab text-gray-text`}>
                        <h1 className="text-lg font-bold ">Record Module</h1>
                    </button>
                    <button
                        onClick={() => setAttendanceLecStu(false)}
                        className={`${
                            !attendanceLecStu
                                ? "after:bg-primary text-primary"
                                : "after:bg-gray-200"
                        } tab text-gray-text`}>
                        <h1 className="text-lg font-bold ">Class Attendance</h1>
                    </button>
                </div>
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={attendanceLecStu ? "Lecturer" : "Class"}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}>
                            {attendanceLecStu ? (
                                <form
                                    className="space-y-4"
                                    onSubmit={submitForm}>
                                    <Errors className="mb-5" errors={errors} />
                                    <div className="p-4 space-y-4">
                                        {errors.msg && (
                                            <p className="text-sm text-red-600 bg-red-100 p-1">
                                                {errors.msg}
                                            </p>
                                        )}
                                        <div className="relative">
                                            <Label>Lecturer Presence</Label>
                                            <div className="flex items-center justify-between bg-[#F3F3F3] p-1 rounded-full">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setAttendanceStatus(
                                                            true,
                                                        )
                                                    }
                                                    className={`${
                                                        attendanceStatus ===
                                                        true
                                                            ? "bg-primary text-white"
                                                            : "text-primary font-bold"
                                                    } px-6 py-2 rounded-full min-w-[150px] transition duration-200 ease-in-out`}>
                                                    Present
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setAttendanceStatus(
                                                            false,
                                                        )
                                                    }
                                                    className={`${
                                                        attendanceStatus ===
                                                        false
                                                            ? "bg-primary text-white"
                                                            : "text-primary font-bold"
                                                    } px-6 py-2 rounded-full min-w-[150px] transition duration-200 ease-in-out`}>
                                                    Absent
                                                </button>
                                            </div>
                                            {attendanceStatus === "" && (
                                                <input
                                                    tabIndex={-1}
                                                    autoComplete="off"
                                                    style={{
                                                        position: "absolute",
                                                        opacity: 0,
                                                        width: "100%",
                                                    }}
                                                    required
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <Label>Module</Label>
                                            <div>
                                                <select
                                                    id="moduleValue"
                                                    value={moduleValue}
                                                    onChange={event =>
                                                        setModuleValue(
                                                            event.target.value,
                                                        )
                                                    }
                                                    required
                                                    className="w-full text-black-text font-bold capitalize p-4 border-primary-accent">
                                                    <option></option>
                                                    {/* {lecturer?.modules.length >
                                                0 ? (
                                                    lecturer?.modules
                                                        .filter(
                                                            item =>
                                                                item.status ===
                                                                "active",
                                                        )
                                                        .map(
                                                            (module, index) => (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        module.id
                                                                    }>
                                                                    {
                                                                        module
                                                                            .module
                                                                            .code
                                                                    }{" "}
                                                                    -{" "}
                                                                    {
                                                                        module
                                                                            .module
                                                                            .title
                                                                    }
                                                                </option>
                                                            ),
                                                        )
                                                ) : (
                                                    <option>No module</option>
                                                )} */}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-[#CCFFE24D] p-4 py-5 space-y-4 border-y border-[#F3F3F3]">
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-black-text font-bold text-lg">
                                                    Check In Time
                                                </h2>
                                                <button
                                                    onClick={checkInNow}
                                                    className="text-primary px-5 py-2 border border-primary text-sm rounded-full font-bold">
                                                    Now
                                                </button>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    className="border w-full h-16 bg-white text-center text-3xl rounded-md uppercase"
                                                    type="time"
                                                    id="checkInTime"
                                                    value={checkInTime}
                                                    onChange={event =>
                                                        setCheckInTime(
                                                            event.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-black-text font-bold text-lg">
                                                    Check Out Time
                                                </h2>
                                                <button
                                                    onClick={checkOutNow}
                                                    className="text-primary px-5 py-2 border border-primary rounded-full text-sm font-bold">
                                                    Now
                                                </button>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    className="border w-full h-16 bg-white text-center text-3xl rounded-md uppercase"
                                                    type="time"
                                                    id="checkOutTime"
                                                    value={checkOutTime}
                                                    onChange={event =>
                                                        setCheckOutTime(
                                                            event.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex py-6 px-4 items-center justify-end">
                                        <Button
                                            loader={loading}
                                            type="submit"
                                            className="text-white bg-primary inline-block px-12 py-3 !rounded-full capitalize font-bold ">
                                            {loading ? "loading" : "Submit"}
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <div>Attendance</div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </StudentLayout>
    );
};

export default RepCheckIn;
