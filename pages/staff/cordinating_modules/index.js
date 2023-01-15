import HeadTitle from "../../../components/HeadTitle";
import LecturerLayout from "../../../components/Layouts/LecturerLayout";
import axios from "../../../src/lib/axios";
import useSWR from "swr";
import SemesterTag from "../../../components/SemesterTag";
import { SectionLoader } from "../../../components/PageLoader";
import StaffCordModules from "../../../components/Staff/CordinatingModules/StaffCordModules";

const StaffCordinatingModules = () => {
    const {
        data: cordinatingModules,
        error,
        mutate,
    } = useSWR("api/v1/cordinating/modules/lecturer", () =>
        axios
            .get("api/v1/cordinating/modules/lecturer")
            .then(response => response.data.data),
    );

    console.log(cordinatingModules);
    return (
        <LecturerLayout header="Cordinating Modules">
            <HeadTitle title="Lecturer Modules" />

            {/* Main Sction */}
            <div className="space-y-8 sm:mt-10">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg transition duration-500 ease-in-out">
                    {/* Header */}
                    <div className="p-5 block sm:flex  items-center justify-between relative border-b ">
                        <div className="flex items-center justify-center space-x-2">
                            <h1 className="text-xl font-extrabold ">
                                Cordinating Modules
                            </h1>
                            <span className="p-1 h-7 w-7 inline-flex items-center justify-center rounded-full text-xs text-white bg-primary">
                                {cordinatingModules?.length}
                            </span>
                        </div>
                        <SemesterTag />
                        <div></div>
                    </div>
                    <div className="pt-5 bg-white space-y-3 transition duration-500 ease-in-out">
                        {cordinatingModules === undefined ? (
                            <SectionLoader />
                        ) : (
                            <StaffCordModules
                                cord_modules={cordinatingModules}
                            />
                        )}
                    </div>
                </div>
            </div>
        </LecturerLayout>
    );
};

export default StaffCordinatingModules;
