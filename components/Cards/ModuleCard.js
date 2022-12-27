import { useState } from "react";
import {
    EllipsisHorizontalIcon,
    PencilSquareIcon,
    TrashIcon,
    XCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Dropdown from "../Dropdown";
import { DropdownButton } from "../DropdownLink";
import { useRecoilState } from "recoil";
import {
    modalEditIdState,
    modalState,
    modalTypeState,
} from "../../src/atoms/modalAtom";

const ModuleCard = ({ lecturermodule, active = "" }) => {
    const [menuToggle, setMenuToggle] = useState(false);

    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);
    const [modalEditId, setModalEditId] = useRecoilState(modalEditIdState);
    return (
        <div
            className={`${
                active ? "bg-secondary" : "bg-primary-accent"
            } rounded-lg block transition ease-in-out duration-300`}>
            <div className="border-b border-[#00000029] flex items-center justify-between p-4">
                <div className="flex items-center space-x-3 text-xs font-extrabold text-black-text">
                    <h2 className="uppercase">{lecturermodule.module.code}</h2>
                    <div className="rounded-full border-2 border-gray-900 py-1 px-3">
                        {lecturermodule.days.covered}/
                        <span className="text-gray-500 mr-1">
                            {lecturermodule.days.total}
                        </span>{" "}
                        Days
                    </div>
                </div>

                <Dropdown
                    width="w-40"
                    align="left"
                    trigger={
                        <button className="bg-primary rounded-full text-white h-8 w-8 inline-flex items-center justify-center cursor-pointer">
                            <EllipsisHorizontalIcon />
                        </button>
                    }>
                    <DropdownButton
                        onClick={() => {
                            setModalOpen(true);
                            setModalType("editModule");
                            setModalEditId(lecturermodule);
                        }}>
                        <PencilSquareIcon className="h-5 w-5 mr-1 text-primary" />
                        Edit Module
                    </DropdownButton>
                    <DropdownButton onClick={""}>
                        <TrashIcon className="h-5 w-5 mr-1 text-red-500" />{" "}
                        Delete Module
                    </DropdownButton>
                </Dropdown>
            </div>
            <div className="px-4 py-3 space-y-3">
                <h1 className="capitalize font-gray-800 text-lg font-bold">
                    {lecturermodule.module.title}
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
                            {active
                                ? lecturermodule.attendance.total.present
                                : "--"}
                            /
                            {active
                                ? lecturermodule.attendance.total.count
                                : "--"}
                        </div>
                    </div>
                    <div className="py-2 px-6 space-y-2">
                        <h3 className="text-xs font-bold text-black-text">
                            Students Attendance (%)
                        </h3>
                        <div className="font-bold text-black-text">
                            {active
                                ? lecturermodule.attendance.total
                                      .student_attendance.present_percentage
                                : "--"}
                            /{active ? "100" : "--"}
                        </div>
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

            {/* {menuToggle && ( 
                // <div className="absolute w-full h-full top-0 left-0 bg-[#000000BF] z-10 flex items-end transition ease-in-out duration-700">
                //     <button
                //         onClick={() => setMenuToggle(false)}
                //         className="absolute top-3 right-3 h-10 w-10 text-white cursor z-40 cursor-pointer">
                //         <XCircleIcon />
                //     </button>
                //     <div className="flex items-baselin flex-col z-20 w-full">
                //         <div className="inline-flex items-center justify-center space-x-2 text-center text-sm font-bold text-white p-3 bg-primary border-b border-gray-text">
                //             <PencilSquareIcon className="h-5 w-5" />
                //             <span>Edit Module </span>
                //         </div>
                //         <div className="inline-flex items-center justify-center space-x-2 text-center text-sm font-bold text-white p-3 bg-primary border-gray-text">
                //             <span>End Module </span>
                //         </div>
                //     </div>
                // </div>
            )} */}
        </div>
    );
};

export default ModuleCard;
