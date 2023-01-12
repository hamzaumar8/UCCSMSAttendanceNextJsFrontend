import Card from "../Card";

const LecturerAttendanceTotal = ({ attendance }) => {
    return (
        <Card
            className="border border-primary-accent"
            header={
                <h1 className="text-black-text font-extrabold capitalize">
                    lecturer Attendance Total
                </h1>
            }>
            <table className="table rounded-lg min-w-full  transition duration-500 ease-in-out border">
                <thead className="shadow-sm bg-primary-accent border border-slate-200">
                    <tr>
                        <th className="capitalize font-bold px-2 pl-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap"></th>
                        <th className="capitalize font-bold px-2 pl-4 py-3 text-center text-sm text-primary tracking-wider whitespace-nowrap">
                            Counts
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th
                            className="capitalize font-bold px-2 pl-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap bg-primary-accent border-b"
                            width="50%">
                            Present
                        </th>
                        <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                            {attendance.total.present}
                        </td>
                    </tr>
                    <tr>
                        <th
                            className="capitalize font-bold px-2 pl-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap bg-primary-accent border-b"
                            width="50%">
                            Absent
                        </th>
                        <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                            {attendance.total.absent}
                        </td>
                    </tr>
                    <tr>
                        <th
                            className="capitalize font-bold px-2 pl-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap bg-primary-accent border-b"
                            width="50%">
                            Total
                        </th>
                        <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                            {attendance.total.count}
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
    );
};

export default LecturerAttendanceTotal;
