import { PlusIcon } from "@heroicons/react/24/solid";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Pagination from "react-js-pagination";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import {
    modalEditState,
    modalState,
    modalTypeState,
} from "../../src/atoms/modalAtom";
import axios from "../../src/lib/axios";
import { handleLecturerState } from "../../src/atoms/lecturerAtom";

const Lecturer = ({ lecturers, lecturersSummary }) => {
    const router = useRouter();
    const defaultImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/img/lecturers/default.png`;

    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);
    const [handleLecturer, setHandleLecturer] =
        useRecoilState(handleLecturerState);
    const [modalEdit, setModalEdit] = useRecoilState(modalEditState);
    const [page, setPage] = useState(router.query?.page || 1);
    const [loading, setLoading] = useState(false);
    const [lecturerData, setLecturerData] = useState(null);

    const fetchLecturers = async () => {
        const response = await axios.get(`api/v1/lecturers?page=${page}`);
        response.status === 200 && setLecturerData(response.data);
    };

    useEffect(() => {
        setLoading(true);
        router.push({ pathname: "lecturers", query: { page } });
        fetchLecturers();
        setLoading(false);
    }, [page, handleLecturer]);

    console.log(lecturers);
    return (
        <AppLayout header="Lecturers">
            {/* Title */}
            <HeadTitle title="Lecturers" />

            {/* Main Sction */}
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <div className="flex space-x-4 items-center">
                        <h1 className="text-black font-extrabold text-xl">
                            Total Lecturers
                        </h1>
                        <span className="p-1 h-7 w-7 inline-flex items-center justify-center rounded-full text-xs text-white bg-primary">
                            {lecturersSummary.count}
                        </span>
                    </div>
                    <div>
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => {
                                setModalOpen(true);
                                setModalType("addlecturer");
                            }}
                            className="inline-flex items-center px-4 py-2 bg-primary text-white border border-transparent rounded-full font-semibold text-xs capitalize tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity:25 transition ease-in-out duration-150">
                            <PlusIcon className="w-4 h-4 mr-2" />
                            Add Lecturer
                        </motion.button>
                    </div>
                </div>
                <div className="my-3 overflow-x-auto bg-white shadow-lg rounded-lg overflow-y-auto relative">
                    <table className="table power-grid-table rounded-lg min-w-full border border-slate-200">
                        <thead className="shadow-sm bg-primary-accent border border-slate-200">
                            <tr>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-sm text-primary tracking-wider whitespace-nowrap">
                                    Photo
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                    Staff ID
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                    Name
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-center text-sm text-primary tracking-wider whitespace-nowrap">
                                    Modules
                                </th>
                                <th className="capitalize font-bold px-2 pr-6 py-3 text-sm text-primary tracking-wider whitespace-nowrap text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-text text-sm !border-[#E6EAEF]">
                            {lecturerData !== null && (
                                <>
                                    {lecturerData?.data.map(lecturer => (
                                        <tr className="" key={lecturer.id}>
                                            <td className="capitalize text-center p-3 whitespace-nowrap">
                                                <Image
                                                    src={
                                                        lecturer.picture ??
                                                        defaultImg
                                                    }
                                                    className="h-10 w-10 my-0 mx-auto"
                                                    width={100}
                                                    height={100}
                                                    alt={lecturer.surname}
                                                />
                                            </td>
                                            <td className="capitalize p-3 whitespace-nowrap border-b">
                                                <span>
                                                    <div>
                                                        {lecturer.staff_id}
                                                    </div>
                                                </span>
                                            </td>
                                            <td className="capitalize p-3 whitespace-nowrap border-b">
                                                <span>
                                                    <div>
                                                        {lecturer.title}{" "}
                                                        {lecturer.first_name}{" "}
                                                        {lecturer.other_name &&
                                                            lecturer.other_name +
                                                                " "}
                                                        {lecturer.surname}
                                                    </div>
                                                </span>
                                            </td>
                                            <td className="capitalize py-3  border-b text-center">
                                                <div className="space-x-2">
                                                    {lecturer.modules.length > 0
                                                        ? lecturer.modules
                                                              .slice(0, 3)
                                                              .map(
                                                                  (
                                                                      module,
                                                                      index,
                                                                  ) => (
                                                                      <span
                                                                          key={
                                                                              index
                                                                          }
                                                                          className="uppercase py-1 rounded-sm text-xs font-bold shadow-sm px-2 bg-primary-accent">
                                                                          {
                                                                              module
                                                                                  .module
                                                                                  .code
                                                                          }
                                                                      </span>
                                                                  ),
                                                              )
                                                        : "---"}
                                                    {lecturer.modules.length >
                                                        3 && (
                                                        <span className="underline text-primary">
                                                            all
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="capitalize py-3 whitespace-nowrap border-b !text-right pr-6">
                                                <div className="space-x-3">
                                                    <Link
                                                        href={`/lecturers/${lecturer.id}`}
                                                        legacyBehavior>
                                                        <a
                                                            className="inline-flex cursor-pointer text-gray-text hover:!text-secondary transition duration-500"
                                                            title="Details">
                                                            <EyeIcon className="h-6 w-6 " />
                                                        </a>
                                                    </Link>
                                                    <button
                                                        className="inline-flex cursor-pointer text-gray-text hover:!text-primary transition duration-500"
                                                        title="Edit"
                                                        onClick={() => {
                                                            setModalOpen(true);
                                                            setModalType(
                                                                "editLecturer",
                                                            );
                                                            setModalEdit(
                                                                lecturer,
                                                            );
                                                        }}>
                                                        <PencilSquareIcon className="h-6 w-6 " />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}
                        </tbody>
                    </table>
                    {/* pagination */}
                    {lecturerData !== null && (
                        <>
                            {lecturerData.meta.total >
                                lecturerData.meta.per_page && (
                                <>
                                    <Pagination
                                        activePage={
                                            lecturerData.meta.current_page
                                        }
                                        itemsCountPerPage={
                                            lecturerData.meta.per_page
                                        }
                                        totalItemsCount={
                                            lecturerData.meta.total
                                        }
                                        // pageRangeDisplayed={5}
                                        onChange={pageNumber =>
                                            setPage(pageNumber)
                                        }
                                    />
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default Lecturer;

export async function getStaticProps() {
    const response = await axios.get("api/v1/lecturers");
    const lecturers = response.data.data;
    const lecturersSummary = response.data.summary;
    return {
        props: {
            lecturers,
            lecturersSummary,
        },
    };
}
