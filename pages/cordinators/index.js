import Image from "next/image";
import Link from "next/link";
import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../src/lib/axios";

const Cordinators = ({ modules, modeulesSummary }) => {
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
                    <div className="space-x-5">
                        <div className="rounded-full border border-primary p-0.5 space-x-2">
                            <div className="rounded-full inline-block px-8 py-2 bg-primary text-white text-xs ">
                                levels
                            </div>
                            <div className="rounded-full inline-block px-8 py-2 bg-white text-primary text-xs ">
                                Modules
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link
                            href={"/"}
                            className="inline-flex items-center px-4 py-2 bg-primary text-white border border-transparent rounded-full font-semibold text-xs capitalize tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity:25 transition ease-in-out duration-150">
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
                            Add Lecturer
                        </Link>
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
                                    Name
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
                                            src={module.cordinator.picture_url}
                                            className="h-10 w-10 my-0 mx-auto"
                                            alt={module.cordinator.first_name}
                                        />
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b">
                                        <span>
                                            <div>
                                                {module.cordinator.title}{" "}
                                                {module.cordinator.first_name}{" "}
                                                {module.cordinator.other_name}
                                                {module.cordinator.other_name &&
                                                    " "}
                                                {module.cordinator.last_name}
                                            </div>
                                        </span>
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b text-right pr-6">
                                        <span>
                                            <div>{module.code}</div>
                                        </span>
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
    const modeulesSummary = response.data.summary;
    return {
        props: {
            modules,
            modeulesSummary,
        },
    };
}
