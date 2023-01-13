import { EyeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HeadTitle from "../../components/HeadTitle";
import Input from "../../components/Input";
import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../src/lib/axios";

const Group = ({ group }) => {
    const [query, setQuery] = useState("");
    return (
        <AppLayout
            header={`${group.name} Groups`}
            breadcrumbs={
                <div className="space-x-1 text-primary font-bold text-sm capitalize">
                    <Link href={"/dashboard"}>Dasbord /</Link>
                    <Link href={"/groups"}>Groups /</Link>
                    <span className="text-gray-text">{group.name}</span>
                </div>
            }>
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
                    <div>
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="bg-primary-accent border-primary text-sm text-gray-text outline-none min-w-max px-8 py-2 rounded-sm shadow-sm"
                            onChange={e => setQuery(e.target.value)}
                        />
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
                            {group.students
                                .filter(
                                    stud =>
                                        stud.index_number
                                            .toLowerCase()
                                            .includes(query) ||
                                        stud.full_name
                                            .toLowerCase()
                                            .includes(query),
                                    //     ||
                                    // stud.group_no.includes(query),
                                )
                                .map((student, index) => (
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
                                                <div>
                                                    {student.index_number}
                                                </div>
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

export async function getServerSideProps({ params }) {
    const response = await axios.get(`/api/v1/levels/${params.id}`);
    return {
        props: {
            group: response.data.data,
        },
    };
}
