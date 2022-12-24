import Dropdown from "../../Dropdown";
import ResponsiveNavLink, {
    ResponsiveNavButton,
} from "../../ResponsiveNavLink";
import { DropdownButton } from "../../DropdownLink";
import { useAuth } from "../../../src/hooks/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

const LecturerNavigation = ({ user, header }) => {
    const router = useRouter();

    const { logout } = useAuth();

    let today = new Date();
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
                <div className="flex items-center ml-6">
                    <Dropdown
                        align="right"
                        width="48"
                        trigger={
                            <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out space-x-2">
                                <div className="h-10 w-10 rounded-full inlie-block border-2 border-primary">
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
            </div>
        </nav>
    );
};

export default LecturerNavigation;
