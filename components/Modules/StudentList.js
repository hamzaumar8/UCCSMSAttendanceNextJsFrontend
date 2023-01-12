import { useRecoilState } from "recoil";
import {
    modalEditState,
    modalState,
    modalTypeState,
} from "../../src/atoms/modalAtom";
import { EyeIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
const StudentList = ({ module }) => {
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);
    const [modalEdit, setModalEdit] = useRecoilState(modalEditState);
    return (
        <div>
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
                            setModalType("addStudentModule");
                            setModalEdit(module);
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
                        {module.students.map((student, index) => (
                            <tr className="" key={index}>
                                <td className="capitalize p-3 whitespace-nowrap">
                                    <Image
                                        src={student.picture}
                                        height={100}
                                        width={100}
                                        alt={student.index_number}
                                        className="w-10 h-10 my-0 mx-auto"
                                    />
                                </td>
                                <td className="uppercase p-3 whitespace-nowrap border-b">
                                    <span>
                                        <div>{student.index_number}</div>
                                    </span>
                                </td>
                                <td className="capitalize p-3 whitespace-nowrap border-b">
                                    <span>
                                        <div>{student.full_name}</div>
                                    </span>
                                </td>
                                <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                                    <span>
                                        <div>
                                            {
                                                student.attendance_stats
                                                    .present_percentage
                                            }
                                        </div>
                                    </span>
                                </td>
                                <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                                    <span>
                                        <div>
                                            {
                                                student.attendance_stats
                                                    .absent_percentage
                                            }
                                        </div>
                                    </span>
                                </td>
                                <td className="capitalize p-3 whitespace-nowrap border-b text-right pr-6">
                                    <Link
                                        href={`/students/${student.id}`}
                                        className="inline-flex cursor-pointer text-gray-text hover:!text-primary transition duration-500"
                                        title="Detials">
                                        <EyeIcon className="h-6 w-6" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentList;
