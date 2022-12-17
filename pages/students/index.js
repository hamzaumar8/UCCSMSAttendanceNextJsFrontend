import Link from "next/link";
import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../src/lib/axios";

const Student = ({ students }) => {
    return (
        <AppLayout header="Students">
            {/* Title */}
            <HeadTitle title="Students" />

            {/* Main Sction */}
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <div className="flex space-x-4 items-center">
                        <h1 className="text-black font-extrabold text-xl">
                            Total Students
                        </h1>
                        <span className="p-1 h-7 w-7 inline-flex items-center justify-center rounded-full text-xs text-white bg-primary">
                            98
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
                            Add Student
                        </Link>
                    </div>
                </div>
                <div className="my-3 overflow-x-auto bg-white shadow-lg rounded-lg overflow-y-auto relative">
                    <table className="table power-grid-table rounded-lg min-w-full border border-slate-200">
                        <thead className="shadow-sm bg-primary-accent border border-slate-200">
                            <tr>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                    Photo
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                    ID
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                    Name
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-right text-sm text-primary tracking-wider whitespace-nowrap">
                                    Absents(%)
                                </th>
                                <th className="capitalize font-bold px-2 pr-6 py-3 text-sm text-primary tracking-wider whitespace-nowrap text-right">
                                    Absents(%)
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-text text-sm !border-[#E6EAEF]">
                            {students.map(student => (
                                <tr className="" key={student.id}>
                                    <td className="capitalize p-3 whitespace-nowrap">
                                        <span>
                                            <div>
                                                {student.attributes.photo}
                                            </div>
                                        </span>
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b">
                                        <span>
                                            <div>
                                                {
                                                    student.attributes
                                                        .index_number
                                                }
                                            </div>
                                        </span>
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b">
                                        <span>
                                            <div>
                                                {student.attributes.full_name}
                                            </div>
                                        </span>
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b text-right">
                                        <span>
                                            <div>40</div>
                                        </span>
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b text-right pr-6">
                                        <span>
                                            <div>30</div>
                                        </span>
                                    </td>
                                    {/* <h1>{student.attributes.first_name}</h1>
                                        <Link href={`/students/${student.id}`}>
                                            details
                                        </Link> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* <div className="p-6 bg-white border-b border-gray-200">
                            {students.map(student => (
                                <div className="" key={student.id}>
                                    <h1>{student.attributes.first_name}</h1>
                                    <Link href={`/students/${student.id}`}>
                                        details
                                    </Link>
                                </div>
                            ))}
                        </div> */}
            </div>
        </AppLayout>
    );
};

export default Student;

export async function getStaticProps() {
    const response = await axios.get("api/v1/students");
    const students = response.data.data;
    return {
        props: {
            students,
        },
    };
}
