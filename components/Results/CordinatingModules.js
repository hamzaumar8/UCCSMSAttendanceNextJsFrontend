import CordinatingModuleCard from "../Cards/CordinatingModuleCard";

const CordinatingModules = ({ cordinatingModules }) => {
    return (
        <div className="grid grid-cols-3 p-6 gap-8">
            {cordinatingModules.map((result, index) => (
                <CordinatingModuleCard key={index} result={result} />
            ))}
        </div>
    );
};

export default CordinatingModules;
