import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../src/lib/axios";
import Card from "../../components/Card";
import HeadTitle from "../../components/HeadTitle";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import SetSemester from "../../components/Settings/SetSemster";
import EditSetSemester from "../../components/Settings/EditSetSemester";
import { useSemester } from "../../src/hooks/semester";
import Profile from "../../components/Settings/Profile";

const Settings = () => {
    const [attendanceLecStu, setAttendanceLecStu] = useState(true);
    const { semester } = useSemester();
    const [loading, setLoading] = useState(false);
    return (
        <AppLayout header="Settings">
            <HeadTitle title="Settings" />

            <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-8">
                    <div className="col-span-1 xl:col-span-2 ">
                        {semester ? (
                            <EditSetSemester currentSemester={semester} />
                        ) : (
                            <SetSemester />
                        )}
                    </div>
                    {/* Active Modules Card */}

                    <div className="col-span-1 xl:col-span-3">
                        {semester && (
                            <Card
                                header={
                                    <h1 className="text-black-text font-extrabold capitalize">
                                        Student Promotion
                                    </h1>
                                }>
                                <div className="space-y-3"></div>
                            </Card>
                        )}
                    </div>
                </div>
                {/* Profile */}
                <Profile />
            </div>
        </AppLayout>
    );
};

export default Settings;

export async function getStaticProps() {
    // const studentsResponse = await axios.get("api/v1/semester");
    // const semester = studentsResponse.data;
    return {
        props: {},
    };
}
