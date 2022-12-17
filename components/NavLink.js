import Link from "next/link";

const NavLink = ({ active = false, children, ...props }) => (
    <Link
        {...props}
        className={`inline-flex items-center px-1 py-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out w-full uppercase space-x-5 ${
            active ? "text-secondary" : "text-white"
        }`}>
        {children}
    </Link>
);

export default NavLink;
