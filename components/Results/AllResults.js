import { EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useResult } from "../../src/hooks/result";
import Button from "../Button";
import Loader from "../Loader";

const AllResults = ({ results }) => {
    const { updateResultStatus, loading } = useResult();
    const handleStatusChange = (e, id) => {
        e.preventDefault();
        updateResultStatus({
            id,
        });
    };
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
                        <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                            Status
                        </th>
                        <th className="capitalize font-bold px-2 pr-6 py-3 text-sm text-primary tracking-wider whitespace-nowrap text-right">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="text-gray-text text-sm !border-[#E6EAEF]">
                    {results?.map((result, index) => (
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
                            <td className="capitalize py-3  border-b">
                                <div>
                                    {result.status === "save" ? (
                                        <span className="bg-white py-1 px-3 rounded-md font-bold text-primary">
                                            Save
                                        </span>
                                    ) : (
                                        <span className="bg-white py-1 px-3 rounded-md font-bold text-green-600">
                                            Published
                                        </span>
                                    )}
                                </div>
                            </td>

                            <td className="capitalize py-3 whitespace-nowrap border-b !text-right pr-5">
                                <div className="space-x-3 inline-flex">
                                    <Link
                                        href={`/results/${result.id}`}
                                        legacyBehavior>
                                        <a
                                            className="inline-flex cursor-pointer text-gray-text hover:!text-secondary transition duration-500"
                                            title="Details">
                                            <EyeIcon className="h-6 w-6 " />
                                        </a>
                                    </Link>
                                    <div>
                                        <button
                                            disabled={loading}
                                            onClick={e =>
                                                handleStatusChange(e, result.id)
                                            }
                                            className="bg-primary-accent  py-1 px-3 rounded-md text-xs font-bold  text-primary outline-none inline-flex space-x-2">
                                            {result.status === "save"
                                                ? "Publish"
                                                : "Edit"}
                                            {loading && <Loader />}
                                        </button>
                                    </div>
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
