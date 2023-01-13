import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Dropdown from "../Dropdown";
import DropdownLink, { DropdownButton } from "../DropdownLink";
import { useModule } from "../../src/hooks/module";
const ModuleCardLecturer = ({ module }) => {
    const { deleteMountModule, loading } = useModule();
    const active = module.status === "active";

    return (
        <div
            className={`${
                active ? "bg-secondary" : "bg-primary-accent"
            } rounded-lg block transition ease-in-out duration-300`}>
            <div className="border-b border-[#f5646429] flex items-center justify-between p-4">
                <div className="flex items-center space-x-3 text-xs font-extrabold text-black-text">
                    <h2 className="uppercase">{module.module.code}</h2>
                    <div className="rounded-full border-2 border-gray-900 py-1 px-3">
                        {module.days.covered}/
                        <span className="text-gray-500 mr-1">
                            {module.days.total}
                        </span>{" "}
                        Days
                    </div>
                </div>

                {/* <Dropdown
                    width="w-40"
                    align="right"
                    trigger={
                        <button className="bg-primary rounded-full text-white h-8 w-8 inline-flex items-center justify-center cursor-pointer">
                            <EllipsisHorizontalIcon />
                        </button>
                    }>
                    <DropdownLink href={`modules/${module.id}`}>
                        <PencilSquareIcon className="h-5 w-5 mr-1 text-secondary" />
                        Details
                    </DropdownLink>
                </Dropdown> */}
                <div
                    className={`${
                        active ? "bg-secondary-accent" : "bg-white"
                    } rounded-full font-bold text-primary text-sm p-1 px-4  inline-block`}>
                    {module.level.name}
                </div>
            </div>
            <div className="px-4 py-3 space-y-3">
                <h1 className="capitalize font-gray-800 text-lg font-bold">
                    {module.module.title}
                </h1>
                <div
                    className={`grid grid-cols-2 rounded-md ${
                        active ? "bg-secondary-accent" : "bg-white"
                    }`}>
                    <div className="py-2 px-6 border-r border-[#00000029] space-y-2 ">
                        <h3 className="text-xs font-bold text-black-text">
                            Lecturer Attendance
                        </h3>
                        <div className="font-bold text-black-text">
                            {active || module.status === "inactive"
                                ? module.attendance.total.present
                                : "--"}
                            /
                            {active || module.status === "inactive"
                                ? module.attendance.total.count
                                : "--"}
                        </div>
                    </div>
                    <div className="py-2 px-6 space-y-2">
                        <h3 className="text-xs font-bold text-black-text">
                            Students Attendance (%)
                        </h3>
                        <div className="font-bold text-black-text">
                            {active || module.status === "inactive"
                                ? module.attendance.total.student_attendance
                                      .present_percentage
                                : "--"}
                            /
                            {active || module.status === "inactive"
                                ? "100"
                                : "--"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleCardLecturer;
