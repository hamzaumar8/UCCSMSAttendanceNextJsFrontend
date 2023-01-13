import { motion } from "framer-motion";

const Backdrop = ({ children, className = "" }) => {
    return (
        <motion.div
            className={`${className} fixed top-0 left-0 h-full w-full overflow-hidden bg-black/70 flex items-center justify-center z-50`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            {children}
        </motion.div>
    );
};

export default Backdrop;
