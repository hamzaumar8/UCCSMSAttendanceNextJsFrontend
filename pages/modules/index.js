import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import ActiveModules from "../../components/Modules/ActiveModules";
import UpPastModules from "../../components/Modules/UpPastModules";
import axios from "../../src/lib/axios";

const Modules = ({ modules }) => {
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
            </div>
        </AppLayout>
    );
};

export default Modules;

export async function getStaticProps() {
    const response = await axios.get("api/v1/lecture/modules");
    const modules = response.data.data;
    return {
        props: {
            modules,
        },
    };
}
