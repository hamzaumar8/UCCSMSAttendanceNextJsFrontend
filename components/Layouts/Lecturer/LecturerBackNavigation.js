import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const LecturerBackNavigation = ({ backNav }) => {
    return (
        <nav className="bg-primary relative before:absolute before:w-full before:h-4 before:bg-primary-accent before:bottom-0 before:rounded-t-3xl">
            {/* Primary Navigation Menu */}
            <div className="px-4 pb-10 py-8 flex justify-between ">
                {/* Page Heading */}
                <div className="flex">
                    <div className="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out">
                        <Link
                            href={backNav}
                            className="font-bold text-lg capitalize text-white leading-tight flex items-center space-x-2">
                            <ChevronLeftIcon className="w-5 h-5" />
                            <span>Back</span>
                        </Link>
                    </div>
                </div>

                {/* Settings Dropdown */}
                <div className="flex items-center ml-6"></div>
            </div>
        </nav>
    );
};

export default LecturerBackNavigation;
