import HeadTitle from "../../components/HeadTitle";
import axios from "../../src/lib/axios";
import { CalendarDaysIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../../src/atoms/modalAtom";
import { useAuth } from "../../src/hooks/auth";
import useSWR from "swr";
import { useEffect, useState } from "react";
import {
    eachDayOfInterval,
    addDays,
    addWeeks,
    format,
    getTime,
    startOfWeek,
    endOfWeek,
} from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import AttendanceCard from "../../components/Staff/Attendance/AttendanceCard";
import ElementNotFound from "../../components/ElementNorFound";
import StudentLayout from "../../components/Layouts/StudentLayout";

const StudentDashboard = () => {
    const { user } = useAuth({ middleware: "auth" });

    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);

    const now = new Date();
    const calendarWeekInterval = eachDayOfInterval({
        start: startOfWeek(now),
        end: endOfWeek(now),
    });
    const [currentDate, setCurrentDate] = useState(now);

    const {
        data: attendances,
        error,
        mutate,
    } = useSWR(`/api/v1/attendance/lecturer`, () =>
        axios
            .get(`/api/v1/attendance/lecturer`)
            .then(response => response.data.data),
    );

    const currentAttendances = attendances?.filter(
        item => item.date === format(currentDate, "yyyy-MM-dd"),
    );

    return (
        <StudentLayout header="Here's an overview of all attendaces">
            <HeadTitle title="Student Dashboard" />
        </StudentLayout>
    );
};

export default StudentDashboard;
