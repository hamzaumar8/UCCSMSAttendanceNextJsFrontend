import Image from "next/image";
import Link from "next/link";
import ElementNotFound from "../../components/ElementNorFound";
import HeadTitle from "../../components/HeadTitle";
import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../src/lib/axios";

const Lecturer = ({ lecturer, cordinatingModule }) => {
    return (
        <AppLayout
            header={`${lecturer.title} ${lecturer.surname} Details`}
            breadcrumbs={
                <div className="space-x-1 text-primary font-bold text-sm capitalize">
                    <Link href={"/dashboard"}>Dasbord /</Link>
                    <Link href={"/lecturers"}>Lecturers /</Link>
                    <span className="text-gray-text">{lecturer.full_name}</span>
                </div>
            }>
            <HeadTitle title="Lecturers" />
            {/* Main Sction */}
            <div className="relative space-y-8">
                {/* My Module */}
                <div className="bg-white overflow-hidden sm:rounded-md transition duration-500 ease-in-out shadow-sm">
                    {/* Header */}
                    <div className="p-5 block sm:flex  items-center justify-between relative border-b">
                        <h1 className="text-xl font-extrabold">Fulls</h1>
                    </div>
                    <div className="py-4 px-5 pb-6 bg-white space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <div className="relative h-40">
                                <Image
                                    src={lecturer.picture}
                                    alt={lecturer.surname}
                                    fill
                                />
                            </div>
                            <div className="col-span-2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="font-bold text-black-text">
                                        <span className="font-normal text-gray-text mr-1">
                                            Title:
                                        </span>
                                        {lecturer.title}
                                    </div>
                                    <div className="font-bold text-black-text">
                                        <span className="font-normal text-gray-text mr-1">
                                            Staff ID:
                                        </span>
                                        <span>{lecturer.staff_id}</span>
                                    </div>
                                    <div className="font-bold text-black-text">
                                        <span className="font-normal text-gray-text mr-1">
                                            First Name:
                                        </span>
                                        <span>{lecturer.first_name}</span>
                                    </div>
                                    <div className="font-bold text-black-text">
                                        <span className="font-normal text-gray-text mr-1">
                                            Surname:
                                        </span>
                                        <span>{lecturer.surname}</span>
                                    </div>
                                    <div className="font-bold text-black-text">
                                        <span className="font-normal text-gray-text mr-1">
                                            Other Name (s):
                                        </span>
                                        <span>{lecturer.other_name}</span>
                                    </div>
                                    <div className="font-bold text-black-text">
                                        <span className="font-normal text-gray-text mr-1">
                                            Contact:
                                        </span>
                                        <span>{lecturer.phone}</span>
                                    </div>
                                    <div className="font-bold text-black-text">
                                        <span className="font-normal text-gray-text mr-1">
                                            Email:
                                        </span>
                                        <span>{lecturer.user.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* My Module */}
                <div className="bg-white overflow-hidden sm:rounded-md transition duration-500 ease-in-out shadow-sm">
                    {/* Header */}
                    <div className="p-5 block sm:flex  items-center justify-between relative border-b">
                        <div className="flex items-center justify-center space-x-4">
                            <h1 className="text-xl font-extrabold">Modules</h1>
                            <div className="bg-primary rounded-full text-white h-8 w-8 inline-flex items-center justify-center">
                                {lecturer.modules.length}
                            </div>
                        </div>
                    </div>
                    <div className="py-4 px-5 pb-6 bg-white space-y-3">
                        {lecturer.modules.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {lecturer.modules.map((module, index) => {
                                    const active = module.status === "active";
                                    return (
                                        <div
                                            key={index}
                                            className={`${
                                                active
                                                    ? "bg-secondary-accent"
                                                    : "bg-primary-accent"
                                            } rounded-lg block transition ease-in-out duration-300`}>
                                            <div className="border-b border-[#00000029] flex items-center justify-between p-4">
                                                <div className="flex items-center space-x-3 text-xs font-extrabold text-black-text">
                                                    <h2 className="uppercase">
                                                        {module.module.code}
                                                    </h2>
                                                </div>
                                            </div>
                                            <div className="px-4 py-3 space-y-3">
                                                <Link
                                                    href={`modules/${module.id}`}
                                                    className="capitalize font-gray-800 text-lg font-bold underline">
                                                    {module.module.title}{" "}
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <ElementNotFound>
                                <h2 className="text-xl sm:text-2xl text-primary font-bold">
                                    No Active Module Availble
                                </h2>
                                <p className="text-gray-text font-[500]">
                                    Sorry! You don't have any moudules for this
                                    semster yet.
                                </p>
                            </ElementNotFound>
                        )}
                    </div>
                </div>
                {/* Cordinating Module */}
                <div className="bg-white overflow-hidden sm:rounded-md transition duration-500 ease-in-out shadow-sm">
                    {/* Header */}
                    <div className="p-5 block sm:flex  items-center justify-between relative border-b">
                        <div className="flex items-center justify-center space-x-4">
                            <h1 className="text-xl font-extrabold">
                                Cordinating Modules
                            </h1>
                            <div className="bg-primary rounded-full text-white h-8 w-8 inline-flex items-center justify-center">
                                {cordinatingModule.length}
                            </div>
                        </div>
                    </div>
                    <div className="py-4 px-5 pb-6 bg-white space-y-3">
                        {cordinatingModule.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {cordinatingModule.map((module, index) => {
                                    const active = module.status === "active";
                                    return (
                                        <div
                                            key={index}
                                            className={`${
                                                active
                                                    ? "bg-secondary-accent"
                                                    : "bg-primary-accent"
                                            } rounded-lg block transition ease-in-out duration-300`}>
                                            <div className="border-b border-[#00000029] flex items-center justify-between p-4">
                                                <div className="flex items-center space-x-3 text-xs font-extrabold text-black-text">
                                                    <h2 className="uppercase">
                                                        {module.module.code}
                                                    </h2>
                                                </div>
                                            </div>
                                            <div className="px-4 py-3 space-y-3">
                                                <Link
                                                    href={`modules/${module.id}`}
                                                    className="capitalize font-gray-800 text-lg font-bold underline">
                                                    {module.module.title}{" "}
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <ElementNotFound>
                                <h2 className="text-xl sm:text-2xl text-primary font-bold">
                                    No Cordinating Module Availble
                                </h2>
                                <p className="text-gray-text font-[500]">
                                    Sorry! You don't have any moudules to
                                    cordinate.
                                </p>
                            </ElementNotFound>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Lecturer;

export async function getServerSideProps({ params }) {
    const response = await axios.get(`/api/v1/lecturers/${params.id}`);
    const cordinatinResponse = await axios.get(
        `/api/v1/cordinating/modules/${params.id}`,
    );
    return {
        props: {
            lecturer: response.data.data,
            cordinatingModule: cordinatinResponse.data.data,
        },
    };
}
