import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

const CSVButton = ({ children, ...props }) => {
    <button
        className="inline-flex items-center px-6 py-2 bg-white text-primary rounded-full font-bold text-xs capitalize border-2 border-primary tracking-widest transition ease-in-out duration-150"
        {...props}>
        {children}
    </button>;
};

export default CSVButton;
