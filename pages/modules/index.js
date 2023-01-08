import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import ActiveModules from "../../components/Modules/ActiveModules";
import ModuleBankFeed from "../../components/Modules/ModuleBankFeed";
import UpInactiveModules from "../../components/Modules/UpInactiveModules";
import {
    handleModuleMountState,
    useSSRModuleMountState,
} from "../../src/atoms/moduleAtom";
import axios from "../../src/lib/axios";
import SemesterNotFound from "../../components/SemesterNotFound";
const Modules = ({ semester, modules, modulesBank }) => {
    const modulesActive = modules.filter(itm => itm.status == "active");
    const modulesUpInactive = modules.filter(
        itm => itm.status == "upcoming" || itm.status == "inactive",
    );

    const [realtimeModuleMount, setRealtimeModuleMount] = useState([]);
    const [useSSRModuleMount, setUseSSRModuleMount] = useRecoilState(
        useSSRModuleMountState,
    );
    const [handleModuleMount, setHandleModuleMount] = useRecoilState(
        handleModuleMountState,
    );

    useEffect(() => {
        const fetchModuleMount = async () => {
            const response = await axios.get("/api/v1/modules");
            const moduleMount = response.data.data;
            setRealtimeModuleMount(moduleMount);
            setHandleModuleMount(false);
            setUseSSRModuleMount(false);
        };
        fetchModuleMount();
    }, [handleModuleMount]);

    const realtimeModulesActive = realtimeModuleMount.filter(
        itm => itm.status == "active",
    );
    const realtimeModulesUpInactive = realtimeModuleMount.filter(
        itm => itm.status == "upcoming" || itm.status == "inactive",
    );

    return (
        <AppLayout header="Modules">
            <HeadTitle title="Modules" />

            <div className="relative space-y-8">
                {semester ? (
                    <>
                        {!useSSRModuleMount ? (
                            <>
                                <ActiveModules
                                    modules={realtimeModulesActive}
                                />
                                <UpInactiveModules
                                    modules={realtimeModulesUpInactive}
                                />
                            </>
                        ) : (
                            <>
                                <ActiveModules modules={modulesActive} />
                                <UpInactiveModules
                                    modules={modulesUpInactive}
                                />
                            </>
                        )}
                    </>
                ) : (
                    <SemesterNotFound />
                )}
                <ModuleBankFeed modules={modulesBank} />
            </div>
        </AppLayout>
    );
};

export default Modules;

export async function getStaticProps() {
    const response = await axios.get("api/v1/modules");
    const modules = response.data.data;

    const responseModuleBank = await axios.get("api/v1/module_banks");
    const modulesBank = responseModuleBank.data.data;

    const responseSemester = await axios.get("api/v1/semester");
    const semester = responseSemester.data;
    return {
        props: {
            semester,
            modules,
            modulesBank,
        },
    };
}
