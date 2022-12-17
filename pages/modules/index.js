import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import ModuleCard from "../../components/Cards/ModuleCard";
import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../src/lib/axios";

const Modules = () => {
    const [viewAll, setViewAll] = useState(false);
    const [upViewAll, setUpViewAll] = useState(false);
    const [upPastToggle, setUpPastToggle] = useState(false);
    return (
        <AppLayout header="Modules">
            <HeadTitle title="Modules" />

            <div className="relative space-y-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    {/* Header */}
                    <div className="p-5 block sm:flex  items-center justify-between relative border-b ">
                        <div className="flex items-center justify-center space-x-4">
                            <h1 className="text-xl font-extrabold">
                                Active Modules
                            </h1>
                            <div className="bg-primary rounded-full text-white h-8 w-8 inline-flex items-center justify-center">
                                6
                            </div>
                        </div>
                        <div className="space-x-20 flex items-center">
                            <div>
                                <button
                                    className="inline-flex items-center px-5 py-3 bg-primary-accent text-primary border border-transparent rounded-full font-semibold text-xs capitalize tracking-widest hover:bg-blue-700 hover:text-white active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity:25 transition ease-in-out duration-150"
                                    onClick={() => setViewAll(!viewAll)}>
                                    View {viewAll ? "less" : "all"}
                                </button>
                            </div>
                            <div>
                                <Link
                                    href={"/"}
                                    className="inline-flex items-center px-4 py-3 bg-primary text-white border border-transparent rounded-full font-semibold text-xs capitalize tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity:25 transition ease-in-out duration-150">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15"
                                        />
                                    </svg>
                                    Mount Module
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="py-4 px-5 pb-6 bg-white space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {viewAll ? (
                                <>
                                    <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                    <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                    <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                    <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                    <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                    <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                </>
                            ) : (
                                <>
                                    <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                    <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                    <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Upcoming Modules */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    {/* Header */}
                    <div className="px-5 pt-5 block sm:flex  items-center justify-between relative border-b ">
                        <div className="flex items-center justify-center space-x-8">
                            <button
                                className={`${
                                    !upPastToggle &&
                                    "border-primary text-primary"
                                } border-b-4 pb-4 transition duration-150 ease-in-out`}
                                onClick={() => setUpPastToggle(!upPastToggle)}>
                                <h1 className="text-xl font-extrabold ">
                                    Upcomming Modules
                                </h1>
                            </button>
                            <button
                                className={`${
                                    upPastToggle &&
                                    "border-primary text-primary"
                                } border-b-4 pb-4 transition duration-150 ease-in-out`}
                                onClick={() => setUpPastToggle(!upPastToggle)}>
                                <h1 className="text-xl font-extrabold ">
                                    Past Modules
                                </h1>
                            </button>
                        </div>
                        <div className="">
                            <button
                                className="inline-flex items-center px-5 py-3 bg-primary-accent text-primary border border-transparent rounded-full font-semibold text-xs capitalize tracking-widest hover:bg-blue-700 hover:text-white active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity:25 transition ease-in-out duration-150"
                                onClick={() => setUpViewAll(!upViewAll)}>
                                View {upViewAll ? "less" : "all"}
                            </button>
                        </div>
                    </div>
                    <div className="py-4 px-5 pb-6 bg-white space-y-3">
                        {!upPastToggle ? (
                            // Upcomming
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {upViewAll ? (
                                    <>
                                        <ModuleCard title="up past Molecular and Cellular Basics of Health and Diseses I" />
                                        <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                        <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                        <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                        <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                        <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                    </>
                                ) : (
                                    <>
                                        <ModuleCard title="past Molecular and Cellular Basics of Health and Diseses I" />
                                        <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                        <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                    </>
                                )}
                            </div>
                        ) : (
                            // past
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {upViewAll ? (
                                    <>
                                        <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                        <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                        <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                        <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                        <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                        <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                    </>
                                ) : (
                                    <>
                                        <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                        <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                        <ModuleCard title="Molecular and Cellular Basics of Health and Diseses I" />
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* {students.map(student => (
                                <div className="" key={student.id}>
                                    <h1>{student.attributes.first_name}</h1>
                                    <Link href={`/students/${student.id}`}>
                                        details
                                    </Link>
                                </div>
                            ))} */}
        </AppLayout>
    );
};

export default Modules;

// export async function getStaticProps() {
//     const response = await axios.get("api/v1/students");
//     const students = response.data.data;
//     return {
//         props: {
//             students,
//         },
//     };
// }
