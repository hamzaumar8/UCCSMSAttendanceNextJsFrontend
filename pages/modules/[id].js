import Link from "next/link";
import { useRecoilState } from "recoil";
import Button from "../../components/Button";
import Card from "../../components/Card";
import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import AttendanceChart from "../../components/Modules/AttendanceChart";
import InCharge from "../../components/Modules/InCharge";
import LecturerAttendance from "../../components/Modules/LecturerAttendance";
import LecturerAttendanceTotal from "../../components/Modules/LecturerAttendanceTotal";
import StudentAttendanceTotal from "../../components/Modules/StudentAttendanceTotal";
import StudentList from "../../components/Modules/StudentList";
import {
    modalEditState,
    modalState,
    modalTypeState,
} from "../../src/atoms/modalAtom";
import { attendanceLecStuState } from "../../src/atoms/moduleAtom";
import { useModule } from "../../src/hooks/module";
import axios from "../../src/lib/axios";

const Module = ({ module }) => {
    const { endModule, loading } = useModule();

    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);
    const [modalEdit, setModalEdit] = useRecoilState(modalEditState);
    const [attendanceLecStu, setAttendanceLecStu] = useRecoilState(
        attendanceLecStuState,
    );

    const lectureWeekly = Object.values(module.attendance.weekly.lecturer);
    const studentsWeekly = Object.values(module.attendance.weekly.students);

    const handleEndModule = e => {
        e.preventDefault();
        endModule({
            id: module.id,
        });
    };

    return (
        <AppLayout
            header={module.module.code}
            breadcrumbs={
                <div className="space-x-1 text-primary font-bold text-sm capitalize">
                    <Link href={"/dashboard"}>Dasbord /</Link>
                    <Link href={"/modules"}>Modules /</Link>
                    <span className="text-gray-text">{module.module.code}</span>
                </div>
            }>
            <HeadTitle title="Lecturers" />
            {/* Main content */}
            <div className="relative space-y-8">
                <div className="bg-white overflow-hidden sm:rounded-md transition duration-500 ease-in-out shadow-sm">
                    {/* Card Header */}
                    <div className="flex items-center justify-between py-5 px-8 border-b">
                        <div className="flex space-x-5 items-center">
                            <span className="text-sm font-bold py-1 px-5  rounded-full bg-primary-accent text-primary">
                                {module.module.code}
                            </span>
                            <h5 className="text-lg text-gray-text font-bold">
                                {module.module.title}
                            </h5>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-gray-200 h-2 w-40 rounded-full relative overflow-hidden">
                                <div
                                    className="bg-secondary block  h-full rounded-full"
                                    style={{
                                        width:
                                            module.days.covered_percentage +
                                            "%",
                                    }}></div>
                            </div>
                            <div className="text-xs text-gray-text">
                                <span>{module.days.covered_percentage}%</span>
                            </div>
                        </div>
                        <div className="flex space-x-6 items-center">
                            {module.status !== "upcoming" && (
                                <Button
                                    onClick={handleEndModule}
                                    danger
                                    loader={loading}
                                    className="!capitalize !rounded-full !px-6">
                                    End Module
                                </Button>
                            )}
                            {module.status === "upcoming" && (
                                <Button
                                    className="!capitalize !rounded-full !px-6"
                                    onClick={() => {
                                        setModalOpen(true);
                                        setModalType("editmountModule");
                                        setModalEdit(module);
                                    }}>
                                    Edit Module
                                </Button>
                            )}
                        </div>
                    </div>
                    {/* Card Body */}
                    <div className="py-5 px-8  pb-6 bg-white space-y-3">
                        <div className="grid grid-cols-5 gap-20">
                            {/* Attendance Overview */}
                            <AttendanceChart
                                lectureWeekly={lectureWeekly}
                                studentsWeekly={studentsWeekly}
                            />
                            {/* In charg */}
                            <div className="col-span-5 md:col-span-2">
                                <div className="grid grid-cols-1 gap-10">
                                    <InCharge module={module} />
                                    {attendanceLecStu ? (
                                        <LecturerAttendanceTotal
                                            attendance={module.attendance}
                                        />
                                    ) : (
                                        <StudentAttendanceTotal
                                            attendance={module.attendance}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="space-y-5">
                    {attendanceLecStu ? (
                        <LecturerAttendance module={module} />
                    ) : (
                        <StudentList module={module} />
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default Module;

export async function getStaticPaths() {
    const response = await axios.get("/api/v1/modules");
    return {
        paths: response.data.data.map(module => ({
            params: { id: module.id.toString() },
        })),
        fallback: false, // can also be true or 'blocking'
    };
}

export async function getStaticProps({ params }) {
    const response = await axios.get(`/api/v1/modules/${params.id}`);
    return {
        props: {
            module: response.data.data,
        },
    };
}
