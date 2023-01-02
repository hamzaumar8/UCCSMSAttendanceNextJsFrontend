import { EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const AllResults = ({ results }) => {
    return (
        <div className="my-3 overflow-x-auto rounded-t-2xl bg-white overflow-y-auto relative">
            <table className="table  min-w-full">
                <thead className="bg-primary-accent">
                    <tr>
                        <th className="text-left capitalize font-bold px-2 pl-4 py-3 text-sm text-primary tracking-wider whitespace-nowrap">
                            No.
                        </th>
                        <th className="capitalize font-bold text-left px-2 py-3 text-sm text-primary tracking-wider whitespace-nowrap">
                            Module
                        </th>
                        <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                            code
                        </th>
                        <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                            Cordinator
                        </th>
                        <th className="capitalize font-bold px-2 pr-6 py-3 text-sm text-primary tracking-wider whitespace-nowrap text-right">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="text-gray-text text-sm !border-[#E6EAEF]">
                    {results.map((result, index) => (
                        <tr className="" key={index}>
                            <td className="capitalize p-3 whitespace-nowrap border-b">
                                <span>
                                    <div>{index + 1}</div>
                                </span>
                            </td>
                            <td className="capitalize p-3 whitespace-nowrap border-b">
                                <span>
                                    <div>{result.module.module.title}</div>
                                </span>
                            </td>
                            <td className="capitalize p-3 whitespace-nowrap border-b">
                                <span>
                                    <div>{result.module.module.code}</div>
                                </span>
                            </td>
                            <td className="capitalize py-3  border-b">
                                <div>{result.module.cordinator.full_name}</div>
                            </td>

                            <td className="capitalize py-3 whitespace-nowrap border-b !text-right pr-6">
                                <div className="space-x-3">
                                    <Link
                                        href={`/results/${result.id}`}
                                        legacyBehavior>
                                        <a
                                            className="inline-flex cursor-pointer text-gray-text hover:!text-secondary transition duration-500"
                                            title="Details">
                                            <EyeIcon className="h-6 w-6 " />
                                        </a>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllResults;
