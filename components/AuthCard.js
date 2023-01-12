import Image from "next/image";

const AuthCard = ({ logo, children }) => (
    <div className="min-h-screen flex bg-white">
        <div className="hidden w-full lg:block lg:w-1/2 sm:min-h-screen oveflow-hidden relative object-contain">
            <Image src="/bgauth.jpg" fill alt="Login Image" />
        </div>
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 py-4 bg-white">
            <div className="flex space-x-2 items-center">
                {logo}{" "}
                <div className="font-bold uppercase">
                    <h1 className="text-4xl">UCC SMS</h1>
                    <p className="text-sm">Attendance System</p>
                </div>
            </div>
            <div className="w-full px-7  sm:px-8 py-4  overflow-hidden space-y-8">
                <div className="">{children}</div>
            </div>
        </div>
    </div>
);

export default AuthCard;
