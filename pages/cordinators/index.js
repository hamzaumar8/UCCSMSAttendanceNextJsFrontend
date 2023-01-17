import { EyeIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../src/lib/axios";

const Cordinators = ({ modules, moduleSummay }) => {
    const [query, setQuery] = useState("");
    return (
        <AppLayout header="Coordinators">
            {/* Title */}
            <HeadTitle title="Coordinators" />

            {/* Main Sction */}
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <div className="flex space-x-4 items-center">
                        <h1 className="text-black font-extrabold text-xl">
                            Module Coordinators
                        </h1>
                    </div>
                    <div className="relative max-w-xs">
                        <input
                            type="text"
                            name="hs-table-search"
                            id="hs-table-search"
                            className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 outline-none"
                            placeholder="Search..."
                            onChange={e => setQuery(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <MagnifyingGlassIcon className="h-4 w-4 text-gray-text" />
                        </div>
                    </div>
                </div>
                <div className="my-3 overflow-x-auto bg-white shadow-lg rounded-lg overflow-y-auto relative">
                    <table className="table power-grid-table rounded-lg min-w-full border border-slate-200">
                        <thead className="shadow-sm bg-primary-accent border border-slate-200">
                            <tr>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-sm text-primary tracking-wider whitespace-nowrap">
                                    Photo
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                    Staff Id
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                    Name
                                </th>
                                <th className="capitalize font-bold px-2 pr-6 py-3 text-sm text-primary tracking-wider whitespace-nowrap text-center">
                                    Coordinating Modules
                                </th>
                                <th className="capitalize font-bold px-2 pr-6 py-3 text-sm text-primary tracking-wider whitespace-nowrap text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-text text-sm !border-[#E6EAEF]">
                            {modules
                                .filter(
                                    mod =>
                                        mod.cordinator.staff_id
                                            .toLowerCase()
                                            .includes(query) ||
                                        mod.cordinator.full_name
                                            .toLowerCase()
                                            .includes(query) ||
                                        mod.module.code
                                            .toLowerCase()
                                            .includes(query),
                                )
                                .map(module => (
                                    <tr className="" key={module.id}>
                                        <td className="capitalize text-center  p-3 whitespace-nowrap">
                                            <Image
                                                width={100}
                                                height={100}
                                                src={module.cordinator.picture}
                                                className="h-10 w-10 my-0 mx-auto"
                                                alt={
                                                    module.cordinator.first_name
                                                }
                                            />
                                        </td>
                                        <td className="capitalize p-3 whitespace-nowrap border-b">
                                            <span>
                                                <div>
                                                    {module.cordinator.staff_id}
                                                </div>
                                            </span>
                                        </td>
                                        <td className="capitalize p-3 whitespace-nowrap border-b">
                                            <span>
                                                <div>
                                                    {
                                                        module.cordinator
                                                            .full_name
                                                    }
                                                </div>
                                            </span>
                                        </td>
                                        <td className="capitalize p-3 whitespace-nowrap border-b text-center pr-6">
                                            <span>
                                                <div>{module.module.code}</div>
                                            </span>
                                        </td>

                                        <td className="capitalize py-3 whitespace-nowrap border-b !text-right pr-6">
                                            <div className="space-x-3">
                                                <Link
                                                    href={`/modules/${module.id}`}
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
            </div>
        </AppLayout>
    );
};

export default Cordinators;

export async function getServerSideProps() {
    const response = await axios.get("api/v1/modules");
    const modules = response.data.data;
    const moduleSummay = response.data.summary;
    return {
        props: {
            modules,
            moduleSummay,
        },
    };
}
