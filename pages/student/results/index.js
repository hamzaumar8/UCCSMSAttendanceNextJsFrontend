import { AnimatePresence, motion } from "framer-motion";
import useSWR from "swr";
import { useState } from "react";
import HeadTitle from "../../../components/HeadTitle";
import { SectionLoader } from "../../../components/PageLoader";
import CordinatingModules from "../../../components/Results/CordinatingModules";
import SemesterTag from "../../../components/SemesterTag";
import StaffAllResults from "../../../components/Staff/Results/StaffAllResults";
import axios from "../../../src/lib/axios";
import StudentLayout from "../../../components/Layouts/StudentLayout";

const StudentResults = () => {
    const [upInactiveToggle, setUpInactiveToggle] = useState(false);

    const {
        data: lecturerResults,
        error,
        mutate,
    } = useSWR("api/v1/lecturer/results", () =>
        axios
            .get("api/v1/lecturer/results")
            .then(response => response.data.data),
    );

    return (
        <StudentLayout header="Results">
            {/* Title */}
            <HeadTitle title="Results" />

            {/* Main Sction */}
            <div className="space-y-8 sm:mt-10">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg transition duration-500 ease-in-out">
                    {/* Header */}
                    <div className="px-5 block sm:flex  items-center justify-between relative border-b ">
                        <div className="flex items-center justify-center space-x-8">
                            <button
                                className={`${
                                    !upInactiveToggle
                                        ? "after:bg-primary text-primary"
                                        : "after:bg-gray-200"
                                } tab pt-6`}
                                onClick={() => setUpInactiveToggle(false)}>
                                <h1 className="text-xl font-extrabold ">
                                    Results
                                </h1>
                            </button>
                            <button
                                className={`${
                                    upInactiveToggle
                                        ? "after:bg-primary text-primary"
                                        : "after:bg-gray-200"
                                } tab pt-6`}
                                onClick={() => setUpInactiveToggle(true)}>
                                <h1 className="text-xl font-extrabold ">
                                    Cordinating Modules
                                </h1>
                            </button>
                        </div>
                        <SemesterTag />
                        <div></div>
                    </div>

                    <div className="py-2 pb-6 bg-white space-y-3 transition duration-500 ease-in-out">
                        <>
                            {lecturerResults === undefined ? (
                                <SectionLoader />
                            ) : (
                                <StaffAllResults results={lecturerResults} />
                            )}
                        </>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
};

export default StudentResults;

// export async function getServerSideProps() {
//     const response = await axios.get("api/v1/results");
//     const results = response.data.data;

//     return {
//         props: {
//         },
//     };
// }
