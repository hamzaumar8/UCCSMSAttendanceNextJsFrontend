import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import ActiveModules from "../../components/Modules/ActiveModules";
import ModuleBankFeed from "../../components/Modules/ModuleBankFeed";
import UpInactiveModules from "../../components/Modules/UpInactiveModules";
import axios from "../../src/lib/axios";

const Modules = ({ modules, modulesBank }) => {
    const modulesActive = modules.filter(itm => itm.status == "active");
    const modulesUpInactive = modules.filter(
        itm => itm.status == "upcoming" || itm.status == "inactive",
    );

    return (
        <AppLayout header="Modules">
            <HeadTitle title="Modules" />

            <div className="relative space-y-8">
                <ActiveModules modules={modulesActive} />
                <UpInactiveModules modules={modulesUpInactive} />
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
    return {
        props: {
            modules,
            modulesBank,
        },
    };
}
