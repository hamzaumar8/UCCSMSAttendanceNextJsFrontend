import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import HeadTitle from "../../../components/HeadTitle";
import LecturerLayout from "../../../components/Layouts/LecturerLayout";
import AttendanceChart from "../../../components/Modals/Staff/AttendanceChart";
import axios from "../../../src/lib/axios";

const Attendance = ({ attendance }) => {
    const lectureWeekly = Object.values(attendance.weekly.lecturer);
    const studentsWeekly = Object.values(attendance.weekly.students);

    const [classListToggler, setClassListToggler] = useState(false);
    const [truancyListToggler, setTruancyListToggler] = useState(false);

    const truancyList = attendance.module.students.filter(
        item => item.attendance_stats.present_percentage < 50,
    );
    return (
        <LecturerLayout backNav={"/staff"}>
            <HeadTitle title="Lecturer Dashboard" />
            <div className="relative space-y-8 last:mb-6">
                <div className="bg-white relative overflow-hidden shadow-sm sm:rounded-lg transition duration-200 ease-in-out border border-primary-accent">
                    <div className="p-5 pt-2 flex items-center justify-between border-b bg-primary-accent">
                        <div>
                            <div className="text-gray-text font-bold text-sm">
                                {attendance.module.module.code}
                            </div>
                            <h1 className="text-lg font-extrabold">
                                Attendance Overview
                            </h1>
                        </div>
                        <div className="border border-primary px-6 font-bold text-primary py-2 text-sm rounded-full">
                            Weekly
                        </div>
                    </div>
                    <AttendanceChart
                        lectureWeekly={lectureWeekly}
                        studentsWeekly={studentsWeekly}
                    />
                </div>

                <div className="bg-white relative overflow-hidden shadow-md sm:rounded-lg transition duration-200 ease-in-out p-4 border-t">
                    <div
                        onClick={() => setClassListToggler(!classListToggler)}
                        className="cursor-pointer flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-black-text">
                                Class List
                            </span>
                            <span className="p-1.5 text-xs font-bold bg-primary flex items-center justify-center w-[28px] h-[28px] text-white rounded-full">
                                {attendance.module.students.length}
                            </span>
                        </div>
                        <div
                            className={`${
                                classListToggler && "rotate-180"
                            } transition `}>
                            <ChevronDownIcon className="h-5 w-5" />
                        </div>
                    </div>
                    <div
                        className={`${
                            classListToggler ? "block" : "hidden"
                        } border-t  mt-4 py-2`}>
                        <div className="overflow-x-auto bg-white overflow-y-auto">
                            <table className="table min-w-full transition duration-500 ease-in-out">
                                <tbody className="text-black-text text-sm">
                                    {attendance.module.students.map(
                                        (student, index) => (
                                            <tr
                                                className="text-sm font-bold"
                                                key={index}>
                                                <td className="capitalize whitespace-nowrap text-left p-2">
                                                    <Image
                                                        src={student.picture}
                                                        height={100}
                                                        width={100}
                                                        alt={
                                                            student.index_number
                                                        }
                                                        className="rounded-full w-8 h-8"
                                                    />
                                                </td>
                                                <td className="capitalize whitespace-nowrap p-2">
                                                    {student.full_name}
                                                </td>
                                                <td className="uppercase whitespace-nowrap text-right p-2">
                                                    {student.index_number}
                                                </td>
                                                <td className="uppercase text-right whitespace-nowrap p-2">
                                                    <span className="text-primary bg-primary-accent w-6 h-6 text-xs inline-flex rounded-full items-center justify-center">
                                                        {
                                                            student
                                                                .attendance_stats
                                                                .present
                                                        }
                                                    </span>
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="bg-white relative overflow-hidden shadow-md sm:rounded-lg transition duration-200 ease-in-out p-4 border-t">
                    <div
                        onClick={() =>
                            setTruancyListToggler(!truancyListToggler)
                        }
                        className="cursor-pointer flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-black-text">
                                Truancy List
                            </span>
                            <span className="p-1.5 text-xs font-bold bg-red-600 flex items-center justify-center w-[28px] h-[28px] text-white rounded-full">
                                {truancyList.length}
                            </span>
                        </div>
                        <div
                            className={`${
                                truancyListToggler && "rotate-180"
                            } transition `}>
                            <ChevronDownIcon className="h-5 w-5" />
                        </div>
                    </div>
                    <div
                        className={`${
                            truancyListToggler ? "block" : "hidden"
                        } border-t  mt-4 py-2`}>
                        <div className="overflow-x-auto bg-white overflow-y-auto">
                            <table className="table min-w-full transition duration-500 ease-in-out">
                                <tbody className="text-black-text text-sm">
                                    {truancyList.map((student, index) => (
                                        <tr
                                            className="text-sm font-bold"
                                            key={index}>
                                            <td className="capitalize whitespace-nowrap text-left p-2">
                                                <Image
                                                    src={student.picture}
                                                    height={100}
                                                    width={100}
                                                    alt={student.index_number}
                                                    className="rounded-full w-8 h-8"
                                                />
                                            </td>
                                            <td className="capitalize whitespace-nowrap p-2">
                                                {student.full_name}
                                            </td>
                                            <td className="uppercase whitespace-nowrap text-right p-2">
                                                {student.index_number}
                                            </td>
                                            <td className="uppercase text-right whitespace-nowrap p-2">
                                                <span className="text-danger bg-red-200 w-6 h-6 text-xs inline-flex rounded-full items-center justify-center">
                                                    {
                                                        student.attendance_stats
                                                            .present
                                                    }
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </LecturerLayout>
    );
};

export default Attendance;

export async function getStaticPaths() {
    const response = await axios.get("/api/v1/attendance_lecturer");
    return {
        paths: response.data.data.map(attendance => ({
            params: { id: attendance.id.toString() },
        })),
        fallback: false, // can also be true or 'blocking'
    };
}

export async function getStaticProps({ params }) {
    const response = await axios.get(
        `/api/v1/attendance_lecturer/${params.id}`,
    );
    return {
        props: {
            attendance: response.data.data,
        },
    };
}
