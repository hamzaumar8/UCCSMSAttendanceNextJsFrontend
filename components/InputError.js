const InputError = ({ messages = [], className = "" }) => (
    <div>
        {messages.length > 0 && (
            <div>
                {messages.map((message, index) => (
                    <p
                        className={`${className} text-sm text-red-600`}
                        key={index}>
                        {message}
                    </p>
                ))}
            </div>
        )}
    </div>
);

export default InputError;
