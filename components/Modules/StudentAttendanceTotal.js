import Card from "../Card";

const StudentAttendanceTotal = ({ attendance }) => {
    return (
        <Card
            className="border border-primary-accent"
            header={
                <h1 className="text-black-text font-extrabold capitalize">
                    Student Attendance Total
                </h1>
            }>
            <table className="table rounded-lg min-w-full  transition duration-500 ease-in-out border">
                <thead className="shadow-sm bg-secondary-accent border border-slate-200">
                    <tr>
                        <th className="capitalize font-bold px-2 pl-4 py-3 text-left text-sm text-green-700 tracking-wider whitespace-nowrap"></th>
                        <th className="capitalize font-bold px-2 pl-4 py-3 text-center text-sm text-green-700 tracking-wider whitespace-nowrap">
                            Counts
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th
                            className="capitalize font-bold px-2 pl-4 py-3 text-left text-sm text-green-700 tracking-wider whitespace-nowrap bg-secondary-accent border-b"
                            width="50%">
                            Present
                        </th>
                        <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                            {attendance.total.student_attendance.present}
                        </td>
                    </tr>
                    <tr>
                        <th
                            className="capitalize font-bold px-2 pl-4 py-3 text-left text-sm text-green-700 tracking-wider whitespace-nowrap bg-secondary-accent border-b"
                            width="50%">
                            Absent
                        </th>
                        <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                            {attendance.total.student_attendance.absent}
                        </td>
                    </tr>
                    <tr>
                        <th
                            className="capitalize font-bold px-2 pl-4 py-3 text-left text-sm text-green-700 tracking-wider whitespace-nowrap bg-secondary-accent border-b"
                            width="50%">
                            Total
                        </th>
                        <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                            {attendance.total.student_attendance.count}
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
    );
};

export default StudentAttendanceTotal;
