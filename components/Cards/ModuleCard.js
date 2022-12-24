import {
    EllipsisHorizontalIcon
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

const ModuleCard = ({ lecturermodule, active = "" }) => {
    const [menu, setMenu] = useState(false);
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
                <button
                    className="bg-primary rounded-full text-white h-8 w-8 inline-flex items-center justify-center cursor-pointer">
                    <EllipsisHorizontalIcon />
                </button>
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
            <div className="border-t border-[#00000029] grid grid-cols-2 px-4">
                <div className="border-r border-[#00000029] p-2 flex items-center space-x-2 ">
                    <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 ${
                            active
                                ? "bg-secondary-accent border-secondary-accent"
                                : "bg-white border-primary"
                        } border-2  rounded-full overflow-hidden`}>
                        <Image
                            src={lecturermodule.lecturer.picture_url}
                            width={100}
                            height={100}
                            alt={lecturermodule.lecturer.last_name}
                            className="h-full w-full"
                        />
                    </div>
                    <h2 className="text-xs font-bold text-black-text">
                        {lecturermodule.lecturer.title}{" "}
                        {lecturermodule.lecturer.first_name}{" "}
                        {lecturermodule.lecturer.last_name}
                    </h2>
                </div>
                <div className="p-2 flex items-center space-x-2 ">
                    <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 ${
                            active ? "bg-secondary-accent" : "bg-white"
                        } rounded-full overflow-hidden`}>
                        <Image
                            src={lecturermodule.module.cordinator.picture_url}
                            width={100}
                            height={100}
                            alt={lecturermodule.module.cordinator.last_name}
                            className="h-full w-full"
                        />
                    </div>
                    <h2 className="text-xs font-bold text-black-text">
                        {lecturermodule.module.cordinator.title}{" "}
                        {lecturermodule.module.cordinator.first_name}{" "}
                        {lecturermodule.module.cordinator.last_name}
                    </h2>
                </div>
            </div>

           
            <div className="absolute w-full h-full top-0 left-0 bg-[#000000BF] z-10 transition ease-in-out duration-700">
                    <div className="flex items-baselin flex-col">
                        <div className="w-full text-center text-sm font-bold text-white p-3 bg-primary border-b border-gray-text">
                            End Module
                        </div>
                        <div className="w-full text-center text-sm font-bold text-white p-3 bg-primary border-gray-text">
                            End Module
                        </div>
                    </div>
                </div>
               
        </div>
    );
};

export default ModuleCard;
