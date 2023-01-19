import { EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
const StudentAllResults = ({ studentResults }) => {
    const results = Object.values(studentResults);
    return (
        <div className="">
            {results?.map((result, index) => (
                <div
                    key={index}
                    className="mb-10 bg-white overflow-hidden shadow-sm sm:rounded-lg transition duration-500 ease-in-out">
                    <div className="px-5 py-4">
                        <h1 className="text-xl capitalize font-extrabold space-x-1">
                            <span>{result[0].semester.academic_year}</span>
                            <span>Academic Year,</span>
                            <span>{result[0].semester.semester} semester</span>
                        </h1>
                    </div>
                    <div className="overflow-x-auto rounded-t-3xl bg-white overflow-y-auto relative">
                        <table className="table  min-w-full">
                            <thead className="bg-primary-accent">
                                <tr>
                                    <th className="text-left capitalize font-bold px-2 pl-4 py-3 text-sm text-primary tracking-wider whitespace-nowrap">
                                        No.
                                    </th>
                                    <th className="capitalize font-bold text-left px-2 py-3 text-sm text-primary tracking-wider whitespace-nowrap">
                                        Code
                                    </th>
                                    <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                        Title
                                    </th>
                                    <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                        Scores
                                    </th>
                                    <th className="capitalize font-bold px-2 pr-6 py-3 text-sm text-primary tracking-wider whitespace-nowrap text-center">
                                        Remarks
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-text text-sm !border-[#E6EAEF]">
                                {result?.map((grade, index) => (
                                    <tr className="" key={index}>
                                        <td className="capitalize p-3 whitespace-nowrap border-b">
                                            <span>
                                                <div>{index + 1}</div>
                                            </span>
                                        </td>
                                        <td className="capitalize p-3 whitespace-nowrap border-b">
                                            <span>
                                                <div>
                                                    {grade.module.module.code}
                                                </div>
                                            </span>
                                        </td>
                                        <td className="capitalize p-3 whitespace-nowrap border-b">
                                            <span>
                                                <div>
                                                    {grade.module.module.title}
                                                </div>
                                            </span>
                                        </td>
                                        <td className="capitalize p-3  border-b">
                                            {grade.score}
                                        </td>
                                        <td className="capitalize px-2 pr-6 py-3 text-center border-b">
                                            <span
                                                className={`${
                                                    grade.remarks === "fail" &&
                                                    "text-red-700"
                                                } ${
                                                    grade.remarks ===
                                                        "honour" &&
                                                    "text-green-500"
                                                } ${
                                                    grade.remarks === "pass" &&
                                                    "text-primary"
                                                } font-bold`}>
                                                {grade.remarks}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StudentAllResults;
