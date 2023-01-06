import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRecoilState } from "recoil";
import {
    modalEditState,
    modalState,
    modalTypeState,
} from "../../src/atoms/modalAtom";

const LecturerTable = ({ data }) => {
    const defaultImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/img/lecturers/default.png`;

    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);
    const [modalEdit, setModalEdit] = useRecoilState(modalEditState);
    return (
        <table className="table power-grid-table rounded-lg min-w-full border border-slate-200">
            <thead className="shadow-sm bg-primary-accent border border-slate-200">
                <tr>
                    <th className="capitalize font-bold px-2 pr-4 py-3 text-sm text-primary tracking-wider whitespace-nowrap">
                        Photo
                    </th>
                    <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                        Staff ID
                    </th>
                    <th className="capitalize font-bold px-2 pr-4 py-3 text-left text-sm text-primary tracking-wider whitespace-nowrap">
                        Name
                    </th>
                    <th className="capitalize font-bold px-2 pr-4 py-3 text-center text-sm text-primary tracking-wider whitespace-nowrap">
                        Modules
                    </th>
                    <th className="capitalize font-bold px-2 pr-6 py-3 text-sm text-primary tracking-wider whitespace-nowrap text-right">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody className="text-gray-text text-sm !border-[#E6EAEF]">
                {data?.length > 0 ? (
                    <div>
                        {data?.map((lecturer, index) => (
                            <tr className="" key={index}>
                                <td className="capitalize text-center p-3 whitespace-nowrap">
                                    <Image
                                        src={lecturer.picture ?? defaultImg}
                                        className="h-10 w-10 my-0 mx-auto"
                                        width={100}
                                        height={100}
                                        alt={lecturer.surname}
                                    />
                                </td>
                                <td className="capitalize p-3 whitespace-nowrap border-b">
                                    <span>
                                        <div>{lecturer.staff_id}</div>
                                    </span>
                                </td>
                                <td className="capitalize p-3 whitespace-nowrap border-b">
                                    <span>
                                        <div>
                                            {lecturer.title}{" "}
                                            {lecturer.first_name}{" "}
                                            {lecturer.other_name &&
                                                lecturer.other_name + " "}
                                            {lecturer.surname}
                                        </div>
                                    </span>
                                </td>
                                <td className="capitalize py-3  border-b text-center">
                                    <div className="space-x-2">
                                        {lecturer.modules.length > 0
                                            ? lecturer.modules
                                                  .slice(0, 3)
                                                  .map((module, index) => (
                                                      <span
                                                          key={index}
                                                          className="uppercase py-1 rounded-sm text-xs font-bold shadow-sm px-2 bg-primary-accent">
                                                          {module.module.code}
                                                      </span>
                                                  ))
                                            : "---"}
                                        {lecturer.modules.length > 3 && (
                                            <span className="underline text-primary">
                                                all
                                            </span>
                                        )}
                                    </div>
                                </td>

                                <td className="capitalize py-3 whitespace-nowrap border-b !text-right pr-6">
                                    <div className="space-x-3">
                                        <Link
                                            href={`/lecturers/${lecturer.id}`}
                                            legacyBehavior>
                                            <a
                                                className="inline-flex cursor-pointer text-gray-text hover:!text-secondary transition duration-500"
                                                title="Details">
                                                <EyeIcon className="h-6 w-6 " />
                                            </a>
                                        </Link>
                                        <button
                                            className="inline-flex cursor-pointer text-gray-text hover:!text-primary transition duration-500"
                                            title="Edit"
                                            onClick={() => {
                                                setModalOpen(true);
                                                setModalType("editLecturer");
                                                setModalEdit(lecturer);
                                            }}>
                                            <PencilSquareIcon className="h-6 w-6 " />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </div>
                ) : (
                    <tr className="">
                        <td
                            className="capitalize text-center p-3 whitespace-nowrap"
                            colSpan={5}>
                            <span>
                                <div className="text-danger font-bold text-lg">
                                    No Search Found ...
                                </div>
                            </span>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default LecturerTable;
