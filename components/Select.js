const Select = ({ disabled = false, className, childern, ...props }) => (
    <select
        disabled={disabled}
        className={`${className} placeholder:text-gray-text text-gray-700 border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
        {...props}>
        {childern}
    </select>
);

export default Select;
