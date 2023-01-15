import { EyeIcon } from "@heroicons/react/24/outline";
import format from "date-fns/format";
import Link from "next/link";
const StaffCordModules = ({ cord_modules }) => {
    return (
        <div className="mt-3 overflow-x-auto rounded-t-2xl bg-white overflow-y-auto relative">
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
                            Modules Span
                        </th>
                        <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                            Status
                        </th>
                        <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                            lecturer <span className="lowercase">(s)</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="text-gray-text text-sm !border-[#E6EAEF]">
                    {cord_modules?.length > 0 ? (
                        cord_modules?.map((cord_module, index) => {
                            const startDate = format(
                                new Date(cord_module.start_date),
                                "do MMM",
                            );
                            const endDate = format(
                                new Date(cord_module.end_date),
                                "do MMM, yyyy",
                            );
                            return (
                                <tr className="" key={index}>
                                    <td className="capitalize p-3 whitespace-nowrap border-b">
                                        <span>
                                            <div>{index + 1}</div>
                                        </span>
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b">
                                        <span>
                                            <div>
                                                {cord_module.module.code} -{" "}
                                                {cord_module.module.title}
                                            </div>
                                        </span>
                                    </td>
                                    <td className="uppercase p-3 whitespace-nowrap border-b ">
                                        <span>
                                            <div>
                                                {startDate} - {endDate}
                                            </div>
                                        </span>
                                    </td>
                                    <td className="capitalize py-3  border-b">
                                        <div>
                                            <span
                                                className={`py-1 px-3 rounded-md text-xs font-bold ${
                                                    cord_module.status ===
                                                        "inactive" &&
                                                    "bg-red-200 text-danger"
                                                } ${
                                                    cord_module.status ===
                                                        "active" &&
                                                    "bg-secondary-accent text-green-600"
                                                } ${
                                                    cord_module.status ===
                                                        "upcoming" &&
                                                    "bg-primary-accent text-primary"
                                                }`}>
                                                {cord_module.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-3 whitespace-nowrap border-b">
                                        {cord_module.lecturers.map(
                                            (lect, index) => (
                                                <div key={index}>
                                                    {lect.full_name}
                                                </div>
                                            ),
                                        )}
                                    </td>
                                </tr>
                            );
                        })
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

export default StaffCordModules;
