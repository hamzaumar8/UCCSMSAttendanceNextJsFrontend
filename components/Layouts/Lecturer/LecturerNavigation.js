import Dropdown from "../../Dropdown";
import ResponsiveNavLink, {
    ResponsiveNavButton,
} from "../../ResponsiveNavLink";
import { DropdownButton } from "../../DropdownLink";
import { useAuth } from "../../../src/hooks/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

const LecturerNavigation = ({ user, header, breadcrumbs }) => {
    const router = useRouter();

    const { logout } = useAuth();

    const [open, setOpen] = useState(false);

    const getGreetingTime = () => {
        const currentTime = new Date();
        const splitAfternoon = 12; // 24hr time to split the afternoon
        const splitEvening = 17; // 24hr time to split the evening
        const currentHour = currentTime.getHours();
        if (currentHour >= splitAfternoon && currentHour < splitEvening) {
            // Between 12 PM and 5PM
            return "Good Afternoon,";
        } else if (currentHour >= splitEvening) {
            // Between 5PM and Midnight
            return "Good Evening,";
        }
        // Between dawn and noon
        return "Good Morning,";
        // return currentHour;
    };
    return (
        <nav className="bg-white">
            {/* Primary Navigation Menu */}
            <div className="px-4 py-8 flex justify-between ">
                {/* Page Heading */}
                <div className="flex">
                    <div className="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out">
                        <div>
                            <h2 className="font-bold text-2xl capitalize text-black-text leading-tight">
                                {getGreetingTime()}
                            </h2>
                            <span className="text-gray-text">
                                {header ? header : user?.name}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Settings Dropdown */}
                <div className="hidden sm:flex sm:items-center sm:ml-6">
                    <Dropdown
                        align="right"
                        width="48"
                        trigger={
                            <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out space-x-2">
                                <div className="h-10 w-10 rounded-full inline-block border-2 border-primary">
                                    <Image
                                        src="http://localhost:8000/assets/img/lecturers/default.png"
                                        width={100}
                                        height={100}
                                        alt={user?.name}
                                    />
                                </div>
                            </button>
                        }>
                        {/* Authentication */}
                        <DropdownButton onClick={logout}>Logout</DropdownButton>
                    </Dropdown>
                </div>

                {/* Hamburger  */}
                <div className="-mr-2 flex items-center sm:hidden">
                    <button
                        onClick={() => setOpen(open => !open)}
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                        <svg
                            className="h-6 w-6"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24">
                            {open ? (
                                <path
                                    className="inline-flex"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    className="inline-flex"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Responsive Navigation Menu */}
            {open && (
                <div className="block sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href="/staff"
                            active={router.pathname === "/staff"}>
                            Attendance
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href="/staff/modules"
                            active={router.pathname === "/staff/modules"}>
                            My modules
                        </ResponsiveNavLink>
                    </div>

                    {/* Responsive Settings Options */}
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-full inline-block border-2 border-primary">
                                    <Image
                                        src="http://localhost:8000/assets/img/lecturers/default.png"
                                        width={100}
                                        height={100}
                                        alt={user?.name}
                                    />
                                </div>
                            </div>

                            <div className="ml-3">
                                <div className="font-medium text-base text-black-text">
                                    {user?.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user?.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            {/* Authentication */}
                            <ResponsiveNavButton onClick={logout}>
                                Logout
                            </ResponsiveNavButton>
                        </div>
                    </div>
                </div>
            )}

            {breadcrumbs && (
                <div className="bg-primary-accent px-6 py-4 sm:px-8 lg:px-12">
                    {breadcrumbs}
                </div>
            )}
        </nav>
    );
};

export default LecturerNavigation;
