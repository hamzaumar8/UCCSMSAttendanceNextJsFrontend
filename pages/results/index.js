import { EyeIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ModuleCard from "../../components/Cards/ModuleCard";
import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import AllResults from "../../components/Results/AllResults";
import CordinatingModules from "../../components/Results/CordinatingModules";
import SemesterTag from "../../components/SemesterTag";
import axios from "../../src/lib/axios";

const Results = ({ results }) => {
    const [upInactiveToggle, setUpInactiveToggle] = useState(false);
    const [cordinatingModules, setCordinatingModules] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCordinatingModules = async () => {
        const response = await axios.get("api/v1/cordinating/modules");
        response.status === 200 && setCordinatingModules(response.data.data);
    };
    useEffect(() => {
        setIsLoading(true);
        fetchCordinatingModules();
        setIsLoading(false);
    }, []);

    return (
        <AppLayout header="Results">
            {/* Title */}
            <HeadTitle title="Results" />

            {/* Main Sction */}
            <div className="space-y-5">
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
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={upInactiveToggle ? "upcoming" : "inactive"}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}>
                            <div className="py-2 pb-6 bg-white space-y-3 transition duration-500 ease-in-out">
                                {!upInactiveToggle ? (
                                    <AllResults results={results} />
                                ) : (
                                    <>
                                        {isLoading ? (
                                            "LOADING ..."
                                        ) : (
                                            <CordinatingModules
                                                cordinatingModules={
                                                    cordinatingModules
                                                }
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </AppLayout>
    );
};

export default Results;

export async function getStaticProps() {
    const response = await axios.get("api/v1/results");
    const results = response.data.data;

    return {
        props: {
            results,
        },
    };
}
