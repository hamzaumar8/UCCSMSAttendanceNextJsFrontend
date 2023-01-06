import { useState } from "react";
import ModuleCard from "../Cards/ModuleCard";
import { motion, AnimatePresence } from "framer-motion";
const UpInactiveModules = ({ modules }) => {
    const [upViewAll, setUpViewAll] = useState(false);
    const [upInactiveToggle, setUpInactiveToggle] = useState(false);

    const modulesUpcoming = modules.filter(itm => itm.status == "upcoming");
    const modulesInactive = modules.filter(itm => itm.status == "inactive");

    const [searchToggle, setSearchToggle] = useState(false);
    const [query, setQuery] = useState("");

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg transition duration-500 ease-in-out">
            {/* Header */}
            <div className="px-5 block sm:flex  items-center justify-between relative border-b ">
                <div className="flex items-center justify-center space-x-8">
                    <button
                        className={`${
                            !upInactiveToggle
                                ? "after:bg-primary text-primary"
                                : "after:bg-gray-200"
                        } transition duration-500 ease-in-out flex items-center space-x-2 relative after:absolute after:bottom-0 after:h-[4px] after:w-full py-5 after:transition after:duration-500 after:ease-in-out after:rounded-t-full`}
                        onClick={() => setUpInactiveToggle(false)}>
                        <h1 className="text-xl font-extrabold ">
                            Upcoming Modules
                        </h1>
                        <div className="bg-primary rounded-full text-white h-8 w-8 inline-flex items-center justify-center">
                            {modulesUpcoming.length}
                        </div>
                    </button>
                    <button
                        className={`${
                            upInactiveToggle
                                ? "after:bg-primary text-primary"
                                : "after:bg-gray-200"
                        } transition duration-500 ease-in-out flex items-center space-x-2 relative after:absolute after:bottom-0 after:h-[4px] after:w-full py-5 after:transition after:duration-500 after:ease-in-out after:rounded-t-full`}
                        onClick={() => setUpInactiveToggle(true)}>
                        <h1 className="text-xl font-extrabold ">
                            Inactive Modules
                        </h1>
                        <div className="bg-primary rounded-full text-white h-8 w-8 inline-flex items-center justify-center">
                            {modulesInactive.length}
                        </div>
                    </button>
                </div>
                {(modulesInactive > 3 || modulesUpcoming > 3) && (
                    <div className="">
                        <button
                            className="inline-flex items-center px-4 py-2 bg-primary-accent text-primary border border-transparent rounded-full font-semibold text-xs capitalize tracking-widest hover:bg-blue-700 hover:text-white active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity:25 transition ease-in-out duration-150 space-x-2"
                            onClick={() => setUpViewAll(!upViewAll)}>
                            View {upViewAll ? "less" : "all"}
                        </button>
                    </div>
                )}
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={upInactiveToggle ? "upcoming" : "inactive"}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <div className="py-4 px-5 pb-6 bg-white space-y-3 transition duration-500 ease-in-out">
                        {!upInactiveToggle ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {modulesUpcoming.length > 0 ? (
                                    !upViewAll ? (
                                        <>
                                            {modulesUpcoming
                                                .slice(0, 3)
                                                .map(module => (
                                                    <ModuleCard
                                                        key={module.id}
                                                        module={module}
                                                    />
                                                ))}
                                        </>
                                    ) : (
                                        <>
                                            {modulesUpcoming.map(module => (
                                                <ModuleCard
                                                    key={module.id}
                                                    module={module}
                                                />
                                            ))}
                                        </>
                                    )
                                ) : (
                                    <div>no Active module</div>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {modulesInactive.length > 0 ? (
                                    !upViewAll ? (
                                        <>
                                            {modulesInactive
                                                .slice(0, 3)
                                                .map(module => (
                                                    <ModuleCard
                                                        key={module.id}
                                                        module={module}
                                                    />
                                                ))}
                                        </>
                                    ) : (
                                        <>
                                            {modulesInactive.map(module => (
                                                <ModuleCard
                                                    key={module.id}
                                                    module={module}
                                                />
                                            ))}
                                        </>
                                    )
                                ) : (
                                    <div>no Active module</div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default UpInactiveModules;
