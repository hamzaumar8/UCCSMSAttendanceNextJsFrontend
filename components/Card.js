const Card = ({ header = "", button = "", className, children }) => (
    <div
        className={`${className} bg-white overflow-hidden shadow-sm sm:rounded-lg relative block`}>
        <div className="py-4 px-5 flex items-center justify-between relative border-b ">
            {header}
            {button ? (
                button
            ) : (
                <div className="w-4 h-4 relative bg-primary-accent rounded-full"></div>
            )}
        </div>
        <div className="pt-4 px-5 pb-6 bg-white space-y-3">{children}</div>
    </div>
);

export default Card;
