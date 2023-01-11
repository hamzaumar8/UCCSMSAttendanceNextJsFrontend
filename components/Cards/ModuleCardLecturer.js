import { ArrowTrendingDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Button from "../Button";
import { format } from "date-fns";
import { useAttendance } from "../../src/hooks/attendance";
import { useState } from "react";
const ModuleCardLecturer = ({ attendance }) => {
    const { acceptAttendance, loading } = useAttendance();
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);
    const attendanceStatus = attendance.module.status;
    const author = attendance.author;
    const startTime = new Date(
        Date.parse(attendance.date + "T" + attendance.start_time),
    );
    const endTime = new Date(
        Date.parse(attendance.date + "T" + attendance.end_time),
    );

    // Add attendance
    const handleAccept = event => {
        event.preventDefault();
        acceptAttendance({
            id: attendance.id,
            setErrors,
            setStatus,
        });
    };
    return (
        <>
            {author === "lecturer" ? (
                <Link
                    href={`/staff/attendances/${attendance.id}`}
                    className={`${
                        attendanceStatus === "active"
                            ? "bg-secondary"
                            : "bg-primary-accent"
                    } rounded-lg block transition ease-in-out duration-300`}>
                    <div className="border-b border-[#00000029] flex items-center justify-between p-4">
                        <div className="flex items-center space-x-3 text-xs font-extrabold text-black-text">
                            <h2 className="uppercase">
                                {attendance.module.module.code}
                            </h2>
                            <div className="rounded-full border-2 border-gray-900 py-1 px-3">
                                {attendance.module.days.covered}/
                                <span className="text-gray-500 mr-1">
                                    {attendance.module.days.total}
                                </span>{" "}
                                Days
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 space-y-3">
                        <h1 className="capitalize font-gray-800 text-lg font-bold">
                            {attendance.module.module.title}
                        </h1>
                        <div
                            className={`grid grid-cols-2 rounded-md ${
                                attendanceStatus === "active"
                                    ? "bg-secondary-accent"
                                    : "bg-white"
                            }`}>
                            <div className="py-2 px-6 border-r border-[#00000029] space-y-2 ">
                                <h3 className="text-xs font-bold text-black-text">
                                    My Attendance
                                </h3>
                                <div className="font-bold text-black-text">
                                    {attendance.total.present}/
                                    {attendance.total.count}
                                </div>
                            </div>
                            <div className="py-2 px-6 space-y-2">
                                <h3 className="text-xs font-bold text-black-text">
                                    Students Present
                                </h3>
                                <div className="font-bold text-lg flex items-center space-x-2 text-black-text">
                                    <span>
                                        {attendance.total.student.present}/
                                        {attendance.total.student.count}{" "}
                                    </span>
                                    {attendance.total.student.present >
                                        attendance.total.student.absent && (
                                        <span>
                                            <ArrowTrendingDownIcon className="h-6 w-6 text-green-700" />
                                        </span>
                                    )}
                                    {attendance.total.student.present <
                                        attendance.total.student.absent && (
                                        <span>
                                            <ArrowTrendingDownIcon className="h-6 w-6 text-red-700" />
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ) : (
                <div className="bg-primary-accent rounded-lg block transition ease-in-out duration-300">
                    <div className="border-b border-[#00000029] flex items-center justify-between p-4">
                        <div className="flex items-center space-x-3 text-xs font-extrabold text-black-text">
                            <h2 className="uppercase">
                                {attendance.module.module.code}
                            </h2>
                            <div className="rounded-full border-2 border-gray-900 py-1 px-3 space-x-1">
                                <span>{format(startTime, "HH:mm")}</span>
                                <span className="text-gray-500">-</span>
                                <span>{format(endTime, "HH:mm aa")}</span>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 space-y-3">
                        <h1 className="font-gray-800 text-lg font-bold">
                            Attendance for the day sumitted by Course Rep
                        </h1>
                        <div className="grid grid-cols-2 rounded-md bg-white">
                            <div className="py-2 px-6 border-r border-[#00000029] space-y-2 ">
                                <h3 className="text-xs font-bold text-black-text">
                                    lecturer Present
                                </h3>
                                <div className="uppercase font-bold text-black-text">
                                    {attendance.status === "present"
                                        ? "Yes"
                                        : "No"}
                                </div>
                            </div>
                            <div className="py-2 px-6 space-y-2">
                                <h3 className="text-xs font-bold text-black-text">
                                    Students Present
                                </h3>
                                <div className="font-bold text-lg flex items-center space-x-2 text-black-text">
                                    <span>
                                        {attendance.total.student.present}/
                                        {attendance.total.student.count}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex py-4 items-center justify-between">
                            <Button
                                danger
                                className="px-8 !rounded-full !capitalize">
                                Reject
                            </Button>
                            <Button
                                loader={loading}
                                className="px-8 !rounded-full !capitalize"
                                onClick={handleAccept}>
                                Accept
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModuleCardLecturer;
