import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../src/lib/axios";

const Lecturer = ({ lecturer }) => {
    return (
        <AppLayout header="Lecturer details page">
            <HeadTitle title="Lecturers" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {lecturer.id}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Lecturer;

export async function getStaticPaths() {
    const response = await axios.get("/api/v1/lecturers");
    return {
        paths: response.data.data.map(lecturer => ({
            params: { id: lecturer.id.toString() },
        })),
        fallback: false, // can also be true or 'blocking'
    };
}

export async function getStaticProps({ params }) {
    const response = await axios.get(`/api/v1/lecturers/${params.id}`);
    return {
        props: {
            lecturer: response.data.data,
        },
    };
}
