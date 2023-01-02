import Link from "next/link";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";

const CordinatingModuleCard = ({ result }) => {
    return (
        <div className="bg-primary-accent rounded-lg block transition ease-in-out duration-300 relative">
            <div className="border-b border-[#00000029] flex items-center justify-between p-4 pb-2">
                <h2 className="uppercase font-bold text-sm">
                    {result.module.module.code}
                </h2>

                <Link
                    href={`/results/${result.id}`}
                    className="inline-flex items-center justify-center px-6 py-2 rounded-full font-semibold text-xs capitalize tracking-widest bg-primary text-white">
                    View Results
                </Link>
            </div>
            <div className="px-4 py-3 space-y-3">
                <h1 className="capitalize font-gray-800 text-xl flex items-center font-bold">
                    <DocumentDuplicateIcon className="h-5 w-5 inline-block mr-1" />
                    {result.module.module.title}
                </h1>
            </div>
        </div>
    );
};

export default CordinatingModuleCard;
