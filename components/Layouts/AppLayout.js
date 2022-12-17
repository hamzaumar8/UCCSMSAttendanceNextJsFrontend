import Navigation from "./Navigation";
import { useAuth } from "../../src/hooks/auth";
import SideNav from "./SideNav";
import Head from "next/head";

const AppLayout = ({ header = "", children }) => {
    const { user, isLoading } = useAuth({ middleware: "auth" });

    if (isLoading || !user) {
        return <>Loading...</>;
    }
    return (
        <div className="bg-[#E5E5E5">
            {/* Side Navigation */}
            <SideNav />
            <main className="bg-gray-100 ease-soft-in-out xl:ml-[18rem] relative min-h-screen rounded-xl transition-all duration-200">
                <Navigation user={user} header={header} />

                {/* Page Content */}
                <section className="w-full px-6 sm:px-8 lg:px-12 py-6  sm:py-8 mx-auto">
                    {children}
                </section>
            </main>
        </div>
    );
};

export default AppLayout;
