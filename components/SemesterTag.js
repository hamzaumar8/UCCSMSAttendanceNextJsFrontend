import { useSemester } from "../src/hooks/semester";

const SemesterTag = () => {
    const { semester } = useSemester();
    return (
        <>
            {semester && (
                <div className="flex border border-primary p-1 px-6 space-x-2 rounded-full text-sm capitalize font-bold text-primary">
                    <span>{semester?.academic_year}</span>
                    <span>{semester?.semester} semester</span>
                </div>
            )}
        </>
    );
};
export default SemesterTag;
