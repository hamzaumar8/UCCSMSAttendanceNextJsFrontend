const Errors = ({ errors = [], ...props }) => {
    return (
        <>
            {errors.length > 0 && (
                <div {...props}>
                    <div className="text-red-700 font-bold">Error!</div>
                    <ul className="mt-2 text-red-700 text-sm">
                        {errors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Errors;
