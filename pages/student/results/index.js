import { AnimatePresence, motion } from "framer-motion";
import useSWR from "swr";
import { useState } from "react";
import HeadTitle from "../../../components/HeadTitle";
import { SectionLoader } from "../../../components/PageLoader";
import SemesterTag from "../../../components/SemesterTag";
import axios from "../../../src/lib/axios";
import StudentLayout from "../../../components/Layouts/StudentLayout";
import StudentAllResults from "../../../components/Student/Results/StudentAllResults";

const StudentResults = () => {
    const [upInactiveToggle, setUpInactiveToggle] = useState(false);

    const {
        data: studentResults,
        error,
        mutate,
    } = useSWR("api/v1/result/student", () =>
        axios.get("api/v1/result/student").then(response => response.data),
    );

    return (
        <StudentLayout header="Results">
            {/* Title */}
            <HeadTitle title="Results" />

            {/* Main Sction */}
            <div className="space-y-8 sm:mt-10">
                {studentResults === undefined ? (
                    <SectionLoader />
                ) : (
                    <StudentAllResults studentResults={studentResults} />
                )}
            </div>
        </StudentLayout>
    );
};

export default StudentResults;
