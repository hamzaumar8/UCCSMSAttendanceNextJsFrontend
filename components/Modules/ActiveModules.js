import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../../src/atoms/modalAtom";
import Button from "../Button";
import ModuleCard from "../Cards/ModuleCard";
import Input from "../Input";

const ActiveModules = ({ modules }) => {
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);

    const [viewAll, setViewAll] = useState(false);
    const [searchToggle, setSearchToggle] = useState(false);
    const [query, setQuery] = useState("");

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg transition duration-500 ease-in-out">
            {/* Header */}
            <div className="p-5 block sm:flex  items-center justify-between relative border-b ">
                <div className="flex items-center justify-center space-x-4">
                    <h1 className="text-xl font-extrabold">Active Modules</h1>
                    <div className="bg-primary rounded-full text-white h-8 w-8 inline-flex items-center justify-center">
                        {modules.length}
                    </div>
                </div>
                {searchToggle && viewAll && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            transition={{ duration: 0.2 }}>
                            <Input
                                type="text"
                                placeholder="Search..."
                                className="bg-white border-primary text-sm text-gray-text outline-none min-w-max px-8 py-2 rounded-sm shadow-sm"
                                onChange={e => setQuery(e.target.value)}
                            />
                        </motion.div>
                    </AnimatePresence>
                )}
                <div className="space-x-10 flex items-center">
                    {modules.length > 3 && (
                        <div>
                            <button
                                className="inline-flex items-center px-4 py-2 bg-primary-accent text-primary border border-transparent rounded-full font-semibold text-xs capitalize tracking-widest hover:bg-blue-700 hover:text-white active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity:25 transition ease-in-out duration-150 space-x-2"
                                onClick={() => setViewAll(!viewAll)}>
                                View {viewAll ? "less" : "all"}
                            </button>
                        </div>
                    )}
                    <div className="space-x-2">
                        {viewAll && (
                            <button
                                onClick={() => setSearchToggle(!searchToggle)}
                                className="text-white bg-primary p-2 rounded-full">
                                <MagnifyingGlassIcon className="h-5 w-5" />
                            </button>
                        )}
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => {
                                setModalOpen(true);
                                setModalType("mountModule");
                            }}
                            className="inline-flex items-center px-4 py-2 bg-primary text-white border border-transparent rounded-full font-semibold text-xs capitalize tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity:25 transition ease-in-out duration-150 space-x-2">
                            <PlusIcon className="w-4 h-4" />
                            <span> Mount Module</span>
                        </motion.button>
                    </div>
                </div>
            </div>
            <div className="py-4 px-5 pb-6 bg-white space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {modules.length > 0 ? (
                        !viewAll ? (
                            <>
                                {modules.slice(0, 3).map(module => (
                                    <ModuleCard
                                        key={module.id}
                                        module={module}
                                        active={true}
                                    />
                                ))}
                            </>
                        ) : (
                            <>
                                {modules
                                    .filter(
                                        mod =>
                                            mod.module.title
                                                .toLowerCase()
                                                .includes(query) ||
                                            mod.module.code
                                                .toLowerCase()
                                                .includes(query),
                                    )
                                    .map(module => (
                                        <ModuleCard
                                            key={module.id}
                                            module={module}
                                            active={true}
                                        />
                                    ))}
                            </>
                        )
                    ) : (
                        <div>no Active module</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActiveModules;
