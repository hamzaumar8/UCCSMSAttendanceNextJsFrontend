import Link from "next/link";

const SemesterNotFound = () => (
    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg relative p-5 flex items-center justify-center">
        <div>
            <h1 className="text-danger text-2xl font-bold">
                No Semester Has been set.
            </h1>
            <p className="text-center font-bold">
                Click on this to set one{" "}
                <Link href={"/settings"} className="underline text-primary">
                    Settings.
                </Link>
            </p>
        </div>
    </div>
);

export default SemesterNotFound;
