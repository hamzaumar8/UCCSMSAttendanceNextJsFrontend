const Label = ({ className, children, ...props }) => (
    <label
        className={`${className} block font-bold text-sm text-black-text`}
        {...props}>
        {children}
    </label>
);

export default Label;
