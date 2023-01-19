import { EyeIcon } from "@heroicons/react/24/outline";
import format from "date-fns/format";
import Link from "next/link";
const StudentAllGroups = ({ groups }) => {
    return (
        <div className="mt-3 overflow-x-auto rounded-t-2xl bg-white overflow-y-auto relative">
            <table className="table  min-w-full">
                <thead className="bg-primary-accent">
                    <tr>
                        <th className="text-left capitalize font-bold px-2 pl-4 py-3 text-sm text-primary tracking-wider whitespace-nowrap">
                            No.
                        </th>
                        <th className="capitalize font-bold text-left px-2 py-3 text-sm text-primary tracking-wider whitespace-nowrap">
                            Group Name
                        </th>
                        <th className="capitalize font-bold text-left px-2 py-3 text-sm text-primary tracking-wider whitespace-nowrap">
                            Group Number
                        </th>
                    </tr>
                </thead>
                <tbody className="text-gray-text text-sm !border-[#E6EAEF]">
                    {groups?.length > 0 ? (
                        groups?.map((group, index) => (
                            <tr className="" key={index}>
                                <td className="capitalize p-3 whitespace-nowrap border-b">
                                    <span>
                                        <div>{index + 1}</div>
                                    </span>
                                </td>
                                <td className="capitalize p-3 whitespace-nowrap border-b">
                                    <span>
                                        <div>{group.name}</div>
                                    </span>
                                </td>
                                <td className="capitalize p-3 whitespace-nowrap border-b">
                                    <span>
                                        <div>{group.group_no}</div>
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="">
                            <td
                                className="capitalize text-center p-3 whitespace-nowrap border-b"
                                colSpan={6}>
                                <span>
                                    <div className="text-lg font-bold text-danger">
                                        No Results Found.
                                    </div>
                                </span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StudentAllGroups;
