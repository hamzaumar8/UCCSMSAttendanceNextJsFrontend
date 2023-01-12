import { format } from "date-fns";
const LecturerAttendance = ({ module }) => {
    return (
        <div>
            <div className="flex items-center justify-between relative">
                <div className="flex space-x-4 items-center">
                    <h1 className="text-black font-extrabold text-xl">
                        Total Lecturers Attendance
                    </h1>
                    <span className="p-1 h-7 w-7 inline-flex items-center justify-center rounded-full text-xs text-white bg-primary">
                        {module.att_lect.length}
                    </span>
                </div>
                <div></div>
            </div>
            <div className="my-3 overflow-x-auto bg-white shadow-lg rounded-lg overflow-y-auto">
                <table className="table rounded-lg min-w-full border border-slate-200 transition duration-500 ease-in-out">
                    <thead className="shadow-sm bg-primary-accent border border-slate-200">
                        <tr>
                            <th className="capitalize font-bold px-2 pl-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                NO.
                            </th>
                            <th className="capitalize font-bold px-2 pl-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                Name
                            </th>
                            <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                Date
                            </th>
                            <th className="capitalize font-bold px-2 pr-4 py-3 text-center text-sm text-primary tracking-wider whitespace-nowrap">
                                Status
                            </th>
                            <th className="capitalize font-bold px-2 pr-4 py-3 text-center text-sm text-primary tracking-wider whitespace-nowrap">
                                Start Time
                            </th>
                            <th className="capitalize font-bold px-2 pr-6 py-3 text-sm text-primary tracking-wider whitespace-nowrap text-center">
                                End Time
                            </th>
                            <th className="capitalize font-bold px-2 pr-6 py-3 text-sm text-primary tracking-wider whitespace-nowrap text-center">
                                Check in At
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-text text-sm !border-[#E6EAEF]">
                        {module.att_lect.map((attendance, index) => {
                            const lecturers = module.lecturers.filter(
                                lec => lec.id === attendance.lecturer_id,
                            );
                            const startTime = new Date(
                                Date.parse(
                                    attendance.date +
                                        "T" +
                                        attendance.start_time,
                                ),
                            );
                            const endTime = new Date(
                                Date.parse(
                                    attendance.date + "T" + attendance.end_time,
                                ),
                            );
                            return (
                                <tr className="" key={index}>
                                    <td className="uppercase p-3 whitespace-nowrap border-b">
                                        <span>
                                            <div>{index + 1}.</div>
                                        </span>
                                    </td>
                                    <td className="uppercase p-3 whitespace-nowrap border-b">
                                        <span>
                                            <div>{lecturers[0].full_name}</div>
                                        </span>
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b">
                                        <span>
                                            <div>
                                                {format(
                                                    new Date(attendance.date),
                                                    "dd/MM/yyyy",
                                                )}
                                            </div>
                                        </span>
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                                        <span>
                                            <div>{attendance.status}</div>
                                        </span>
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                                        <span>
                                            <div>
                                                {format(startTime, "HH:mm aa")}
                                            </div>
                                        </span>
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                                        <span>
                                            <div>
                                                {format(endTime, "HH:mm aa")}
                                            </div>
                                        </span>
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                                        <span>
                                            <div>
                                                {format(
                                                    new Date(
                                                        attendance.created_at,
                                                    ),
                                                    "dd/MM/yyyy HH:mm aa",
                                                )}
                                            </div>
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LecturerAttendance;
