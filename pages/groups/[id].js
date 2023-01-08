import { EyeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../src/lib/axios";

const Group = ({ group }) => {
    return (
        <AppLayout header={`${group.name} Groups`}>
            <HeadTitle title="Groups" />
            <div className="space-y-5">
                <div className="flex items-center justify-between relative">
                    <div className="flex space-x-4 items-center">
                        <h1 className="text-black font-extrabold text-xl">
                            Total Levels
                        </h1>
                        <span className="p-1 h-7 w-7 inline-flex items-center justify-center rounded-full text-xs text-white bg-primary">
                            {group.students.length}
                        </span>
                    </div>
                </div>
                <div className="my-3 overflow-x-auto bg-white shadow-lg rounded-lg overflow-y-auto">
                    <table className="table rounded-lg min-w-full border border-slate-200 transition duration-500 ease-in-out">
                        <thead className="shadow-sm bg-primary-accent border border-slate-200">
                            <tr>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-center text-sm text-primary tracking-wider whitespace-nowrap">
                                    Photo
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                    Index Number
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                    Name
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-center text-sm text-primary tracking-wider whitespace-nowrap">
                                    Group Number
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-center text-sm text-primary tracking-wider whitespace-nowrap">
                                    Presents(%)
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-center text-sm text-primary tracking-wider whitespace-nowrap">
                                    Absents(%)
                                </th>
                                <th className="capitalize font-bold px-2 pr-6 py-3 text-sm text-primary tracking-wider whitespace-nowrap text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-text text-sm !border-[#E6EAEF]">
                            {group.students.map((student, index) => (
                                <tr className="" key={index}>
                                    <td className="capitalize p-3 whitespace-nowrap">
                                        <Image
                                            src={student.picture}
                                            height={100}
                                            width={100}
                                            alt={student.index_number}
                                            className="w-14 h-12 my-0 mx-auto"
                                        />
                                    </td>
                                    <td className="uppercase p-3 whitespace-nowrap border-b">
                                        <span>
                                            <div>{student.index_number}</div>
                                        </span>
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b">
                                        <span>
                                            <div>{student.full_name}</div>
                                        </span>
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                                        <span>
                                            <div>{student.group_no}</div>
                                        </span>
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                                        <span>
                                            <div>
                                                {
                                                    student.attendance_stats
                                                        .present_percentage
                                                }
                                            </div>
                                        </span>
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                                        <span>
                                            <div>
                                                {
                                                    student.attendance_stats
                                                        .absent_percentage
                                                }
                                            </div>
                                        </span>
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b text-right pr-6">
                                        <Link
                                            href={`/students/${student.id}`}
                                            className="inline-flex cursor-pointer text-gray-text hover:!text-primary transition duration-500"
                                            title="Detials">
                                            <EyeIcon className="h-6 w-6" />
                                        </Link>
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

export default Group;

export async function getStaticPaths() {
    const response = await axios.get("/api/v1/levels");
    return {
        paths: response.data.data.map(group => ({
            params: { id: group.id.toString() },
        })),
        fallback: false, // can also be true or 'blocking'
    };
}

export async function getStaticProps({ params }) {
    const response = await axios.get(`/api/v1/levels/${params.id}`);
    return {
        props: {
            group: response.data.data,
        },
    };
}
