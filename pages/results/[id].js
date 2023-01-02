import { EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Button from "../../components/Button";
import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../src/lib/axios";

const Result = ({ result }) => {
    console.log(result);
    return (
        <AppLayout header={`${result.module.module.code} Results`}>
            <HeadTitle title="" />

            {/* Main content */}
            <div className="relative space-y-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg transition duration-500 ease-in-out">
                    {/* Header */}
                    <div className="px-5 block sm:flex  items-center justify-between relative py-4 ">
                        <div className="flex items-center justify-center space-x-8">
                            <h1 className="text-2xl font-extrabold ">
                                {result.module.module.code}
                            </h1>
                            <div className="flex border border-primary p-1 px-6 space-x-2 rounded-full text-sm capitalize font-bold text-primary">
                                <span>2022-2023</span>
                                <span>first semester</span>
                            </div>
                        </div>
                        <div>
                            <Button className="!rounded-full !capitalize px-6">
                                Edit Results
                            </Button>
                        </div>
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
                                                    <span className="bg-red-300 text-white font-bold block text-center w-[130px] px-6 py-2 rounded-full text-xs">
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
        </AppLayout>
    );
};

export default Result;

export async function getStaticPaths() {
    const response = await axios.get("/api/v1/results");
    return {
        paths: response.data.data.map(result => ({
            params: { id: result.id.toString() },
        })),
        fallback: false, // can also be true or 'blocking'
    };
}

export async function getStaticProps({ params }) {
    const response = await axios.get(`/api/v1/results/${params.id}`);
    return {
        props: {
            result: response.data.data,
        },
    };
}
