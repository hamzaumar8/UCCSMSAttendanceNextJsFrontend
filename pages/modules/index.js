import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import ActiveModules from "../../components/Modules/ActiveModules";
import ModuleBankFeed from "../../components/Modules/ModuleBankFeed";
import UpPastModules from "../../components/Modules/UpPastModules";
import axios from "../../src/lib/axios";

const Modules = ({ modules, modulesBank }) => {
    const modulesActive = modules.filter(itm => itm.status == "active");
    const modulesUpPast = modules.filter(
        itm => itm.status == "upcoming" || itm.status == "past",
    );

    return (
        <AppLayout header="Modules">
            <HeadTitle title="Modules" />

            <div className="relative space-y-8">
                <ActiveModules modules={modulesActive} />
                <UpPastModules modules={modulesUpPast} />
                <ModuleBankFeed modules={modulesBank} />
            </div>
        </AppLayout>
    );
};

export default Modules;

export async function getStaticProps() {
    const response = await axios.get("api/v1/lecture/modules");
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
