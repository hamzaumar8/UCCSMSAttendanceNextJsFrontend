import { useState } from "react";
import ModuleCard from "../Cards/ModuleCard";
import { motion, AnimatePresence } from "framer-motion";
const UpPastModules = ({ modules }) => {
    const [upViewAll, setUpViewAll] = useState(false);
    const [upPastToggle, setUpPastToggle] = useState(false);

    const modulesUpcoming = modules.filter(itm => itm.status == "upcoming");
    const modulesPast = modules.filter(itm => itm.status == "past");

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg transition duration-200 ease-in-out">
            {/* Header */}
            <div className="px-5 pt-5 block sm:flex  items-center justify-between relative border-b ">
                <div className="flex items-center justify-center space-x-8">
                    <button
                        className={`${
                            !upPastToggle && "border-primary text-primary"
                        } border-b-4 pb-4 transition duration-500 ease-in-out`}
                        onClick={() => setUpPastToggle(false)}>
                        <h1 className="text-xl font-extrabold ">
                            Upcoming Modules
                        </h1>
                    </button>
                    <button
                        className={`${
                            upPastToggle && "border-primary text-primary"
                        } border-b-4 pb-4 transition duration-500 ease-in-out`}
                        onClick={() => setUpPastToggle(true)}>
                        <h1 className="text-xl font-extrabold ">
                            Past Modules
                        </h1>
                    </button>
                </div>
                {(modulesPast > 3 || modulesUpcoming > 3) && (
                    <div className="">
                        <button
                            className="inline-flex items-center px-5 py-3 bg-primary-accent text-primary border border-transparent rounded-full font-semibold text-xs capitalize tracking-widest hover:bg-blue-700 hover:text-white active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity:25 transition ease-in-out duration-500"
                            onClick={() => setUpViewAll(!upViewAll)}>
                            View {upViewAll ? "less" : "all"}
                        </button>
                    </div>
                )}
            </div>
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    key={upPastToggle ? "upcoming" : "past"}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <div className="py-4 px-5 pb-6 bg-white space-y-3 transition duration-500 ease-in-out">
                        {!upPastToggle ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {modulesUpcoming.length > 0 ? (
                                    !upViewAll ? (
                                        <>
                                            {modulesUpcoming
                                                .slice(0, 3)
                                                .map(lecturermodule => (
                                                    <ModuleCard
                                                        key={lecturermodule.id}
                                                        lecturermodule={
                                                            lecturermodule
                                                        }
                                                    />
                                                ))}
                                        </>
                                    ) : (
                                        <>
                                            {modulesUpcoming.map(
                                                lecturermodule => (
                                                    <ModuleCard
                                                        key={lecturermodule.id}
                                                        lecturermodule={
                                                            lecturermodule
                                                        }
                                                    />
                                                ),
                                            )}
                                        </>
                                    )
                                ) : (
                                    <div>no Active module</div>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {modulesPast.length > 0 ? (
                                    !upViewAll ? (
                                        <>
                                            {modulesPast
                                                .slice(0, 3)
                                                .map(lecturermodule => (
                                                    <ModuleCard
                                                        key={lecturermodule.id}
                                                        lecturermodule={
                                                            lecturermodule
                                                        }
                                                    />
                                                ))}
                                        </>
                                    ) : (
                                        <>
                                            {modulesPast.map(lecturermodule => (
                                                <ModuleCard
                                                    key={lecturermodule.id}
                                                    lecturermodule={
                                                        lecturermodule
                                                    }
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

export default UpPastModules;
