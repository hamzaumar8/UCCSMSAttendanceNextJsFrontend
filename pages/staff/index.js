import ModuleCardLecturer from "../../components/Cards/ModuleCardLecturer";
import HeadTitle from "../../components/HeadTitle";
import LecturerLayout from "../../components/Layouts/LecturerLayout";
import axios from "../../src/lib/axios";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import { modalState } from "../../src/atoms/modalAtom";
import { useAuth } from "../../src/hooks/auth";

const StaffDashboard = ({ modules }) => {
    const { user } = useAuth({ middleware: "auth" });
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const lecturerModules = modules.filter(
        item => item.lecturer_id == user?.id,
    );

    console.log(modules, user?.id, lecturerModules);
    return (
        <LecturerLayout header="Here's an overview of all attendaces">
            <HeadTitle title="Lecturer Dashboard" />

            <div className="flex iitems-center justify-around py-4">
                <div className="flex flex-col items-center">
                    <div className="text-black-text text-[0.6rem] font-bold uppercase">
                        Mon
                    </div>
                    <div className="text-gray-text text-sm p-1 rounded-full inline-block h-7 w-7">
                        28
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-black-text text-[0.6rem] font-bold uppercase">
                        Mon
                    </div>
                    <div className="text-gray-text text-sm p-1 rounded-full inline-block h-7 w-7">
                        28
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-black-text text-[0.6rem] font-bold uppercase">
                        Mon
                    </div>
                    <div className="text-gray-text text-sm p-1 rounded-full inline-block h-7 w-7">
                        28
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-[0.6rem] font-bold text-primary uppercase">
                        Today
                    </div>
                    <div className="text-white text-sm p-1 rounded-full inline-block h-7 w-7 bg-primary ">
                        28
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-black-text text-[0.6rem] font-bold uppercase">
                        Mon
                    </div>
                    <div className="text-gray-text text-sm p-1 rounded-full inline-block h-7 w-7">
                        28
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-black-text text-[0.6rem] font-bold uppercase">
                        Mon
                    </div>
                    <div className="text-gray-text text-sm p-1 rounded-full inline-block h-7 w-7">
                        28
                    </div>
                </div>
                <div>
                    <div className="text-black-text text-[0.6rem] font-bold uppercase">
                        Mon
                    </div>
                    <div className="text-gray-text text-sm p-1 rounded-full inline-block h-7 w-7">
                        28
                    </div>
                </div>
            </div>

            {/* Main COntent  */}
            <div className="relative rounded-t-xl sm:rounded-b-xl bg-white phone-card pb-20 sm:min-h-0">
                <div className="flex justify-between items-center py-6 px-4">
                    <h2 className="text-black-text font-extrabold text-lg">
                        Modules
                    </h2>
                    <div>Daily</div>
                </div>
                <div className="relative px-4 pb-6">
                    <div className="space-y-4 sm:space-y-0 sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {lecturerModules
                            .filter((item, index) =>
                                item.attendance.data[index].filter(item => i),
                            )
                            .map(lecturermodule => (
                                <>
                                    {lecturermodule.attendance.data.map(
                                        <div>ha,za</div>,
                                    )}
                                    {/* {lecturermodule.attendance.data.map(
                                    <ModuleCardLecturer
                                        key={lecturermodule.id}
                                        lecturermodule={lecturermodule}
                                        active
                                    />,
                                )} */}
                                </>
                            ))}
                    </div>
                    <div className="fixed bottom-20 right-4">
                        <button
                            onClick={() => {
                                setModalOpen(true);
                            }}
                            className="inline-flex items-center px-6 py-3 bg-primary text-white border border-transparent rounded-full font-semibold text-xs capitalize tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity:25 transition ease-in-out duration-150 space-x-2">
                            <CalendarDaysIcon className="h-5 w-5" />
                            <span className="text-xs ">Check In</span>
                        </button>
                    </div>
                </div>
            </div>
        </LecturerLayout>
    );
};

export default StaffDashboard;

export async function getStaticProps() {
    const response = await axios.get("api/v1/lecture/modules");
    const modules = response.data.data;
    return {
        props: {
            modules,
        },
    };
}
