import {
    ArrowLeftOnRectangleIcon,
    CalendarDaysIcon,
    ChartBarIcon,
    CloudArrowDownIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../../src/hooks/auth";
import ApplicationLogo from "../../ApplicationLogo";
import NavLink from "../../NavLink";

const StudentSideNav = ({ user }) => {
    const router = useRouter();
    const { logout } = useAuth();
    console.log(user.role);
    return (
        <aside className="bg-primary max-w-[18rem] fixed block inset-y-0 -translate-x-full w-full flex-wrap items-center justify-between overflow-y-auto p-0 anatialised z-[9] transition-transform duration-200 xl:left-0 xl:translate-x-0">
            {/* Logo */}
            <div className="px-8 py-10 border-b border-b-[#94b4c0]">
                <Link href="/dashboard">
                    <div className="flex flex-shrink-0 items-center space-x-2">
                        <ApplicationLogo className="block max-h-14 w-auto " />
                        <div className="transition-all duration-200 ease-nav-brand text-white uppercase">
                            <h1 className="text-lg font-bold">UCC SMS</h1>
                            <span className="text-sm">Attendance Systems</span>
                        </div>
                    </div>
                </Link>
            </div>
            {/* Navigation Links */}
            <div className="items-center block w-auto max-h-screen overflow-auto grow basis-full">
                <div className="py-14 px-8 space-y-6 relative">
                    <NavLink
                        href="/student"
                        active={router.pathname === "/student"}>
                        <ChartBarIcon className="w-6 h-6" />
                        <span>Dashboard</span>
                    </NavLink>
                    {user.role === "REP" && (
                        <NavLink
                            href="/student/attendances"
                            active={router.pathname === "/student/attendances"}>
                            <CalendarDaysIcon className="w-6 h-6" />
                            <span>Attendance</span>
                        </NavLink>
                    )}
                    <NavLink
                        href="/student/modules"
                        active={router.pathname === "/student/modules"}>
                        <PencilSquareIcon className="w-6 h-6" />
                        <span>Registered Modules</span>
                    </NavLink>
                    <NavLink
                        href="/student/results"
                        active={router.pathname === "/student/results"}>
                        <CloudArrowDownIcon className="w-6 h-6" />
                        <span>Statment of Results</span>
                    </NavLink>
                </div>
            </div>

            <div className="items-center block w-auto max-h-screen overflow-auto grow basis-full">
                <div className="py-14 px-8 space-y-6 relative">
                    <button
                        className="inline-flex items-center justify-center space-x-2 w-full bg-secondary p-2 py-3 font-bold uppercase rounded-sm text-sm"
                        onClick={logout}>
                        <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};
export default StudentSideNav;
