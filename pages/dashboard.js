import AppLayout from "../components/Layouts/AppLayout";
import axios from "../src/lib/axios";
import Card from "../components/Card";
import HeadTitle from "../components/HeadTitle";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Dashboard = ({ modules, lecturers, cordinators, students }) => {
    const [attendanceLecStu, setAttendanceLecStu] = useState(true);
    const modulesActive = modules.filter(itm => itm.status == "active");
    
    return (
        <AppLayout header="Dashboard">
            <HeadTitle title="Dashboard" />

            <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-8">
                    <div className="col-span-1 xl:col-span-2 ">
                        <Card
                            header={
                                <h1 className="flex text-gray-text space-x-2 items-center uppercase text-sm font-semibold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                        />
                                    </svg>
                                    <span>
                                        {new Date().toLocaleString("en-US", {
                                            day: "2-digit",
                                        })}{" "}
                                        {new Date().toLocaleString("en-US", {
                                            month: "long",
                                        })}
                                    </span>
                                </h1>
                            }>
                            <div className="mr-16 space-y-4">
                                <h1 className="text-black-text text-lg font-bold">
                                    Summary
                                </h1>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between bg-green-300 p-2 rounded-md">
                                        <div className="flex space-x-4 items-center">
                                            <div className="bg-blue-700 h-2 w-2 rounded-full"></div>
                                            <h3>Active Modules</h3>
                                        </div>
                                        <div className="bg-white text-xs font-semibold block px-1 text-center rounded-lg w-[50px] py-0.5 mr-6">
                                            <span>{modulesActive.length}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                                        <div className="flex space-x-4 items-center">
                                            <div className="bg-blue-700 h-2 w-2 rounded-full"></div>
                                            <h3>Lectures Population</h3>
                                        </div>
                                        <div className="bg-white text-xs font-semibold block px-1 text-center rounded-lg w-[50px] py-0.5 mr-6">
                                            <span>{lecturers.length}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                                        <div className="flex space-x-4 items-center">
                                            <div className="bg-blue-700 h-2 w-2 rounded-full"></div>
                                            <h3>Students Poulation</h3>
                                        </div>
                                        <div className="bg-white text-xs font-semibold block px-1 text-center rounded-lg w-[50px] py-0.5 mr-6">
                                            <span>{students.length}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between bg-blue-100 p-2 rounded-md">
                                        <div className="flex space-x-4 items-center">
                                            <div className="bg-blue-700 h-2 w-2 rounded-full"></div>
                                            <h3>Cordinators Population</h3>
                                        </div>
                                        <div className="bg-white text-xs font-semibold block px-1 text-center rounded-lg w-[50px] py-0.5 mr-6">
                                            <span>{cordinators.length}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    {/* Active Modules Card */}
                    <div className="col-span-1 xl:col-span-3">
                        <Card
                            header={
                                <h1 className="text-black-text font-extrabold capitalize">
                                    Active Mdoules
                                </h1>
                            }>
                            <div className="space-y-3">
                                {modulesActive.map(activeModule => (
                                    <div
                                        key={activeModule.id}
                                        className="flex items-center justify-between p-1">
                                        <div className="flex space-x-2 items-center">
                                            <div className="flex items-center justify-center bg-primary-accent text-primary rounded-full text-xs w-[80px] py-1 font-bold uppercase">
                                                {activeModule.module.code}
                                            </div>
                                            <h3 className="text-gray-text text-xs capitalized">
                                                {activeModule.module.title}
                                            </h3>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-gray-200 h-2 w-40 rounded-full relative overflow-hidden">
                                                <div
                                                    className="bg-secondary block  h-full rounded-full"
                                                    style={{
                                                        width:
                                                            activeModule.days
                                                                .covered_percentage +
                                                            "%",
                                                    }}></div>
                                            </div>
                                            <div className="text-xs text-gray-text">
                                                <span>
                                                    {
                                                        activeModule.days
                                                            .covered_percentage
                                                    }
                                                    %
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="bg-white relative overflow-hidden shadow-sm sm:rounded-lg transition duration-200 ease-in-out">
                    {/* Header */}
                    <div className="p-5 sm:flex items-center justify-between border-b ">
                        <div className="flex items-center justify-center space-x-4">
                            <h1 className="text-xl font-extrabold">
                                Attendance Overview
                            </h1>
                        </div>
                        <div className="space-x-20 flex items-center">
                            <div className="flex space-x-4 rounded-full p-1 bg-primary-accent">
                                <button
                                    onClick={() => setAttendanceLecStu(true)}
                                    className={`${
                                        attendanceLecStu
                                            ? "bg-primary text-white"
                                            : "bg-primary-accent text-primary"
                                    } cursor  text-sm py-2 px-4 rounded-full transition duration-500 ease-in-ou`}>
                                    Lecturers
                                </button>
                                <button
                                    onClick={() => setAttendanceLecStu(false)}
                                    className={`${
                                        !attendanceLecStu
                                            ? "bg-primary text-white"
                                            : "bg-primary-accent text-primary"
                                    } cursor text-sm py-2 px-4 rounded-full transition duration-500 ease-in-out`}>
                                    Students
                                </button>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <div className="p-20 relative text-gray-text ">
                        <AnimatePresence mode="wait">
                <motion.div
                    key={attendanceLecStu ? "Lecturer" : "Student"}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                        <div className="h-[20rem] flex overflow-hidden relative  space-x-8 w-full">
                            <div className="flex flex-col">
                                <div className="h-[4rem] flex items-baseline before:absolute before:w-full before:h-[1px] before:bg-gray-300 before:z-0">
                                    100
                                </div>
                                <div className="h-[4rem] flex items-baseline before:absolute before:w-full before:h-[1px] before:bg-gray-300 before:z-0">
                                    80
                                </div>
                                <div className="h-[4rem] flex items-baseline before:absolute before:w-full before:h-[1px] before:bg-gray-300 before:z-0">
                                    60
                                </div>
                                <div className="h-[4rem] flex items-baseline before:absolute before:w-full before:h-[1px] before:bg-gray-300 before:z-0">
                                    40
                                </div>
                                <div className="h-[4rem] flex items-baseline before:absolute before:w-full before:h-[1px] before:bg-gray-300 before:z-0">
                                    20
                                </div>
                            </div>
                            <div className="flex z-10 space-x-10 h-[20rem] items-end overflow-y-auto relative ">
                                {
                                attendanceLecStu? ( modulesActive.map(activeModule => (
                                    <div
                                        key={activeModule.id}
                                        className={`${(100*(
                                                activeModule.attendance
                                                        .total.present /
                                                        activeModule.attendance.total.count,
                                                )) >= 80 ? 'bg-secondary' :'bg-[#E4572E]' } w-20 flex items-end justify-center rounded-lg`} style={{ 
                                            "height": (100*(
                                                activeModule.attendance
                                                        .total.present /
                                                        activeModule.attendance.total.count,
                                                ))+"%",
                                         }}>
                                              <span className="text-xs text-black-text font-bold">
                                            {(100*(
                                                activeModule.attendance
                                                        .total.present /
                                                        activeModule.attendance.total.count,
                                                )
                                            ).toFixed(2)}%
                                        </span>
                                    </div>
                                ))):(
                                modulesActive.map(activeModule => (
                                    <div
                                        key={activeModule.id}
                                        className={`${(100*(
                                                activeModule.attendance
                                                        .total
                                                        .student_attendance
                                                        .present /
                                                        activeModule.module
                                                            .students.length,
                                                )) >= 80 ? 'bg-secondary' :'bg-[#E4572E]' } w-20 flex items-end justify-center rounded-lg`} style={{ 
                                            "height":  (100*(
                                                activeModule.attendance
                                                        .total
                                                        .student_attendance
                                                        .present /
                                                        activeModule.module
                                                            .students.length,
                                                ))+"%",
                                         }}>
                                              <span className="text-xs text-black-text font-bold">
                                            {activeModule.attendance.total.student_attendance.present > 0 || activeModule.module.students.length > 0 ? (100*(
                                                activeModule.attendance
                                                        .total
                                                        .student_attendance
                                                        .present /
                                                        activeModule.module
                                                            .students.length,
                                                )
                                            ).toFixed(2) : '0.00'}%
                                        </span>
                                    </div>
                                ))) }
                            </div>
                        </div>
                        <div className="border-t flex border-gray-300  space-x-8 w-full">
                            <div className="w-[30px]">0</div>
                            <div className="space-x-10 flex">
                                {modulesActive.map(activeModule => (
                                    <div
                                        key={activeModule.id}
                                        className="w-20 text-sm text-center">
                                        {activeModule.module.code}  
                                    </div>
                                ))}
                            </div>
                        </div>
                          </motion.div>
            </AnimatePresence>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Dashboard;

export async function getStaticProps() {
    const studentsResponse = await axios.get("api/v1/students");
    const students = studentsResponse.data.data;

    const response = await axios.get("api/v1/modules");
    const cordinators = response.data.data;

    const lecturersResponse = await axios.get("api/v1/lecturers");
    const lecturers = lecturersResponse.data.data;

    const modulesResponse = await axios.get("api/v1/lecture/modules");
    const modules = modulesResponse.data.data;
    return {
        props: {
            modules,
            lecturers,
            students,
            cordinators,
        },
    };
}
