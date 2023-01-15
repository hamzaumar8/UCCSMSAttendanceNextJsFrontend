import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import HeadTitle from "../components/HeadTitle";

const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg"];
export default function Home() {
    const token = Cookies.get("token");
    const [imgIndex, setImgIndex] = useState(0);
    const timeoutRef = useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setImgIndex(prevIndex =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1,
                ),
            5000,
        );

        return () => {
            resetTimeout();
        };
    }, [imgIndex]);

    return (
        <>
            <HeadTitle title={"Welcome"} />

            <div className="relative min-h-screen bg-gray-100 p-3 lg:p-0 space-y-10 lg:space-y-0 lg:flex">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={imgIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="relative w-full lg:w-1/2 min-h-[60vh] rounded-lg lg:rounded-none overflow-hidden">
                        <Image
                            src={images[imgIndex]}
                            fill
                            priority
                            alt={imgIndex}
                            className="relative"
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="space-y-10 w-full lg:w-1/2 lg:flex lg:flex-col lg:items-center lg:justify-center lg:min-h-screen lg:p-6">
                    <div className="text-center">
                        <h1 className="text-black-text font-bold leading-10 text-4xl">
                            Welcome Back!
                        </h1>
                        <p className="text-gray-text text-sm">
                            To keep track of attendance, sign in to your account
                        </p>

                        <div className="space-x-1">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    className={`w-8 h-1 rounded-full ${
                                        imgIndex === index
                                            ? "bg-primary"
                                            : "bg-blue-300"
                                    }`}
                                    onClick={() => setImgIndex(index)}></button>
                            ))}
                        </div>
                    </div>

                    <div className="w-full">
                        {token ? (
                            <Link
                                href={"/dashboard"}
                                className="w-full inline-flex items-center justify-center px-4 py-3  border border-transparent rounded-sm font-bold text-xs uppercase tracking-widest focus:ring disabled:opacity-25 transition ease-in-out duration-150 text-white bg-primary hover:bg-primary active:bg-primary focus:outline-none focus:border-primary ring-primary">
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={"/login"}
                                className="w-full inline-flex items-center justify-center px-4 py-3  border border-transparent rounded-sm font-bold text-xs uppercase tracking-widest focus:ring disabled:opacity-25 transition ease-in-out duration-150 text-white bg-primary hover:bg-primary active:bg-primary focus:outline-none focus:border-primary ring-primary">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
