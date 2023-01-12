import { useRecoilState } from "recoil";
import Button from "../../components/Button";
import Card from "../../components/Card";
import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import AttendanceChart from "../../components/Modules/AttendanceChart";
import LecturerAttendance from "../../components/Modules/LecturerAttendance";
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
        <AppLayout header={module.module.code}>
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
                                <Card
                                    className="border border-primary-accent"
                                    header={
                                        <h1 className="text-black-text font-extrabold capitalize">
                                            In Charge
                                        </h1>
                                    }>
                                    <div className="space-y-4">
                                        {module.lecturers.map(
                                            (lecturer, index) => (
                                                <div
                                                    className="flex space-x-5 items-center"
                                                    key={index}>
                                                    <div className="flex items-center justify-center bg-primary-accent text-primary rounded-full text-xs w-[100px] py-1 font-bold capitalize">
                                                        lecturer
                                                    </div>
                                                    <h3 className="text-gray-text text-xs capitalized">
                                                        {lecturer.full_name}
                                                    </h3>
                                                </div>
                                            ),
                                        )}
                                        <div className="flex space-x-5 items-center">
                                            <div className="flex items-center justify-center bg-primary-accent text-primary rounded-full text-xs w-[100px] py-1 font-bold capitalize">
                                                Cordinator
                                            </div>
                                            <h3 className="text-gray-text text-xs capitalized">
                                                {module.cordinator.full_name}
                                            </h3>
                                        </div>
                                        <div className="flex space-x-5 items-center">
                                            <div className="flex items-center justify-center bg-primary-accent text-primary rounded-full text-xs w-[100px] py-1 font-bold capitalize">
                                                Course Rep
                                            </div>
                                            <h3 className="text-gray-text text-xs capitalized">
                                                {module.course_rep.full_name}
                                            </h3>
                                        </div>
                                    </div>
                                </Card>
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
