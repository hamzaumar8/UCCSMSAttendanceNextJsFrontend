import Link from "next/link";
import LecturerLayout from "../../../components/Layouts/LecturerLayout";
import HeadTitle from "../../../components/HeadTitle";
import SemesterTag from "../../../components/SemesterTag";
import axios from "../../../src/lib/axios";
import { useEffect, useState } from "react";

const Result = ({ result }) => {
    const [userr, setUserr] = useState(null);

    const fetchUserr = async () => {
        const response = await axios.get("/api/v1/user");
        response.status === 200 && setUserr(response.data.data);
    };

    useEffect(() => {
        fetchUserr();
    }, []);
    return (
        <LecturerLayout
            header={`${result.module.module.code} Results`}
            breadcrumbs={
                <div className="space-x-1 text-primary font-bold text-sm capitalize">
                    <Link href={"/staff"}>Home /</Link>
                    <Link href={"/staff/results"}>Results /</Link>
                    <span className="text-gray-text">
                        {result.module.module.code}
                    </span>
                </div>
            }>
            <HeadTitle title={`${result.module.module.code} Results`} />

            {/* Main content */}
            <div className="relative space-y-8 sm:mt-10">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg transition duration-500 ease-in-out">
                    {/* Header */}
                    <div className="px-5 block sm:flex  items-center justify-between relative py-4 ">
                        <div className="flex items-center justify-center space-x-8">
                            <h1 className="text-2xl font-extrabold ">
                                {result.module.module.code}
                            </h1>
                            <SemesterTag />
                        </div>
                        {userr !== null &&
                            userr?.lecturer.id === result.cordinator_id && (
                                <>
                                    {result.status === "save" && (
                                        <div>
                                            <Link
                                                href={`/staff/results/edit/${result.id}`}
                                                className="bg-primary py-2 px-6 rounded-full capitalize text-xs font-bold text-white">
                                                Edit Results
                                            </Link>
                                        </div>
                                    )}
                                </>
                            )}
                    </div>
                    <div className="overflow-x-auto rounded-t-2xl bg-white overflow-y-auto relative">
                        <table className="table  min-w-full">
                            <thead className="bg-primary-accent">
                                <tr>
                                    <th className="text-left capitalize font-bold px-2 py-3 text-sm text-primary tracking-wider whitespace-nowrap pl-6">
                                        No.
                                    </th>
                                    <th className="text-left capitalize font-bold px-2 py-3 text-sm text-primary tracking-wider whitespace-nowrap">
                                        Index Number
                                    </th>
                                    <th className="capitalize font-bold text-left px-2 py-3 text-sm text-primary tracking-wider whitespace-nowrap">
                                        Name
                                    </th>
                                    <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                        Score
                                    </th>
                                    <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                        Remark
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-text text-sm !border-[#E6EAEF]">
                                {result.assessments.map((assessment, index) => (
                                    <tr className="" key={index}>
                                        <td className="capitalize p-5 whitespace-nowrap border-b">
                                            <span>
                                                <div>{index + 1}.</div>
                                            </span>
                                        </td>
                                        <td className="capitalize p-5 whitespace-nowrap border-b">
                                            <span>
                                                <div>
                                                    {
                                                        assessment.student
                                                            .index_number
                                                    }
                                                </div>
                                            </span>
                                        </td>
                                        <td className="capitalize p-5 whitespace-nowrap border-b">
                                            <span>
                                                <div>
                                                    {
                                                        assessment.student
                                                            .full_name
                                                    }
                                                </div>
                                            </span>
                                        </td>
                                        <td className="capitalize p-5 whitespace-nowrap border-b">
                                            <span>
                                                <div>{assessment.score}</div>
                                            </span>
                                        </td>
                                        <td className="capitalize py-5  border-b">
                                            <div>
                                                {assessment.remarks ===
                                                    "honour" && (
                                                    <span className="bg-secondary-accent text-green-600 font-bold block text-center w-[130px] px-6 py-2 rounded-full text-xs">
                                                        Honour
                                                    </span>
                                                )}
                                                {assessment.remarks ===
                                                    "pass" && (
                                                    <span className="bg-primary-accent text-primary font-bold block text-center w-[130px] px-6 py-2 rounded-full text-xs">
                                                        Pass
                                                    </span>
                                                )}
                                                {assessment.remarks ===
                                                    "fail" && (
                                                    <span className="bg-red-200 text-danger font-bold block text-center w-[130px] px-6 py-2 rounded-full text-xs">
                                                        Fail
                                                    </span>
                                                )}
                                                {assessment.remarks ===
                                                    "ic" && (
                                                    <span className="bg-white text-red-600 font-bold block text-center w-[130px] px-6 py-2 rounded-full text-xs">
                                                        Incomplete
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </LecturerLayout>
    );
};

export default Result;

export async function getServerSideProps({ params }) {
    const response = await axios.get(`/api/v1/results/${params.id}`);
    return {
        props: {
            result: response.data.data,
        },
    };
}
