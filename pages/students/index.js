import Image from "next/image";
import { useState } from "react";
import Dropdown from "../../components/Dropdown";
import { DropdownButton } from "../../components/DropdownLink";
import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../src/lib/axios";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import {
    modalEditState,
    modalState,
    modalTypeState,
} from "../../src/atoms/modalAtom";
import { motion } from "framer-motion";
import { ArrowUpTrayIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const Student = ({ students, levels, modules }) => {
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);
    const [modalEdit, setModalEdit] = useRecoilState(modalEditState);

    const [modelLevelToggler, setModelLevelToggler] = useState(true);
    const [levelSelectedValue, setLevelSelectedValue] = useState(
        levels[0].name,
    );
    const [moduleSelectedValue, setModuleSelectedValue] = useState(
        modules[0].module.code,
    );

    console.log(students);
    return (
        <AppLayout header="Students">
            {/* Title */}
            <HeadTitle title="Students" />

            {/* Main Sction */}
            <div className="space-y-5">
                <div className="flex items-center justify-between relative">
                    <div className="flex space-x-4 items-center">
                        <h1 className="text-black font-extrabold text-xl">
                            Total Students
                        </h1>
                        <span className="p-1 h-7 w-7 inline-flex items-center justify-center rounded-full text-xs text-white bg-primary">
                            {students.length}
                        </span>
                    </div>
                    <div className="space-x-2 flex items-center">
                        <div className="rounded-full border border-primary p-0.5 space-x-2">
                            <button
                                onClick={() => setModelLevelToggler(true)}
                                className={`${
                                    modelLevelToggler
                                        ? "bg-primary text-white"
                                        : "text-primary"
                                } rounded-full inline-block px-8 py-2 text-xs font-bold transition duration-500 ease-in-out`}>
                                levels
                            </button>
                            <button
                                onClick={() => setModelLevelToggler(false)}
                                className={`${
                                    !modelLevelToggler
                                        ? "bg-primary text-white"
                                        : "text-primary"
                                } rounded-full inline-block px-8 py-2 text-xs font-bold transition duration-500 ease-in-out`}>
                                Modules
                            </button>
                        </div>
                        <div>
                            <Dropdown
                                align="left"
                                width="48"
                                trigger={
                                    <button className="flex items-center text-sm font-medium transition duration-500 ease-in-out rounded-full border border-primary py-2 px-6">
                                        {modelLevelToggler ? (
                                            <span className="text-primary text-xs capitalize font-bold">
                                                {levelSelectedValue}
                                            </span>
                                        ) : (
                                            <span className="text-primary text-xs capitalize font-bold">
                                                {moduleSelectedValue}
                                            </span>
                                        )}
                                        <div className="ml-1">
                                            <ChevronDownIcon className="h-5 w-5" />
                                        </div>
                                    </button>
                                }>
                                {modelLevelToggler
                                    ? levels.map(level => (
                                          <DropdownButton
                                              key={level.id}
                                              onClick={() =>
                                                  setLevelSelectedValue(
                                                      level.name,
                                                  )
                                              }>
                                              {level.name}
                                          </DropdownButton>
                                      ))
                                    : modules.map(module => (
                                          <DropdownButton
                                              key={module.id}
                                              onClick={() =>
                                                  setModuleSelectedValue(
                                                      module.code,
                                                  )
                                              }>
                                              {module.code}
                                          </DropdownButton>
                                      ))}
                            </Dropdown>
                        </div>
                    </div>
                    <div className="space-x-4 flex items-center">
                        <button
                            className="inline-flex items-center px-6 py-2 bg-white text-primary rounded-full font-bold text-xs capitalize border-2 border-primary tracking-widest transition ease-in-out duration-150"
                            onClick={() => {
                                setModalOpen(true);
                                setModalType("importStudent");
                            }}>
                            <ArrowUpTrayIcon className="w-4 h-4 mr-1" />
                            Improt CSV
                        </button>
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => {
                                setModalOpen(true);
                                setModalType("addStudent");
                            }}
                            className="inline-flex items-center px-6 py-2 bg-primary text-white border border-transparent rounded-full font-semibold text-xs capitalize tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity:25 transition ease-in-out duration-150">
                            <PlusIcon className="w-4 h-4 mr-1" />
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
                                    Group Number
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-center text-sm text-primary tracking-wider whitespace-nowrap">
                                    Present(%)
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
                            {modelLevelToggler ? (
                                students
                                    .filter(
                                        itm =>
                                            itm.level?.name ==
                                            levelSelectedValue,
                                    )
                                    .map((student, index) => (
                                        <tr className="" key={index}>
                                            <td className="capitalize p-3 whitespace-nowrap">
                                                <Image
                                                    src={student.picture}
                                                    height={100}
                                                    width={100}
                                                    alt={student.index_number}
                                                    className="w-14 h-12 my-0 mx-auto"
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
                                                    <div>
                                                        {student.full_name}
                                                    </div>
                                                </span>
                                            </td>
                                            <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                                                <span>
                                                    <div>
                                                        {student.group_no}
                                                    </div>
                                                </span>
                                            </td>
                                            <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                                                <span>
                                                    <div>
                                                        {
                                                            student
                                                                .attendance_stats
                                                                .present_percentage
                                                        }
                                                    </div>
                                                </span>
                                            </td>
                                            <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                                                <span>
                                                    <div>
                                                        {
                                                            student
                                                                .attendance_stats
                                                                .absent_percentage
                                                        }
                                                    </div>
                                                </span>
                                            </td>
                                            <td className="capitalize p-3 whitespace-nowrap border-b text-right pr-6">
                                                <span>
                                                    <div>
                                                        <button
                                                            className="inline-flex cursor-pointer text-gray-text hover:!text-primary transition duration-500"
                                                            title="Edit"
                                                            onClick={() => {
                                                                setModalOpen(
                                                                    true,
                                                                );
                                                                setModalType(
                                                                    "editStudent",
                                                                );
                                                                setModalEdit(
                                                                    student,
                                                                );
                                                            }}>
                                                            <PencilSquareIcon className="h-6 w-6 " />
                                                        </button>
                                                    </div>
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                            ) : (
                                <tr></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
};

export default Student;

export async function getStaticProps() {
    const responseModule = await axios.get("api/v1/modules");
    const modules = responseModule.data.data;

    const responseLevel = await axios.get("api/v1/levels");
    const levels = responseLevel.data.data;

    const response = await axios.get("api/v1/students");
    const students = response.data.data;
    return {
        props: {
            students,
            levels,
            modules,
        },
    };
}
