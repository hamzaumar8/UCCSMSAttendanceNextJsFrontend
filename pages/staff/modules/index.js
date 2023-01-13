import HeadTitle from "../../../components/HeadTitle";
import LecturerLayout from "../../../components/Layouts/LecturerLayout";
import axios from "../../../src/lib/axios";
import useSWR from "swr";
import { AnimatePresence, motion } from "framer-motion";
import ElementNotFound from "../../../components/ElementNorFound";
import ModuleCardLecturer from "../../../components/Cards/ModuleCardLecturer";
import { SectionLoader } from "../../../components/PageLoader";

const StaffModules = () => {
    const {
        data: lecturerModules,
        error,
        mutate,
    } = useSWR(`/api/v1/lecturer/modules`, () =>
        axios
            .get(`/api/v1/lecturer/modules`)
            .then(response => response.data.data),
    );

    return (
        <LecturerLayout header="My Modules">
            <HeadTitle title="Lecturer Modules" />

            {/* Main Content  */}
            <div className="relative space-y-8 sm:space-y-0">
                <div className="relative rounded-t-xl sm:rounded-b-xl bg-white  pb-20 sm:mt-10 sm:pb-5  sm:min-h-0">
                    <div className="flex justify-between items-center py-6 px-4 pt-1 sm:pt-4 sm:border-b">
                        <h2 className="text-black-text font-extrabold text-2xl">
                            My Modules
                        </h2>
                    </div>
                    <div className="relative px-4 pb-6 sm:pt-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={"currentDate"}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.2 }}>
                                {lecturerModules === undefined ? (
                                    <SectionLoader />
                                ) : (
                                    <>
                                        {lecturerModules?.length > 0 ? (
                                            <div className="space-y-4 sm:space-y-0 sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                                {lecturerModules?.map(
                                                    (module, index) => {
                                                        return (
                                                            <ModuleCardLecturer
                                                                key={index}
                                                                module={module}
                                                            />
                                                        );
                                                    },
                                                )}
                                            </div>
                                        ) : (
                                            <ElementNotFound>
                                                <h2 className="text-xl sm:text-2xl text-primary font-bold">
                                                    No Active Module Availble
                                                </h2>
                                                <p className="text-gray-text font-[500]">
                                                    Sorry! You don't have any
                                                    module checked in for the
                                                    day yet.
                                                </p>
                                            </ElementNotFound>
                                        )}
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </LecturerLayout>
    );
};

export default StaffModules;

export async function getServerSideProps() {
    // const studentsResponse = await axios.get("api/v1/students");
    // const students = studentsResponse.data.data;
    return {
        props: {},
    };
}
