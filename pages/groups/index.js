import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../src/lib/axios";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import {
    modalEditState,
    modalState,
    modalTypeState,
} from "../../src/atoms/modalAtom";
import { AnimatePresence, motion } from "framer-motion";
import { EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useGroup } from "../../src/hooks/group";

const Groups = ({ groups }) => {
    const { deleteGroup, loading } = useGroup();
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);
    const [modalEdit, setModalEdit] = useRecoilState(modalEditState);

    return (
        <AppLayout header="Groups">
            {/* Title */}
            <HeadTitle title="Groups" />

            {/* Main Sction */}
            <div className="space-y-5">
                <div className="flex items-center justify-between relative">
                    <div className="flex space-x-4 items-center">
                        <h1 className="text-black font-extrabold text-xl">
                            Groups
                        </h1>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => {
                            setModalOpen(true);
                            setModalType("addGroup");
                        }}
                        className="inline-flex items-center px-6 py-2 bg-primary text-white border border-transparent rounded-full font-semibold text-xs capitalize tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity:25 transition ease-in-out duration-150">
                        <PlusIcon className="w-4 h-4 mr-1" />
                        Add Groupings
                    </motion.button>
                </div>
                <div className="my-3 overflow-x-auto bg-white shadow-lg rounded-lg overflow-y-auto">
                    <table className="table rounded-lg min-w-full border border-slate-200 transition duration-500 ease-in-out">
                        <thead className="shadow-sm bg-primary-accent border border-slate-200">
                            <tr>
                                <th className="capitalize font-bold px-2  py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                    NO.
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                    Name
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                                    level
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-center text-sm text-primary tracking-wider whitespace-nowrap">
                                    NO. <span className="lowercase">of</span>{" "}
                                    Groups
                                </th>
                                <th className="capitalize font-bold px-2 pr-4 py-3 text-center text-sm text-primary tracking-wider whitespace-nowrap">
                                    NO. <span className="lowercase">of</span>{" "}
                                    Students
                                </th>
                                <th className="capitalize font-bold px-2 pr-6 py-3 text-sm text-primary tracking-wider whitespace-nowrap text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-text text-sm !border-[#E6EAEF]">
                            {groups.map((group, index) => (
                                <tr className="" key={index}>
                                    <td className="capitalize text-left p-3 whitespace-nowrap border-b">
                                        <span>
                                            <div>{index + 1}.</div>
                                        </span>
                                    </td>
                                    <td className="uppercase p-3 whitespace-nowrap border-b">
                                        <span>
                                            <div>{group.name}</div>
                                        </span>
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b">
                                        <span>
                                            <div>{group.level.name}</div>
                                        </span>
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                                        <span>
                                            <div>{group.groups}</div>
                                        </span>
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b text-center">
                                        <span>
                                            <div>
                                                {group.level.students_count}
                                            </div>
                                        </span>
                                    </td>
                                    <td className="capitalize p-3 whitespace-nowrap border-b text-right pr-6">
                                        <span className="space-x-2">
                                            <Link
                                                href={`/groups/${group.id}`}
                                                className="inline-flex cursor-pointer text-gray-text hover:!text-secondary transition duration-500"
                                                title="Details">
                                                <EyeIcon className="h-6 w-6 " />
                                            </Link>
                                            <button
                                                onClick={e => {
                                                    e.preventDefault();
                                                    deleteGroup({
                                                        id: group.id,
                                                    });
                                                }}
                                                href={`/groups/${group.id}`}
                                                className="inline-flex cursor-pointer text-gray-text hover:!text-danger transition duration-500"
                                                title="Delete">
                                                <TrashIcon className="h-6 w-6 " />
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
};

export default Groups;

export async function getServerSideProps() {
    const response = await axios.get("api/v1/groups");
    const groups = response.data.data;
    return {
        props: {
            groups,
        },
    };
}
