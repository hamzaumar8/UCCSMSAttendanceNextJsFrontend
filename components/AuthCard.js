import AuthImage from "../public/bgauth.jpg";

const AuthCard = ({ logo, children }) => (
    // <div className="min-h-screen flex sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
    <div className="min-h-screen flex flex-col sm:flex-row bg-white">
        <div
            className={`w-full sm:w-1/2 h-1/2 sm:h-full bg-[url(${AuthImage})`}></div>
        <div className="flex flex-col justify-center items-center sm:w-1/2 bg-white">
            <div>{logo}</div>
            <div className="w-full px-7 sm:px-24 py-4  overflow-hidden space-y-8">
                <div className="">{children}</div>
            </div>
        </div>
    </div>
);

export default AuthCard;
