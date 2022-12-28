import { PlusIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";
import { modalState, modalTypeState } from "../../src/atoms/modalAtom";
import {
    handleModuleBankState,
    useSSRModuleBankState,
} from "../../src/atoms/moduleAtom";
import axios from "../../src/lib/axios";
import ModuleBankCard from "../Cards/ModuleBankCard";
import ModuleCard from "../Cards/ModuleCard";
import ModuleBank from "./ModuleBank";

const ModuleBankFeed = ({ modules }) => {
    const [realtimeModuleBank, setRealtimeModuleBank] = useState([]);
    const [useSSRModuleBank, setUseSSRModuleBank] = useRecoilState(
        useSSRModuleBankState,
    );
    const [handleModuleBank, setHandleModuleBank] = useRecoilState(
        handleModuleBankState,
    );

    useEffect(() => {
        const fetchModuleBank = async () => {
            const response = await axios.get("/api/v1/module/bank");
            const moduleBank = response.data.data;
            setRealtimeModuleBank(moduleBank);
            setHandleModuleBank(false);
            setUseSSRModuleBank(false);
        };
        fetchModuleBank();
    }, [handleModuleBank]);

    return (
        <>
            {!useSSRModuleBank ? (
                <ModuleBank modules={realtimeModuleBank} />
            ) : (
                <ModuleBank modules={modules} />
            )}
        </>
    );
};

export default ModuleBankFeed;
