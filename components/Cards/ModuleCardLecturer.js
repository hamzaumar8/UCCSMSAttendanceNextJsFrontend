import Image from "next/image";

const ModuleCardLecturer = ({ lecturermodule, active = "" }) => {
    return (
        <div
            className={`${
                active ? "bg-secondary" : "bg-primary-accent"
            } overflow-hidden rounded-lg block relative transition ease-in-out duration-300`}>
            <div className="border-b border-[#00000029] flex items-center justify-between p-4">
                <div className="flex items-center space-x-3 text-xs font-extrabold text-black-text">
                    <h2 className="uppercase">{lecturermodule.module.code}</h2>
                    <div className="rounded-full border-2 border-gray-900 py-1 px-3">
                        {active ? lecturermodule.days.covered : "0"}/
                        <span className="text-gray-500 mr-1">
                            {lecturermodule.days.total}
                        </span>{" "}
                        Days
                    </div>
                </div>
                <div className="bg-primary rounded-full text-white h-8 w-8 inline-flex items-center justify-center cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6">
                        <path
                            fillRule="evenodd"
                            d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
            <div className="px-4 py-3 space-y-3">
                <h1 className="capitalize font-gray-800 text-lg font-bold">
                    {lecturermodule.module.title}
                </h1>
                <div
                    className={`grid grid-cols-2 relative  rounded-md ${
                        active ? "bg-secondary-accent" : "bg-white"
                    }`}>
                    <div className="py-2 px-6 border-r border-[#00000029] space-y-2 ">
                        <h3 className="text-xs font-bold text-black-text">
                            Lecturer Attendance
                        </h3>
                        <div className="font-bold text-black-text">
                            {active
                                ? lecturermodule.attendance.total.present
                                : "--"}{" "}
                            /{" "}
                            {active
                                ? lecturermodule.attendance.total.count
                                : "--"}
                        </div>
                    </div>
                    <div className="py-2 px-6 space-y-2">
                        <h3 className="text-xs font-bold text-black-text">
                            Students Attendance (%)
                        </h3>
                        <div className="font-bold text-black-text">97/100</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleCardLecturer;