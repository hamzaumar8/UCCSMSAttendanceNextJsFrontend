import { useState } from "react";
import {
    BookOpenIcon,
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
    modalEditState,
    modalState,
    modalTypeState,
} from "../../src/atoms/modalAtom";
import { useModule } from "../../src/hooks/module";

const ModuleBankCard = ({ module, active = "" }) => {
    const { deleteModule, loading } = useModule();
    const [menuToggle, setMenuToggle] = useState(false);

    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);
    const [modalEdit, setModalEdit] = useRecoilState(modalEditState);

    const handleDelete = e => {
        e.preventDefault();
        deleteModule({
            id: module.id,
        });
    };
    return (
        <div className="bg-secondary-accent rounded-lg block transition ease-in-out duration-300">
            <div className="border-b border-[#00000029] flex items-center justify-between p-4 pb-2">
                <h2 className="uppercase font-bold text-sm">{module.code}</h2>
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
                            setModalEdit(module);
                        }}>
                        <PencilSquareIcon className="h-5 w-5 mr-1 text-primary" />
                        Edit Module
                    </DropdownButton>
                    {module.modules === 0 && (
                        <DropdownButton onClick={handleDelete} loader={loading}>
                            <TrashIcon className="h-5 w-5 mr-1 text-red-500" />
                            Delete Module
                        </DropdownButton>
                    )}
                </Dropdown>
            </div>
            <div className="px-4 py-3 space-y-3">
                <h1 className="capitalize font-gray-800 text-lg font-bold">
                    <BookOpenIcon className="h-5 w-5 inline-block mr-1" />
                    {module.title}
                </h1>
            </div>
        </div>
    );
};

export default ModuleBankCard;
