import HeadTitle from "../../../components/HeadTitle";
import axios from "../../../src/lib/axios";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import CourseRepLayout from "../../../components/Layouts/CourseRepLayout";
import Image from "next/image";
import Errors from "../../../components/Errors";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import { useAttendance } from "../../../src/hooks/attendance";
import { useRecoilState } from "recoil";
import {
    attendanceLecStuState,
    confirmModalState,
} from "../../../src/atoms/attendanceAtom";

const RepCheckIn = () => {
    const { recordAttendance, loading } = useAttendance();

    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);
    const [checkInTime, setCheckInTime] = useState("");
    const [checkOutTime, setCheckOutTime] = useState("");
    const [moduleValue, setModuleValue] = useState("");
    const [attendanceLecStu, setAttendanceLecStu] = useRecoilState(
        attendanceLecStuState,
    );
    const [attendanceStatus, setAttendanceStatus] = useState("");
    const [lecturerValue, setLecturerValue] = useState("");
    const [confirmModal, setConfirmModal] = useRecoilState(confirmModalState);

    const [checkboxes, setCheckboxes] = useState([]);
    const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

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

    const ISOdate = now.toISOString().substring(0, 10);
    const startTime = new Date(Date.parse(ISOdate + "T" + checkInTime));
    const endTime = new Date(Date.parse(ISOdate + "T" + checkOutTime));

    const {
        data: courseRepModules,
        error,
        mutate,
    } = useSWR(`api/v1/course_rep/modules`, () =>
        axios
            .get(`api/v1/course_rep/modules`)
            .then(response => response.data.data),
    );

    const getLecturers = () => {
        if (moduleValue) {
            const data = courseRepModules?.filter(
                item => item.id === Number(moduleValue),
            );
            return data[0].lecturers;
        }
        return [];
    };
    const getStudents = () => {
        if (moduleValue) {
            const data = courseRepModules?.filter(
                item => item.id === Number(moduleValue),
            );
            return data[0].students;
        }
        return [];
    };

    useEffect(() => {
        getLecturers().length === 1 &&
            setLecturerValue(getLecturers()[0].id.toString());
        getStudents().length > 0 && setCheckboxes(getStudents());
    }, [getLecturers, getStudents]);

    const nextForm = event => {
        event.preventDefault();
        setAttendanceLecStu(false);
    };

    const submitForm = event => {
        event.preventDefault();
        setConfirmModal(true);
    };

    const confirmForm = event => {
        event.preventDefault();
        const selectedCheckboxesIds = selectedCheckboxes.map(cb => cb.id);
        recordAttendance({
            lecturer_id: lecturerValue,
            module_id: moduleValue,
            date: now,
            start_time: checkInTime,
            end_time: checkOutTime,
            status: attendanceStatus,
            students: selectedCheckboxesIds,
            setErrors,
            setStatus,
        });
    };

    const handleSelectAllChange = event => {
        setIsSelectAllChecked(event.target.checked);
        setCheckboxes(
            checkboxes.map(cb => {
                cb.isChecked = event.target.checked;
                return cb;
            }),
        );
        setSelectedCheckboxes(checkboxes.filter(cb => cb.isChecked));
    };

    const handleCheckboxChange = (event, id) => {
        setCheckboxes(
            checkboxes.map(cb => {
                if (cb.id === id) {
                    cb.isChecked = event.target.checked;
                }
                return cb;
            }),
        );
        setSelectedCheckboxes(checkboxes.filter(cb => cb.isChecked));
        setIsSelectAllChecked(checkboxes.every(cb => cb.isChecked));
    };

    return (
        <CourseRepLayout backNav={"/student/attendances"}>
            <HeadTitle title="Record Attendance" />

            {/* Main Content  */}
            <div className="relative rounded-t-xl sm:rounded-b-xl bg-white sm:min-h-0">
                <div className="flex justify-around items-center px-4 pt-1 sm:pt-4 bg-primary-accent border-b mb-5">
                    <button
                        className={`${
                            attendanceLecStu
                                ? "after:bg-primary text-primary"
                                : "after:bg-gray-200"
                        } tab text-gray-text`}>
                        <h1 className="text-lg font-bold ">Record Module</h1>
                    </button>
                    <button
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
                                <form className="space-y-4" onSubmit={nextForm}>
                                    <Errors className="mb-5" errors={errors} />
                                    <div className="p-4 sm:px-6 space-y-4">
                                        {errors.msg && (
                                            <p className="text-sm text-red-600 bg-red-100 p-1">
                                                {errors.msg}
                                            </p>
                                        )}
                                        <div className="relative">
                                            <div
                                                className="bg-primary-accent text-sm font-bold
                                             uppercase py-1 px-3 rounded-full text-center sm:inline-block">
                                                {format(now, "do MMMM, yyyy")}
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <h2 className="text-black-text font-bold text-lg">
                                                Lecturer Presence
                                            </h2>
                                            <div className="flex items-center justify-between bg-[#F3F3F3] p-1 rounded-full">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setAttendanceStatus(
                                                            "present",
                                                        )
                                                    }
                                                    className={`${
                                                        attendanceStatus ===
                                                        "present"
                                                            ? "bg-primary text-white"
                                                            : "text-primary font-bold"
                                                    } px-6 py-2 rounded-full min-w-[150px] sm:w-1/2 transition duration-200 ease-in-out`}>
                                                    Present
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setAttendanceStatus(
                                                            "absent",
                                                        )
                                                    }
                                                    className={`${
                                                        attendanceStatus ===
                                                        "absent"
                                                            ? "bg-primary text-white"
                                                            : "text-primary font-bold"
                                                    } px-6 py-2 rounded-full min-w-[150px] sm:w-1/2 transition duration-200 ease-in-out`}>
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
                                            <h2 className="text-black-text font-bold text-lg">
                                                Module
                                            </h2>
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
                                                    className={`${
                                                        moduleValue &&
                                                        "!border-primary"
                                                    } w-full border-2 border-gray-text text-primary font-bold capitalize p-4`}>
                                                    <option value=""></option>
                                                    {courseRepModules?.length >
                                                    0 ? (
                                                        courseRepModules
                                                            ?.filter(
                                                                item =>
                                                                    item.status ===
                                                                    "active",
                                                            )
                                                            .map(
                                                                (
                                                                    module,
                                                                    index,
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            index
                                                                        }
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
                                                        <option>
                                                            No module
                                                        </option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        {getLecturers().length > 1 && (
                                            <div>
                                                <h2 className="text-black-text font-bold text-lg">
                                                    Lecturer
                                                </h2>
                                                <div>
                                                    <select
                                                        id="lecturerValue"
                                                        value={lecturerValue}
                                                        onChange={event =>
                                                            setLecturerValue(
                                                                event.target
                                                                    .value,
                                                            )
                                                        }
                                                        required
                                                        className={`${
                                                            lecturerValue &&
                                                            "!border-primary"
                                                        } w-full border-2 border-gray-text text-primary font-bold capitalize p-4`}>
                                                        <option></option>
                                                        {getLecturers().map(
                                                            (lect, index) => (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        lect.id
                                                                    }>
                                                                    {
                                                                        lect.full_name
                                                                    }
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4 sm:px-2 ">
                                        <div className="bg-[#CCFFE24D] sm:bg-white p-4 py-5 space-y-4 border-y sm:border-none border-[#F3F3F3]">
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-black-text font-bold text-lg">
                                                    Check In Time
                                                </h2>
                                                <button
                                                    onClick={checkInNow}
                                                    className="text-primary px-5 py-2 border-2 border-primary text-sm rounded-full font-bold">
                                                    Now
                                                </button>
                                            </div>
                                            <div className="">
                                                <input
                                                    className={`${
                                                        checkInTime &&
                                                        "border-primary"
                                                    } border-2 w-full h-16 bg-white text-center text-primary text-3xl uppercase`}
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
                                                    className="text-primary px-5 py-2 border-2 border-primary rounded-full text-sm font-bold">
                                                    Now
                                                </button>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    className={`${
                                                        checkOutTime &&
                                                        "border-primary"
                                                    } border-2 w-full h-16 bg-white text-center text-primary text-3xl uppercase`}
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

                                    <div className="flex py-6 px-4 sm:px-6 items-center justify-end">
                                        <Button
                                            type="submit"
                                            className="text-white bg-primary inline-block px-12 py-3 !rounded-full capitalize font-bold ">
                                            Next
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <form
                                    className="space-y-4"
                                    onSubmit={submitForm}>
                                    <div className="overflow-x-auto bg-white  overflow-y-auto">
                                        <table className="table min-w-full transition duration-500 ease-in-out">
                                            <thead className="border-b">
                                                <tr>
                                                    <th
                                                        colSpan={2}
                                                        className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                                        Students Present
                                                    </th>
                                                    <th
                                                        colSpan={2}
                                                        className="capitalize font-bold px-2 pr-4 py-3 text-right text-sm text-primary tracking-wider whitespace-nowrap">
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                isSelectAllChecked
                                                            }
                                                            onChange={
                                                                handleSelectAllChange
                                                            }
                                                            className="w-5 h-5 rounded-full"
                                                        />{" "}
                                                        Select All
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-text text-sm ">
                                                {checkboxes.map(
                                                    (student, index) => (
                                                        <tr
                                                            className=""
                                                            key={index}>
                                                            <td className="capitalize p-3 whitespace-nowrap sm:border-b">
                                                                <Image
                                                                    src={
                                                                        student.picture
                                                                    }
                                                                    height={100}
                                                                    width={100}
                                                                    alt={
                                                                        student.index_number
                                                                    }
                                                                    className="w-10 h-10 sm:w-14 sm:h-12 sm:mx-auto rounded-full"
                                                                />
                                                            </td>
                                                            <td className="capitalize p-3 whitespace-nowrap sm:border-b">
                                                                <span>
                                                                    <div>
                                                                        {
                                                                            student.full_name
                                                                        }
                                                                    </div>
                                                                </span>
                                                            </td>
                                                            <td className="uppercase whitespace-nowrap sm:border-l sm:border-b">
                                                                <span>
                                                                    <div className="border-l sm:border-l-0 p-3">
                                                                        {
                                                                            student.index_number
                                                                        }
                                                                    </div>
                                                                </span>
                                                            </td>

                                                            <td
                                                                className="capitalize p-3 whitespace-nowrap sm:border-b text-center"
                                                                width={30}>
                                                                <span>
                                                                    <div>
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={
                                                                                student.isChecked
                                                                            }
                                                                            onChange={event =>
                                                                                handleCheckboxChange(
                                                                                    event,
                                                                                    student.id,
                                                                                )
                                                                            }
                                                                            className="w-6 h-6 rounded-full shadow-lg"
                                                                        />
                                                                    </div>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ),
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="flex py-6 px-4 items-center justify-between">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setAttendanceLecStu(true)
                                            }
                                            className="text-primary bg-primary-accent inline-block px-12 py-3 !rounded-full capitalize font-bold ">
                                            back
                                        </button>
                                        <Button
                                            type="submit"
                                            className="text-white bg-primary inline-block px-12 py-3 !rounded-full capitalize font-bold ">
                                            submit
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {confirmModal && (
                    <motion.div
                        className="fixed top-0 left-0 h-full w-full overflow-hidden bg-black/70 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <div className="relative rounded-lg flex flex-col justify-center bg-white w-full max-w-xl mx-6">
                            <div className="flex items-center border-b px-4 sm:px-6 py-4 space-x-4">
                                <h4 className="text-sm uppercase text-gray-text">
                                    {
                                        courseRepModules?.filter(
                                            item =>
                                                item.id === Number(moduleValue),
                                        )[0].module.code
                                    }
                                </h4>
                                <div className="space-x-1 text-xs py-1 px-3 rounded-full bg-primary-accent text-black-text font-bold">
                                    <span>{format(startTime, "HH:mm")}</span>
                                    <span>-</span>
                                    <span>{format(endTime, "HH:mm aa")}</span>
                                </div>
                            </div>
                            <div className="py-4 px-4 sm:px-6 space-y-5">
                                <div className="text-center space-y-2">
                                    <h1 className="text-black-text font-bold text-xl">
                                        Confirm Attendance Record
                                    </h1>
                                    <p className="text-gray-text">
                                        Your recorded attendance will be sent to
                                        the lecturer for approval.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 rounded-md bg-secondary-accent font-bold">
                                    <div className="py-2 px-6 border-r border-[#00000029] space-y-2 ">
                                        <h3 className="text-black-text text-sm">
                                            Lecturer Present
                                        </h3>
                                        <div className="text-black-text uppercase text-lg">
                                            {attendanceStatus === "present"
                                                ? "Yes"
                                                : "No"}
                                        </div>
                                    </div>
                                    <div className="py-2 px-6 space-y-2">
                                        <h3 className="text-black-text text-sm">
                                            Students Present
                                        </h3>
                                        <div className="text-black-text text-lg">
                                            {selectedCheckboxes.length}/
                                            {checkboxes.length}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Button
                                        onClick={() => setConfirmModal(false)}
                                        className="!capitalize !rounded-full !px-8"
                                        danger>
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="!capitalize !rounded-full !px-8"
                                        loader={loading}
                                        onClick={confirmForm}>
                                        Confirm
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </CourseRepLayout>
    );
};

export default RepCheckIn;
