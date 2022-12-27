import { useState } from "react";
import { useRecoilState } from "recoil";
import { CheckIcon } from "@heroicons/react/24/solid";
import useSWR from "swr";
import Link from "next/link";
import { useAuth } from "../../../src/hooks/auth";
import { modalState } from "../../../src/atoms/modalAtom";
import axios from "../../../src/lib/axios";
import { useAttendance } from "../../../src/hooks/attendance";
import Errors from "../../Errors";

const CheckInModal = () => {
    const { user } = useAuth({ middleware: "auth" });
    const { addAttendance, loading } = useAttendance();
    const [modalOpen, setModalOpen] = useRecoilState(modalState);

    // const {
    //     data: currentLecturer,
    //     error,
    //     mutate,
    // } = useSWR(`api/v1/lecturers/${user?.lecturer.id}`, () =>
    //     axios
    //         .get(`api/v1/lecturers/${user?.lecturer.id}`)
    //         .then(response => response.data.data),
    // );

    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);
    const [checkInTime, setCheckInTime] = useState("");
    const [checkOutTime, setCheckOutTime] = useState("");

    const [moduleValue, setModuleValue] = useState(
        currentLecturer?.modules[0].id,
    );

    const now = new Date();
    const checkInNow = event => {
        event.preventDefault();
        let nowHour = now.getHours();
        let nowMin = now.getMinutes();
        if (nowHour < 10) nowHour = `0${nowHour}`;
        if (nowMin < 10) nowMin = `0${nowMin}`;
        setCheckInTime(`${nowHour}:${nowMin}`);
    };
    const checkOutNow = event => {
        event.preventDefault();
        let nowHour = now.getHours();
        let nowMin = now.getMinutes();
        if (nowHour < 10) nowHour = `0${nowHour}`;
        if (nowMin < 10) nowMin = `0${nowMin}`;
        setCheckOutTime(`${nowHour}:${nowMin}`);
    };
    const getDate = () => {
        return `${now.toLocaleString("en-US", {
            day: "2-digit",
        })} ${now.toLocaleString("en-US", {
            month: "long",
        })}, ${now.toLocaleString("en-US", { year: "numeric" })}`;
    };

    // Add attendance
    const submitForm = event => {
        event.preventDefault();
        addAttendance({
            lecturer_id: currentLecturer.id,
            module_id: moduleValue,
            date: now,
            start_time: checkInTime,
            end_time: checkOutTime,
            setErrors,
            setStatus,
        });
    };

    if (status === "attendance-checked-in") {
        return (
            <div className="space-y-8 text-center py-8 px-4 flex flex-col items-center justify-center">
                <div className="pb-8">
                    <h1 className="text-black-text text-xl font-bold">
                        Attendance Submitted!
                    </h1>
                    <p className="text-gray-text">
                        Congratulations! Tour attendance has been submitted
                        successfull
                    </p>
                </div>
                <div className="border-[10px] text-secondary border-secondary p-5 rounded-full w-40 h-40">
                    <CheckIcon />
                </div>
                <div className="text-primary font-bold underline pt-14">
                    <Link href={"/staff"}>Back to Homepage</Link>
                </div>
            </div>
        );
    }
    return (
        <div>
            {/* {status === "attendance-checked-in" && setModalOpen(false)} */}
            <div className="flex items-center justify-between p-4 pt-6 border-b ">
                <h1 className="leading-tight text-black-text font-bold text-2xl">
                    Lecture Check In
                </h1>
                <div className="bg-primary-accent text-xs uppercase py-1 px-3 rounded-full">
                    {getDate()}
                </div>
            </div>
            <form className="space-y-4" onSubmit={submitForm}>
                <Errors className="mb-5" errors={errors} />

                <div className="p-4 space-y-2">
                    <h2 className="text-black-text text-xl font-bold">
                        Module
                    </h2>
                    <div>
                        <select
                            id="moduleValue"
                            value={moduleValue}
                            onChange={event =>
                                setModuleValue(event.target.value)
                            }
                            required
                            className="w-full text-black-text font-bold capitalize p-4 border-primary-accent">
                            {currentLecturer?.modules.length > 0 ? (
                                currentLecturer?.modules.map(module => (
                                    <option key={module.id} value={module.id}>
                                        {module.code} - {module.title}
                                    </option>
                                ))
                            ) : (
                                <option>No module</option>
                            )}
                        </select>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-[#CCFFE24D] p-4 py-5 space-y-4 border-y border-[#F3F3F3]">
                        <div className="flex items-center justify-between">
                            <h2 className="text-black-text font-bold text-xl">
                                Check In Time
                            </h2>
                            <button
                                onClick={checkInNow}
                                className="text-primary px-6 py-2 border border-primary rounded-full font-bold">
                                Now
                            </button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                className="border-2 border-primary w-full h-16 bg-white text-center text-3xl rounded-md uppercase"
                                type="time"
                                id="checkInTime"
                                value={checkInTime}
                                onChange={event =>
                                    setCheckInTime(event.target.value)
                                }
                                required
                            />
                        </div>
                    </div>
                    <div className="bg-white p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-black-text font-bold text-xl">
                                Check Out Time
                            </h2>
                            <button
                                onClick={checkOutNow}
                                className="text-primary px-6 py-2 border border-primary rounded-full font-bold">
                                Now
                            </button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                className="border-2 border-primary w-full h-16 bg-white text-center text-3xl rounded-md uppercase"
                                type="time"
                                id="checkOutTime"
                                value={checkOutTime}
                                onChange={event =>
                                    setCheckOutTime(event.target.value)
                                }
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="flex py-6 px-4 items-center justify-between">
                    <button className="text-primary bg-primary-accent inline-block px-14 py-3 rounded-full capitalize font-bold">
                        save
                    </button>
                    <button
                        type="submit"
                        className="text-white bg-primary inline-block px-12 py-3 rounded-full capitalize font-bold">
                        {loading ? "loading" : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckInModal;
