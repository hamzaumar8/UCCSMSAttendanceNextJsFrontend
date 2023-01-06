import AppLayout from "../components/Layouts/AppLayout";
import axios from "../src/lib/axios";
import Card from "../components/Card";
import HeadTitle from "../components/HeadTitle";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import SemesterNotFound from "../components/SemesterNotFound";
import { useSemester } from "../src/hooks/semester";

const Dashboard = ({ semester, modules, lecturers, cordinators, students }) => {
    const [attendanceLecStu, setAttendanceLecStu] = useState(true);
    const modulesActive = modules.filter(itm => itm.status == "active");

    return (
        <AppLayout header="Dashboard">
            <HeadTitle title="Dashboard" />

            <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-8">
                    <div className="col-span-1 xl:col-span-2 ">
                        <Card
                            titleClassName="!items-start"
                            header={
                                semester && (
                                    <h1 className="text-black-text  uppercase text-xl py-2 font-bold">
                                        {semester?.semester} semester
                                    </h1>
                                )
                            }
                            button={
                                semester && (
                                    <div className="bg-[#F3F3F3] py-2 rounded-lg">
                                        <div className="flex space-x-2 border-b px-3 pb-1">
                                            <CalendarDaysIcon className="h-5 w-5 text-gray-text" />
                                            <div className="font-bold uppercase">
                                                {new Date(
                                                    semester?.start_date,
                                                ).toLocaleString("en-US", {
                                                    day: "2-digit",
                                                })}{" "}
                                                {new Date(
                                                    semester?.start_date,
                                                ).toLocaleString("en-US", {
                                                    month: "short",
                                                })}
                                                {" - "}
                                                {new Date(
                                                    semester?.start_date,
                                                ).toLocaleString("en-US", {
                                                    day: "2-digit",
                                                })}{" "}
                                                {new Date(
                                                    semester?.end_date,
                                                ).toLocaleString("en-US", {
                                                    month: "short",
                                                })}
                                            </div>
                                        </div>
                                        <div className="px-3 pt-1 text-gray-text">
                                            <div>
                                                {semester?.academic_year}{" "}
                                                Academic Year
                                            </div>
                                        </div>
                                    </div>
                                )
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
                        {semester ? (
                            <Card
                                header={
                                    <h1 className="text-black-text font-extrabold capitalize">
                                        Active Mdoules
                                    </h1>
                                }>
                                <div className="space-y-3">
                                    {modulesActive
                                        .slice(0, 8)
                                        .map(activeModule => (
                                            <div
                                                key={activeModule.id}
                                                className="flex items-center justify-between p-1">
                                                <div className="flex space-x-2 items-center">
                                                    <div className="flex items-center justify-center bg-primary-accent text-primary rounded-full text-xs w-[80px] py-1 font-bold uppercase">
                                                        {
                                                            activeModule.module
                                                                .code
                                                        }
                                                    </div>
                                                    <h3 className="text-gray-text text-xs capitalized">
                                                        {
                                                            activeModule.module
                                                                .title
                                                        }
                                                    </h3>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <div className="bg-gray-200 h-2 w-40 rounded-full relative overflow-hidden">
                                                        <div
                                                            className="bg-secondary block  h-full rounded-full"
                                                            style={{
                                                                width:
                                                                    activeModule
                                                                        .days
                                                                        .covered_percentage +
                                                                    "%",
                                                            }}></div>
                                                    </div>
                                                    <div className="text-xs text-gray-text">
                                                        <span>
                                                            {
                                                                activeModule
                                                                    .days
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
                        ) : (
                            <SemesterNotFound />
                        )}
                    </div>
                </div>

                {semester && (
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
                                        onClick={() =>
                                            setAttendanceLecStu(true)
                                        }
                                        className={`${
                                            attendanceLecStu
                                                ? "bg-primary text-white"
                                                : "bg-primary-accent text-primary"
                                        } cursor  text-sm py-2 px-4 rounded-full transition duration-500 ease-in-ou`}>
                                        Lecturers
                                    </button>
                                    <button
                                        onClick={() =>
                                            setAttendanceLecStu(false)
                                        }
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
                                    key={
                                        attendanceLecStu
                                            ? "Lecturer"
                                            : "Student"
                                    }
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.2 }}>
                                    <div className="h-[20rem] flex overflow-hidden relative  space-x-8 w-full">
                                        <div className="flex flex-col">
                                            <div className="chart-bar">100</div>
                                            <div className="chart-bar">80</div>
                                            <div className="chart-bar">60</div>
                                            <div className="chart-bar">40</div>
                                            <div className="chart-bar">20</div>
                                        </div>
                                        <div className="flex z-10 space-x-10 h-[20rem] items-end overflow-y-auto relative ">
                                            {attendanceLecStu
                                                ? modulesActive.map(
                                                      activeModule => (
                                                          <div
                                                              key={
                                                                  activeModule.id
                                                              }
                                                              className={`${
                                                                  activeModule
                                                                      .attendance
                                                                      .total
                                                                      .present_percentage >=
                                                                  80
                                                                      ? "bg-secondary"
                                                                      : "bg-[#E4572E]"
                                                              } w-20 flex items-end justify-center rounded-lg`}
                                                              style={{
                                                                  height:
                                                                      activeModule
                                                                          .attendance
                                                                          .total
                                                                          .present_percentage +
                                                                      "%",
                                                              }}>
                                                              <span className="text-xs text-black-text font-bold">
                                                                  {
                                                                      activeModule
                                                                          .attendance
                                                                          .total
                                                                          .present_percentage
                                                                  }
                                                                  %
                                                              </span>
                                                          </div>
                                                      ),
                                                  )
                                                : modulesActive.map(
                                                      activeModule => (
                                                          <div
                                                              key={
                                                                  activeModule.id
                                                              }
                                                              className={`${
                                                                  activeModule
                                                                      .attendance
                                                                      .total
                                                                      .student_attendance
                                                                      .present_percentage >=
                                                                  80
                                                                      ? "bg-secondary"
                                                                      : "bg-[#E4572E]"
                                                              } w-20 flex items-end justify-center rounded-lg`}
                                                              style={{
                                                                  height:
                                                                      activeModule
                                                                          .attendance
                                                                          .total
                                                                          .student_attendance
                                                                          .present_percentage +
                                                                      "%",
                                                              }}>
                                                              <span className="text-xs text-black-text font-bold">
                                                                  {
                                                                      activeModule
                                                                          .attendance
                                                                          .total
                                                                          .student_attendance
                                                                          .present_percentage
                                                                  }
                                                                  %
                                                              </span>
                                                          </div>
                                                      ),
                                                  )}
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
                )}
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

    const modulesResponse = await axios.get("api/v1/modules");
    const modules = modulesResponse.data.data;

    const responseSemester = await axios.get("api/v1/semester");
    const semester = responseSemester.data;
    return {
        props: {
            modules,
            lecturers,
            students,
            cordinators,
            semester,
        },
    };
}
