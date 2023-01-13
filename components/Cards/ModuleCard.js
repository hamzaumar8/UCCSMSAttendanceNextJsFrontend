import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/solid";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import Dropdown from "../Dropdown";
import DropdownLink, { DropdownButton } from "../DropdownLink";
import { useRecoilState } from "recoil";
import {
    modalEditState,
    modalState,
    modalTypeState,
} from "../../src/atoms/modalAtom";
import { useModule } from "../../src/hooks/module";

const ModuleCard = ({ module }) => {
    const { deleteMountModule, loading } = useModule();
    const active = module.status === "active";
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);
    const [modalEdit, setModalEdit] = useRecoilState(modalEditState);

    const handleDelete = e => {
        e.preventDefault();
        deleteMountModule({
            id: module.id,
        });
    };
    return (
        <div
            className={`${
                active ? "bg-secondary" : "bg-primary-accent"
            } rounded-lg block transition ease-in-out duration-300`}>
            <div className="border-b border-[#00000029] flex items-center justify-between p-4">
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

                <Dropdown
                    width="w-40"
                    align="left"
                    trigger={
                        <button className="bg-primary rounded-full text-white h-8 w-8 inline-flex items-center justify-center cursor-pointer">
                            <EllipsisHorizontalIcon />
                        </button>
                    }>
                    <DropdownLink href={`/modules/${module.id}`}>
                        <PencilSquareIcon className="h-5 w-5 mr-1 text-secondary" />
                        Details
                    </DropdownLink>

                    {module.status === "upcoming" && (
                        <>
                            <DropdownButton
                                onClick={() => {
                                    setModalOpen(true);
                                    setModalType("editmountModule");
                                    setModalEdit(module);
                                }}>
                                <EyeIcon className="h-5 w-5 mr-1 text-primary" />
                                Edit Module
                            </DropdownButton>
                            <DropdownButton
                                loader={loading}
                                onClick={handleDelete}>
                                <TrashIcon className="h-5 w-5 mr-1 text-red-500" />
                                Delete Module
                            </DropdownButton>
                        </>
                    )}
                </Dropdown>
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
            <div className="border-t border-[#00000029] grid grid-cols-2 px-4">
                <div className="border-r border-[#00000029] p-2 flex items-center space-x-2 ">
                    <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 ${
                            active
                                ? "bg-secondary-accent border-secondary-accent"
                                : "bg-white border-primary"
                        } border-2  rounded-full overflow-hidden`}>
                        <Image
                            src={module?.lecturers[0].picture}
                            width={100}
                            height={100}
                            alt={module?.lecturers[0].surname}
                            className="h-full w-full"
                        />
                    </div>
                    <div>
                        {module.lecturers.map((lecturer, index) => (
                            <h2
                                key={index}
                                className="text-xs font-bold text-black-text">
                                {lecturer.title} {lecturer.first_name}{" "}
                                {lecturer.surname}
                            </h2>
                        ))}
                    </div>
                </div>
                <div className="p-2 flex items-center space-x-2 ">
                    <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 ${
                            active ? "bg-secondary-accent" : "bg-white"
                        } rounded-full overflow-hidden`}>
                        <Image
                            src={module.cordinator.picture}
                            width={100}
                            height={100}
                            alt={module.cordinator.surname}
                            className="h-full w-full"
                        />
                    </div>
                    <h2 className="text-xs font-bold text-black-text">
                        {module.cordinator.title} {module.cordinator.first_name}{" "}
                        {module.cordinator.surname}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default ModuleCard;
