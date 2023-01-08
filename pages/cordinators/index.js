import { EyeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../src/lib/axios";

const Cordinators = ({ modules, moduleSummay }) => {
    return (
        <AppLayout header="Cordinators">
            {/* Title */}
            <HeadTitle title="Cordinators" />

            {/* Main Sction */}
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <div className="flex space-x-4 items-center">
                        <h1 className="text-black font-extrabold text-xl">
                            Total Cordinators
                        </h1>
                        <span className="p-1 h-7 w-7 inline-flex items-center justify-center rounded-full text-xs text-white bg-primary">
                            {modules.length}
                        </span>
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
                                    Cordinating Modules
                                </th>
                                <th className="capitalize font-bold px-2 pr-6 py-3 text-sm text-primary tracking-wider whitespace-nowrap text-right">
                                    Cordinating Modules
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-text text-sm !border-[#E6EAEF]">
                            {modules.map(module => (
                                <tr className="" key={module.id}>
                                    <td className="capitalize text-center  p-3 whitespace-nowrap">
                                        <Image
                                            width={100}
                                            height={100}
                                            src={module.cordinator.picture}
                                            className="h-10 w-10 my-0 mx-auto"
                                            alt={module.cordinator.first_name}
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
                                                {module.cordinator.title}{" "}
                                                {module.cordinator.first_name}{" "}
                                                {module.cordinator.other_name &&
                                                    module.cordinator
                                                        .other_name + " "}
                                                {module.cordinator.surname}
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

export async function getStaticProps() {
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
