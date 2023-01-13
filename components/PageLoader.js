import { ClipLoader, ClockLoader } from "react-spinners";

const PageLoader = ({ loading }) => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <ClockLoader size={80} color="#59FFA0" loading={loading} />
        </div>
    );
};

export const SectionLoader = () => {
    return (
        <div className="flex min-h-[7rem] w-full items-center justify-center">
            <ClipLoader size={40} color="#59FFA0" loading={true} />
        </div>
    );
};

export default PageLoader;
