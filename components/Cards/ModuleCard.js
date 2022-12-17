const ModuleCard = ({ header = "", title, children }) => (
    <div className="bg-secondary overflow-hidden rounded-lg block relative transition ease-in-out duration-300">
        <div className="border-b flex items-center justify-between p-4">
            <div className="flex items-center space-x-3 text-xs font-bold text-gray-900">
                <h2 className="uppercase">Med 303</h2>
                <div className="rounded-full border-2 border-gray-900 py-1 px-3">
                    12/<span className="text-gray-500 mr-1">21</span> Days
                </div>
            </div>
            <div className="bg-primary rounded-full text-white h-8 w-8 inline-flex items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6">
                    <path
                        fillRule="evenodd"
                        d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </div>
        <div className="px-4 py-3 space-y-3">
            <h1 className="capitalize font-gray-800 text-lg font-bold">
                {title}
            </h1>
            <div className="grid grid-cols-2 bg-secondary-accent rounded-md">
                <div className="py-2 px-6 border-r space-y-2 ">
                    <h3 className="text-xs font-bold text-gray-800">
                        Lecturer Attendance
                    </h3>
                    <div className="font-bold text-gray-900">12/12</div>
                </div>
                <div className="py-2 px-6 space-y-2">
                    <h3 className="text-xs font-bold text-gray-800">
                        Students Attendance
                    </h3>
                    <div className="font-bold text-gray-900">97/100</div>
                </div>
            </div>
        </div>
        <div className="border-t grid grid-cols-2 px-4">
            <div className="border-r p-2 flex items-center space-x-2 ">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary-accent border-2 border-secondary-accent rounded-full">
                    <img />
                </div>
                <h2 className="text-xs font-bold text-gray-800">
                    Dr. Dianne Russell
                </h2>
            </div>
            <div className="p-2 flex items-center space-x-2 ">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary-accent rounded-full">
                    <img />
                </div>
                <h2 className="text-xs font-bold text-gray-800">
                    james Russell
                </h2>
            </div>
        </div>
    </div>
);

export default ModuleCard;
