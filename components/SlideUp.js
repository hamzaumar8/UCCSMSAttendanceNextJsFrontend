import { XCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const panelVariants = {
    hidden: { y: 1000 },
    visible: {
        y: 0,
        transition: {
            type: "spring",
            damping: 30,
            stiffness: 300,
        },
    },
};

const SlideUp = ({ children, className = "", onClick = "" }) => {
    return (
        <div className={`${className} checkInModal`}>
            <motion.div
                className="overlay"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={overlayVariants}
            />
            {onClick && (
                <div className="closeBtnM absolute" onClick={onClick}>
                    <XCircleIcon />
                </div>
            )}
            <motion.div
                className="modal-panel"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={panelVariants}>
                <motion.div className="modal-body">{children}</motion.div>
            </motion.div>
        </div>
    );
};

export default SlideUp;
