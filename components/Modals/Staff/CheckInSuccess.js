import { CheckIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../../../src/atoms/modalAtom";

const CheckInSuccess = () => {
    const [modalOpen, setModalOpen] = useRecoilState(modalState);

    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    };
    return (
        <div className="space-y-8 text-center py-8 px-4 flex flex-col items-center justify-center">
            <div className="pb-8">
                <h1 className="text-black-text text-xl font-bold">
                    Attendance Submitted!
                </h1>
                <p className="text-gray-text">
                    Congratulations! Your attendance has been submitted
                    successfully
                </p>
            </div>
            <div className="border-[10px] text-secondary border-secondary p-5 rounded-full w-40 h-40">
                <CheckIcon />
            </div>
            <button
                onClick={() => {
                    setModalOpen(false);
                    refreshData();
                }}
                className="text-primary font-bold underline pt-14">
                <span>Back to Homepage</span>
            </button>
        </div>
    );
};

export default CheckInSuccess;
