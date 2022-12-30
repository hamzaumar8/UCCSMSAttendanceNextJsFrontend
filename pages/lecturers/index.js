import { PlusIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import { modalState, modalTypeState } from "../../src/atoms/modalAtom";
import axios from "../../src/lib/axios";
import ReactPaginate from "react-paginate";
import Pagination from "react-js-pagination";
const Lecturer = ({ lecturers, lecturersSummary }) => {
    const defaultImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/img/lecturers/default.png`;
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);

    console.log(lecturers);

    const router = useRouter();
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
    }, [page]);

    console.log(lecturerData);

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
                            {lecturers.length}
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
                                    Name
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-center text-sm text-primary tracking-wider whitespace-nowrap">
                                    Modules
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3  text-sm text-primary tracking-wider whitespace-nowrap">
                                    Absents(%)
                                </th>
                                <th className="capitalize font-bold px-2 pr-6 py-3 text-sm text-primary tracking-wider whitespace-nowrap text-right">
                                    Absents(%)
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
                                                        {lecturer.title}{" "}
                                                        {lecturer.first_name}{" "}
                                                        {lecturer.other_name &&
                                                            lecturer.other_name +
                                                                " "}
                                                        {lecturer.surname}
                                                    </div>
                                                </span>
                                            </td>
                                            <td className="capitalize py-3 whitespace-nowrap border-b text-center">
                                                {lecturer.modules.length > 0
                                                    ? lecturer.modules.map(
                                                          (module, index) => (
                                                              <div
                                                                  key={index}
                                                                  className="uppercase py-3 last:border-b-0 border-b">
                                                                  {
                                                                      module
                                                                          .module
                                                                          .code
                                                                  }
                                                              </div>
                                                          ),
                                                      )
                                                    : "---"}
                                            </td>
                                            <td className="capitalize py-3 whitespace-nowrap border-b text-center">
                                                {lecturer.modules.length > 0
                                                    ? lecturer.modules.map(
                                                          module => (
                                                              <div
                                                                  key={
                                                                      module.id
                                                                  }
                                                                  className="py-3 last:border-b-0 border-b">
                                                                  40
                                                              </div>
                                                          ),
                                                      )
                                                    : "---"}
                                            </td>
                                            <td className="capitalize py-3 whitespace-nowrap border-b text-right pr-6">
                                                {lecturer.modules.length > 0
                                                    ? lecturer.modules.map(
                                                          module => (
                                                              <div
                                                                  key={
                                                                      module.id
                                                                  }
                                                                  className="py-3 last:border-b-0 border-b">
                                                                  20
                                                              </div>
                                                          ),
                                                      )
                                                    : "---"}
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
