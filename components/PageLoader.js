import { ClimbingBoxLoader } from "react-spinners";

const PageLoader = ({ loading }) => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <ClimbingBoxLoader size={30} color="#59FFA0" loading={loading} />
        </div>
    );
};

export default PageLoader;
