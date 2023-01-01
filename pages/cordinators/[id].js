import Head from "next/head";
import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../src/lib/axios";

const Cordinator = ({ module }) => {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-black-text leading-tight">
                    student details page
                </h2>
            }>
            <Head>
                <title>Laravel - Dashboard</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {module.id}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Cordinator;

export async function getStaticPaths() {
    const response = await axios.get("/api/v1/modules");
    return {
        paths: response.data.data.map(module => ({
            params: { id: module.id.toString() },
        })),
        fallback: false, // can also be true or 'blocking'
    };
}

export async function getStaticProps({ params }) {
    const response = await axios.get(`/api/v1/modules/${params.id}`);
    return {
        props: {
            module: response.data.data,
        },
    };
}
