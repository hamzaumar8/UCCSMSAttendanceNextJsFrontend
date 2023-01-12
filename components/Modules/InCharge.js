import Card from "../Card";

const InCharge = ({ module }) => {
    return (
        <Card
            className="border border-primary-accent"
            header={
                <h1 className="text-black-text font-extrabold capitalize">
                    In Charge
                </h1>
            }>
            <div className="space-y-4">
                {module.lecturers.map((lecturer, index) => (
                    <div className="flex space-x-5 items-center" key={index}>
                        <div className="flex items-center justify-center bg-primary-accent text-primary rounded-full text-xs w-[100px] py-1 font-bold capitalize">
                            lecturer
                        </div>
                        <h3 className="text-gray-text text-xs capitalized">
                            {lecturer.full_name}
                        </h3>
                    </div>
                ))}
                <div className="flex space-x-5 items-center">
                    <div className="flex items-center justify-center bg-primary-accent text-primary rounded-full text-xs w-[100px] py-1 font-bold capitalize">
                        Cordinator
                    </div>
                    <h3 className="text-gray-text text-xs capitalized">
                        {module.cordinator.full_name}
                    </h3>
                </div>
                <div className="flex space-x-5 items-center">
                    <div className="flex items-center justify-center bg-primary-accent text-primary rounded-full text-xs w-[100px] py-1 font-bold capitalize">
                        Course Rep
                    </div>
                    <h3 className="text-gray-text text-xs capitalized">
                        {module.course_rep.full_name}
                    </h3>
                </div>
            </div>
        </Card>
    );
};

export default InCharge;
