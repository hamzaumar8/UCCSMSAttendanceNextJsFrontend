import Link from "next/link";

const LecturerModuleCard = ({ module, active = "" }) => {
    console.log("red");
    return (
        <div
            className={`${
                active ? "bg-secondary" : "bg-primary-accent"
            } rounded-lg block transition ease-in-out duration-300`}>
            <div className="border-b border-[#00000029] flex items-center justify-between p-4">
                <div className="flex items-center space-x-3 text-xs font-extrabold text-black-text">
                    <h2 className="uppercase">{module.module.code}</h2>
                    <div className="rounded-full border-2 border-gray-900 py-1 px-3">
                        {module.days.covered}/
                        <span className="text-gray-500 mr-1">
                            {module.days.total}
                        </span>{" "}
                        Days
                    </div>
                </div>
            </div>
            <div className="px-4 py-3 space-y-3">
                <Link
                    href={`modules/${module.id}`}
                    className="capitalize font-gray-800 text-lg font-bold">
                    {module.module.title}{" "}
                </Link>
            </div>
        </div>
    );
};

export default LecturerModuleCard;
