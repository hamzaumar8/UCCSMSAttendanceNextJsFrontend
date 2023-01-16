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
import StudentAllModules from "../../../components/Student/Modules/StudentAllModules";

const StudentModules = () => {
    const {
        data: studentModules,
        error,
        mutate,
    } = useSWR("api/v1/student/modules/", () =>
        axios
            .get("api/v1/student/modules/")
            .then(response => response.data.data),
    );

    return (
        <StudentLayout header="Registered Modules">
            {/* Title */}
            <HeadTitle title="Student Modules" />

            {/* Main Sction */}
            <div className="space-y-8 sm:mt-10">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg transition duration-500 ease-in-out">
                    {/* Header */}
                    <div className="p-5 pb-2 block sm:flex  items-center justify-between relative">
                        <div className="flex items-center justify-center space-x-8">
                            <h1 className="text-xl font-extrabold ">
                                Registered Modules
                            </h1>
                        </div>
                        <SemesterTag />
                        <div></div>
                    </div>

                    <div className="bg-white space-y-3 transition duration-500 ease-in-out">
                        <>
                            {studentModules === undefined ? (
                                <SectionLoader />
                            ) : (
                                <StudentAllModules modules={studentModules} />
                            )}
                        </>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
};

export default StudentModules;

// export async function getServerSideProps() {
//     const response = await axios.get("api/v1/results");
//     const results = response.data.data;

//     return {
//         props: {
//         },
//     };
// }
