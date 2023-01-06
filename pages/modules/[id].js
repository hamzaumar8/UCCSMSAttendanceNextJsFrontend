import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRecoilState } from "recoil";
import Button from "../../components/Button";
import Card from "../../components/Card";
import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import {
    modalEditState,
    modalState,
    modalTypeState,
} from "../../src/atoms/modalAtom";
import { useModule } from "../../src/hooks/module";
import axios from "../../src/lib/axios";

const Module = ({ module }) => {
    const { endModule, loading } = useModule();
    const defaultImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/img/lecturers/default.png`;

    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);
    const [modalEdit, setModalEdit] = useRecoilState(modalEditState);
    const [attendanceLecStu, setAttendanceLecStu] = useState(true);

    const week = Object.values(module.attendance.weekly);

    const handleEndModule = e => {
        e.preventDefault();
        endModule({
            id: module.id,
        });
    };
    return (
        <AppLayout header={module.module.code}>
            <HeadTitle title="Lecturers" />
            {/* Main content */}
            <div className="relative space-y-8">
                <div className="bg-white overflow-hidden sm:rounded-md transition duration-500 ease-in-out shadow-sm">
                    {/* Card Header */}
                    <div className="flex items-center justify-between py-5 px-8 border-b">
                        <div className="flex space-x-5 items-center">
                            <span className="text-sm font-bold py-1 px-5  rounded-full bg-primary-accent text-primary">
                                {module.module.code}
                            </span>
                            <h5 className="text-lg text-gray-text font-bold">
                                {module.module.title}
                            </h5>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-gray-200 h-2 w-40 rounded-full relative overflow-hidden">
                                <div
                                    className="bg-secondary block  h-full rounded-full"
                                    style={{
                                        width:
                                            module.days.covered_percentage +
                                            "%",
                                    }}></div>
                            </div>
                            <div className="text-xs text-gray-text">
                                <span>{module.days.covered_percentage}%</span>
                            </div>
                        </div>
                        <div className="flex space-x-6 items-center">
                            {module.status !== "upcoming" && (
                                <Button
                                    onClick={handleEndModule}
                                    danger
                                    loader={loading}
                                    className="!capitalize !rounded-full !px-6">
                                    End Module
                                </Button>
                            )}
                            {module.status === "upcoming" && (
                                <Button
                                    className="!capitalize !rounded-full !px-6"
                                    onClick={() => {
                                        setModalOpen(true);
                                        setModalType("editmountModule");
                                        setModalEdit(module);
                                    }}>
                                    Edit Module
                                </Button>
                            )}
                        </div>
                    </div>
                    {/* Card Body */}
                    <div className="py-5 px-8  pb-6 bg-white space-y-3">
                        <div className="grid grid-cols-5 gap-20">
                            {/* Attendance Overview */}
                            <div className="col-span-5 md:col-span-3 bg-white relative overflow-hidden shadow-sm sm:rounded-lg transition duration-200 ease-in-out border border-primary-accent">
                                <div className="p-5 sm:flex items-center justify-between border-b bg-primary-accent">
                                    <div className="flex items-center justify-center space-x-4">
                                        <h1 className="text-xl font-extrabold">
                                            Attendance Overview
                                        </h1>
                                    </div>
                                    <div></div>
                                </div>

                                <div className="px-5 space-y-8 relative text-gray-text ">
                                    <div className="flex space-x-8 border-b pt-5">
                                        <button
                                            onClick={() =>
                                                setAttendanceLecStu(true)
                                            }
                                            className={`${
                                                attendanceLecStu
                                                    ? "after:bg-primary text-primary"
                                                    : "after:bg-gray-200"
                                            } tab`}>
                                            <h1 className="text-lg font-bold ">
                                                Lecturers
                                            </h1>
                                        </button>
                                        <button
                                            onClick={() =>
                                                setAttendanceLecStu(false)
                                            }
                                            className={`${
                                                !attendanceLecStu
                                                    ? "after:bg-primary text-primary"
                                                    : "after:bg-gray-200"
                                            } tab`}>
                                            <h1 className="text-lg font-bold ">
                                                Students
                                            </h1>
                                        </button>
                                    </div>

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
                                            transition={{ duration: 0.2 }}
                                            className="min-h-[20rem]">
                                            <div className="h-[20rem] flex overflow-hidden relative  space-x-8 w-full">
                                                <div className="flex flex-col">
                                                    <div className="chart-bar">
                                                        100
                                                    </div>
                                                    <div className="chart-bar">
                                                        80
                                                    </div>
                                                    <div className="chart-bar">
                                                        60
                                                    </div>
                                                    <div className="chart-bar">
                                                        40
                                                    </div>
                                                    <div className="chart-bar">
                                                        20
                                                    </div>
                                                </div>
                                                <div className="flex z-10 space-x-10 h-[20rem] items-end overflow-y-auto relative ">
                                                    {attendanceLecStu
                                                        ? week.map(
                                                              (data, index) => (
                                                                  <div
                                                                      className="flex flex-col-reverse h-full"
                                                                      key={
                                                                          index
                                                                      }>
                                                                      {data.present_percentage >
                                                                          0 && (
                                                                          <div
                                                                              className={`bg-secondary w-16 flex items-center justify-center  ${
                                                                                  data.absent_percentage >
                                                                                  0
                                                                                      ? "rounded-b-lg"
                                                                                      : "rounded-lg"
                                                                              }`}
                                                                              style={{
                                                                                  height:
                                                                                      data.present_percentage +
                                                                                      "%",
                                                                              }}>
                                                                              <span className="text-xs text-black-text font-bold">
                                                                                  {
                                                                                      data.present_percentage
                                                                                  }

                                                                                  %
                                                                              </span>
                                                                          </div>
                                                                      )}
                                                                      {data.absent_percentage >
                                                                          0 && (
                                                                          <div
                                                                              className={`bg-danger w-16 flex items-center justify-center  ${
                                                                                  data.absent_percentage >
                                                                                  0
                                                                                      ? "rounded-t-lg"
                                                                                      : "rounded-lg"
                                                                              }`}
                                                                              style={{
                                                                                  height:
                                                                                      data.absent_percentage +
                                                                                      "%",
                                                                              }}>
                                                                              <span className="text-xs text-white font-bold">
                                                                                  {
                                                                                      data.absent_percentage
                                                                                  }

                                                                                  %
                                                                              </span>
                                                                          </div>
                                                                      )}
                                                                  </div>
                                                              ),
                                                          )
                                                        : "---"}
                                                </div>
                                            </div>
                                            <div className="border-t border-gray-200 flex space-x-8 w-full">
                                                <div className="w-[30px]">
                                                    0
                                                </div>
                                                <div className="space-x-10 flex">
                                                    {week.map((lec, index) => (
                                                        <div
                                                            key={index}
                                                            className="w-16 text-sm text-center">
                                                            week
                                                            {index + 1}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>

                                        <div className="border-t flex items-center space-x-8 justify-center text-black-text font-bold py-3">
                                            <div className="flex items-center space-x-2">
                                                <span className="w-8 h-[0.4rem] bg-secondary block rounded-full"></span>
                                                <span>Present</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="w-8 h-[0.4rem] bg-danger block rounded-full"></span>
                                                <span>Absent</span>
                                            </div>
                                        </div>
                                    </AnimatePresence>
                                </div>
                            </div>
                            {/* In charg */}
                            <div className="col-span-5 md:col-span-2">
                                <Card
                                    className="border border-primary-accent"
                                    header={
                                        <h1 className="text-black-text font-extrabold capitalize">
                                            In Charge
                                        </h1>
                                    }>
                                    <div className="space-y-4">
                                        {module.lecturers.map(
                                            (lecturer, index) => (
                                                <div
                                                    className="flex space-x-5 items-center"
                                                    key={index}>
                                                    <div className="flex items-center justify-center bg-primary-accent text-primary rounded-full text-xs w-[100px] py-1 font-bold capitalize">
                                                        lecturer
                                                    </div>
                                                    <h3 className="text-gray-text text-xs capitalized">
                                                        {lecturer.full_name}
                                                    </h3>
                                                </div>
                                            ),
                                        )}
                                        <div className="flex space-x-5 items-center">
                                            <div className="flex items-center justify-center bg-primary-accent text-primary rounded-full text-xs w-[100px] py-1 font-bold capitalize">
                                                Cordinator
                                            </div>
                                            <h3 className="text-gray-text text-xs capitalized">
                                                {module.cordinator.full_name}
                                            </h3>
                                        </div>
                                        <div className="flex space-x-5 items-center">
                                            <div className="flex items-center justify-center bg-primary-accent text-primary rounded-full text-xs w-[100px] py-1 font-bold capitalize">
                                                Cordinator
                                            </div>
                                            <h3 className="text-gray-text text-xs capitalized">
                                                {module.course_rep.full_name}
                                            </h3>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="space-y-5">
                    <div className="flex items-center justify-between relative">
                        <div className="flex space-x-4 items-center">
                            <h1 className="text-black font-extrabold text-xl">
                                Total Students
                            </h1>
                            <span className="p-1 h-7 w-7 inline-flex items-center justify-center rounded-full text-xs text-white bg-primary">
                                {module.students.length}
                            </span>
                        </div>
                        <div>
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => {
                                    setModalOpen(true);
                                    setModalType("addStudent");
                                }}
                                className="inline-flex items-center px-4 py-2 bg-primary text-white border border-transparent rounded-full font-semibold text-xs capitalize tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity:25 transition ease-in-out duration-150">
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Add Student
                            </motion.button>
                        </div>
                    </div>
                    <div className="my-3 overflow-x-auto bg-white shadow-lg rounded-lg overflow-y-auto">
                        <table className="table rounded-lg min-w-full border border-slate-200 transition duration-500 ease-in-out">
                            <thead className="shadow-sm bg-primary-accent border border-slate-200">
                                <tr>
                                    <th className="capitalize font-bold px-2 pr-4 py-3 text-center text-sm text-primary tracking-wider whitespace-nowrap">
                                        Photo
                                    </th>
                                    <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                        Index Number
                                    </th>
                                    <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                        Name
                                    </th>
                                    <th className="capitalize font-bold px-2 pr-4 py-3 text-center text-sm text-primary tracking-wider whitespace-nowrap">
                                        Absents(%)
                                    </th>
                                    <th className="capitalize font-bold px-2 pr-4 py-3 text-center text-sm text-primary tracking-wider whitespace-nowrap">
                                        Absents(%)
                                    </th>
                                    <th className="capitalize font-bold px-2 pr-6 py-3 text-sm text-primary tracking-wider whitespace-nowrap text-right">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-text text-sm !border-[#E6EAEF]">
                                {module.students.map((student, index) => (
                                    <tr className="" key={index}>
                                        <td className="capitalize p-3 whitespace-nowrap">
                                            <Image
                                                src={
                                                    student.picture ??
                                                    defaultImg
                                                }
                                                height={100}
                                                width={100}
                                                alt={student.index_number}
                                                className="w-10 h-10 my-0 mx-auto"
                                            />
                                        </td>
                                        <td className="uppercase p-3 whitespace-nowrap border-b">
                                            <span>
                                                <div>
                                                    {student.index_number}
                                                </div>
                                            </span>
                                        </td>
                                        <td className="capitalize p-3 whitespace-nowrap border-b">
                                            <span>
                                                <div>{student.full_name}</div>
                                            </span>
                                        </td>
                                        <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                                            <span>
                                                <div>40</div>
                                            </span>
                                        </td>
                                        <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                                            <span>
                                                <div>40</div>
                                            </span>
                                        </td>
                                        <td className="capitalize p-3 whitespace-nowrap border-b text-right pr-6">
                                            <span>
                                                <div>30</div>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Module;

export async function getStaticPaths() {
    const response = await axios.get("/api/v1/modules");
    return {
        paths: response.data.data.map(module => ({
            params: { id: module.id.toString() },
        })),
        fallback: false, // can also be true or 'blocking'
    };
}

export async function getStaticProps({ params }) {
    const response = await axios.get(`/api/v1/modules/${params.id}`);
    return {
        props: {
            module: response.data.data,
        },
    };
}
