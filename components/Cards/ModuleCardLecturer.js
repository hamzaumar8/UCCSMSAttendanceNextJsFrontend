import { ArrowTrendingDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

const ModuleCardLecturer = ({ attendance }) => {
    const status = attendance.module.status;
    return (
        <Link
            href={`/staff/attendances/${attendance.id}`}
            className={`${
                status === "active" ? "bg-secondary" : "bg-primary-accent"
            } rounded-lg block transition ease-in-out duration-300`}>
            <div className="border-b border-[#00000029] flex items-center justify-between p-4">
                <div className="flex items-center space-x-3 text-xs font-extrabold text-black-text">
                    <h2 className="uppercase">
                        {attendance.module.module.code}
                    </h2>
                    <div className="rounded-full border-2 border-gray-900 py-1 px-3">
                        {attendance.module.days.covered}/
                        <span className="text-gray-500 mr-1">
                            {attendance.module.days.total}
                        </span>{" "}
                        Days
                    </div>
                </div>
            </div>
            <div className="px-4 py-3 space-y-3">
                <h1 className="capitalize font-gray-800 text-lg font-bold">
                    {attendance.module.module.title}
                </h1>
                <div
                    className={`grid grid-cols-2 rounded-md ${
                        status === "active" ? "bg-secondary-accent" : "bg-white"
                    }`}>
                    <div className="py-2 px-6 border-r border-[#00000029] space-y-2 ">
                        <h3 className="text-xs font-bold text-black-text">
                            My Attendance
                        </h3>
                        <div className="font-bold text-black-text">
                            {attendance.total.present}/{attendance.total.count}
                        </div>
                    </div>
                    <div className="py-2 px-6 space-y-2">
                        <h3 className="text-xs font-bold text-black-text">
                            Students Present
                        </h3>
                        <div className="font-bold text-lg flex items-center space-x-2 text-black-text">
                            <span>
                                {attendance.total.student.present}/
                                {attendance.total.student.count}{" "}
                            </span>
                            {attendance.total.student.present >
                                attendance.total.student.absent && (
                                <span>
                                    <ArrowTrendingDownIcon className="h-6 w-6 text-green-700" />
                                </span>
                            )}
                            {attendance.total.student.present <
                                attendance.total.student.absent && (
                                <span>
                                    <ArrowTrendingDownIcon className="h-6 w-6 text-red-700" />
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ModuleCardLecturer;
