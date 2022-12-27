import Loader from "./Loader";

const Button = ({
    children,
    type = "submit",
    className,
    loader = false,
    danger = "",
    ...props
}) => (
    <button
        type={type}
        disabled={loader}
        className={`${className} inline-flex items-center justify-center px-4 py-3  border border-transparent rounded-sm font-semibold text-xs uppercase tracking-widest ${
            danger
                ? "text-red-500 bg-red-200 hover:bg-red-300 active:bg-red-400 active:text-white focus:outline-none focus:border-red-400  ring-red-100"
                : "text-white bg-primary hover:bg-primary active:bg-primary focus:outline-none focus:border-primary ring-primary"
        }  focus:ring disabled:opacity-25 transition ease-in-out duration-150`}
        {...props}>
        {children}
        {loader && <Loader />}
    </button>
);

export default Button;
