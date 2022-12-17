import AppLayout from "../components/Layouts/AppLayout";
import axios from "../src/lib/axios";
import Card from "../components/Card";
import HeadTitle from "../components/HeadTitle";

const Dashboard = () => {
    return (
        <AppLayout header="Dashboard">
            <HeadTitle title="Dashboard" />

            <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-8">
                    <div className="col-span-1 xl:col-span-2 ">
                        <Card
                            header={
                                <h1 className="flex text-gray-text space-x-2 items-center uppercase text-sm font-semibold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                        />
                                    </svg>
                                    <span>30th Novenmber</span>
                                </h1>
                            }>
                            <div className="mr-14">
                                <h1 className="text-gray-800 font-bold">
                                    Summary
                                </h1>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between bg-green-300 p-2 rounded-md">
                                        <div className="flex space-x-4 items-center">
                                            <div className="bg-blue-700 h-2 w-2 rounded-full"></div>
                                            <h3>Active Modules</h3>
                                        </div>
                                        <div className="bg-white text-xs font-semibold block px-1 text-center rounded-lg w-[50px] py-0.5 mr-6">
                                            <span>6</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                                        <div className="flex space-x-4 items-center">
                                            <div className="bg-blue-700 h-2 w-2 rounded-full"></div>
                                            <h3>Active Modules</h3>
                                        </div>
                                        <div className="bg-white text-xs font-semibold block px-1 text-center rounded-lg w-[50px] py-0.5 mr-6">
                                            <span>6</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                                        <div className="flex space-x-4 items-center">
                                            <div className="bg-blue-700 h-2 w-2 rounded-full"></div>
                                            <h3>Active Modules</h3>
                                        </div>
                                        <div className="bg-white text-xs font-semibold block px-1 text-center rounded-lg w-[50px] py-0.5 mr-6">
                                            <span>6</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between bg-blue-100 p-2 rounded-md">
                                        <div className="flex space-x-4 items-center">
                                            <div className="bg-blue-700 h-2 w-2 rounded-full"></div>
                                            <h3>Active Modules</h3>
                                        </div>
                                        <div className="bg-white text-xs font-semibold block px-1 text-center rounded-lg w-[50px] py-0.5 mr-6">
                                            <span>6</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    {/* Active Modules Card */}
                    <div className="col-span-1 xl:col-span-3">
                        <Card
                            header={
                                <h1 className="text-gray-900 font-extrabold capitalize">
                                    Active Mdoules
                                </h1>
                            }>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-1 rounded-md">
                                    <div className="flex space-x-2 items-center">
                                        <div className="flex items-center justify-center bg-primary-accent text-primary rounded-full text-xs w-[80px] py-1 font-bold uppercase">
                                            Med 101
                                        </div>
                                        <h3 className="text-gray-text text-xs capitalized">
                                            Introduction to Medical studies
                                        </h3>
                                    </div>
                                    <div className="bg-white text-xs font-semibold block px-1 text-center rounded-lg w-[50px] py-0.5">
                                        <span>30%</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Dashboard;

// export async function getStaticProps() {
//     const response = await axios.get("api/v1/students");
//     const students = response.data.data;
//     return {
//         props: {
//             students,
//         },
//     };
// }
