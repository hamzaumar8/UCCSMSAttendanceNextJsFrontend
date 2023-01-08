import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../src/lib/axios";

const Student = ({ student }) => {
    return (
        <AppLayout header={`${student.full_name} Details`}>
            <HeadTitle title={`${student.full_name} Details`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {student.id}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Student;

export async function getStaticPaths() {
    const response = await axios.get("/api/v1/students");
    return {
        paths: response.data.data.map(student => ({
            params: { id: student.id.toString() },
        })),
        fallback: false, // can also be true or 'blocking'
    };
}

export async function getStaticProps({ params }) {
    const response = await axios.get(`/api/v1/students/${params.id}`);
    return {
        props: {
            student: response.data.data,
        },
    };
}
