const AuthSessionStatus = ({ status, className, ...props }) => (
    <div>
        {status && (
            <div
                className={`${className} font-medium text-sm text-green-600`}
                {...props}>
                {status}
            </div>
        )}
    </div>
);

export default AuthSessionStatus;
