import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";
import { ArrowUpTrayIcon, ServerStackIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import Pagination from "react-js-pagination";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import { modalState, modalTypeState } from "../../src/atoms/modalAtom";
import axios from "../../src/lib/axios";
import { handleLecturerState } from "../../src/atoms/lecturerAtom";
import LecturerTable from "../../components/Lecturers/Table";
import Input from "../../components/Input";

const Lecturer = ({ lecturers, lecturersSummary }) => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);
    const [page, setPage] = useState(router.query?.page || 1);
    const [searchToggle, setSearchToggle] = useState(false);
    const [searching, setSearching] = useState(false);
    const [loading, setLoading] = useState(false);
    const [lecturerData, setLecturerData] = useState(null);
    const [searchData, setSearchData] = useState(null);
    const [query, setQuery] = useState("");

    useEffect(() => {
        router.push({ pathname: "lecturers", query: { page } });
        const fetchLecturers = async () => {
            const response = await axios.get(`api/v1/lecturers?page=${page}`);
            response.status === 200 && setLecturerData(response.data);
        };
        const searchLecturer = async () => {
            const response = await axios.get("/api/v1/all/lecturers");
            return response.status === 200 && setSearchData(response.data);
        };
        setLoading(true);
        fetchLecturers();
        searchLecturer();
        setLoading(false);
    }, [page]);

    const searchKeys = ["full_name", "staff_id"];

    const search = data => {
        return data?.filter(item =>
            searchKeys.some(key => item[key].toLowerCase().includes(query)),
        );
    };

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
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={searchToggle ? "search" : "csv"}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            transition={{ duration: 0.2 }}>
                            {searchToggle ? (
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-white border-primary text-sm text-gray-text outline-none min-w-max px-8 py-2 rounded-sm shadow-sm"
                                    onChange={e => {
                                        setSearching(true);
                                        setQuery(e.target.value);
                                        if (e.target.value === "")
                                            setSearching(false);
                                    }}
                                />
                            ) : (
                                <button
                                    onClick={() => {
                                        setModalOpen(true);
                                        setModalType("importLecturer");
                                    }}
                                    className="inline-flex items-center px-6 py-2 bg-white text-primary rounded-full font-bold text-xs capitalize border-2 border-primary tracking-widest transition ease-in-out duration-150">
                                    <ArrowUpTrayIcon className="w-4 h-4 mr-1" />
                                    Improt CSV
                                </button>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    <div className="space-x-2 flex items-center">
                        <button
                            onClick={() => setSearchToggle(!searchToggle)}
                            className="text-white bg-primary p-2 rounded-full">
                            <MagnifyingGlassIcon className="h-5 w-5" />
                        </button>
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
                    <LecturerTable
                        data={
                            searching
                                ? search(searchData?.data)
                                : lecturerData?.data
                        }
                    />
                    {/* pagination */}
                    {!searching && lecturerData !== null && (
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

export async function getServerSideProps() {
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
