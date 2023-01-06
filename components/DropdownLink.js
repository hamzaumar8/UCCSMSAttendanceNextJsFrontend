import Link from "next/link";
import { Menu } from "@headlessui/react";
import Loader from "./Loader";

const DropdownLink = ({ children, ...props }) => (
    <Menu.Item>
        {({ active }) => (
            <Link
                {...props}
                className={`w-full text-left flex px-4 py-2 text-sm leading-5 text-gray-700 ${
                    active ? "bg-gray-100" : ""
                } focus:outline-none transition duration-150 ease-in-out`}>
                {children}
            </Link>
        )}
    </Menu.Item>
);

export const DropdownButton = ({ children, loader = false, ...props }) => (
    <Menu.Item>
        {({ active }) => (
            <button
                disabled={loader}
                className={`w-full text-left flex px-4 py-2 text-sm leading-5 text-gray-700 ${
                    active ? "bg-gray-100" : ""
                } focus:outline-none transition duration-150 ease-in-out`}
                {...props}>
                {children} {loader && <Loader />}
            </button>
        )}
    </Menu.Item>
);

export default DropdownLink;
