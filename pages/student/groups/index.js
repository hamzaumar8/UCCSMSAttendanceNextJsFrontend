import { AnimatePresence, motion } from "framer-motion";
import useSWR from "swr";
import { useState } from "react";
import HeadTitle from "../../../components/HeadTitle";
import { SectionLoader } from "../../../components/PageLoader";
import SemesterTag from "../../../components/SemesterTag";
import axios from "../../../src/lib/axios";
import StudentLayout from "../../../components/Layouts/StudentLayout";
import StudentAllResults from "../../../components/Student/Results/StudentAllResults";
import StudentAllGroups from "../../../components/Student/Groups/StudentAllGroups";

const StudentResults = () => {
    const [upInactiveToggle, setUpInactiveToggle] = useState(false);

    const {
        data: groups,
        error,
        mutate,
    } = useSWR("api/v1/group/student", () =>
        axios.get("api/v1/group/student").then(response => response.data.data),
    );

    console.log(groups);
    return (
        <StudentLayout header="Groups">
            {/* Title */}
            <HeadTitle title="Groups" />

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
                            {groups === undefined ? (
                                <SectionLoader />
                            ) : (
                                <StudentAllGroups groups={groups} />
                            )}
                        </>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
};

export default StudentResults;
