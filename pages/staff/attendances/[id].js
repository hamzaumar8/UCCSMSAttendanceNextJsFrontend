import axios from "../../../src/lib/axios";

const Attendance = ({ attendance }) => {
    console.log(attendance);
    return <div>shit</div>;
};

export default Attendance;

export async function getStaticPaths() {
    const response = await axios.get("/api/v1/attendances");
    return {
        paths: response.data.data.map(attendance => ({
            params: { id: attendance.id.toString() },
        })),
        fallback: false, // can also be true or 'blocking'
    };
}

export async function getStaticProps({ params }) {
    const response = await axios.get(`/api/v1/attendances/${params.id}`);
    return {
        props: {
            attendance: response.data.data,
        },
    };
}
