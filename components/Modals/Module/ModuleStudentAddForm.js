import { useState } from "react";
import Button from "../../Button";
import Label from "../../Label";
import AsyncSelect from "react-select/async";
import Errors from "../../Errors";
import InputError from "../../InputError";
import makeAnimated from "react-select/animated";
import { useModule } from "../../../src/hooks/module";
const animatedCompnent = makeAnimated();
const ModuleStudentAddForm = ({ module, onClick }) => {
    console.log(module.id);
    const { addStudentModule, loading } = useModule();
    const [student, setStudent] = useState([]);
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    const studentLoadOptions = async (inputText, callback) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/stud_module/${module.id}/backend?s=${inputText}`,
        );
        const json = await response.json();
        callback(
            json.map(i => ({
                label: `${i.first_name} ${i.surname} ${
                    i.other_name ? i.other_name + " " : ""
                } (${i.index_number})`,
                value: i.id,
            })),
        );
    };

    const submitForm = event => {
        event.preventDefault();
        let students = [];
        student.forEach(itm => students.push(itm.value));
        addStudentModule({
            id: module.id,
            student: students,
            setErrors,
            setStatus,
        });
    };
    return (
        <form
            onSubmit={submitForm}
            className="-ml-2"
            encType="multipart/form-data">
            <div className="flex items-center justify-between border-b px-8 py-4 ">
                <h4 className="text-2xl font-bold text-black-text">
                    Add Student
                </h4>
                <div className="space-x-4">
                    <Button
                        onClick={onClick}
                        className="!capitalize !rounded-full !px-8"
                        danger>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="!capitalize !rounded-full !px-8"
                        loader={loading}>
                        Submit
                    </Button>
                </div>
            </div>

            <div className="pb-10">
                <div className="py-6 px-8 pr-10 space-y-5 border-b">
                    <Errors className="mb-5" errors={errors} />
                    <div className="relative">
                        <Label htmlFor="student">
                            Student <span className="lowercase">(s)</span>
                        </Label>
                        <AsyncSelect
                            isMulti
                            components={animatedCompnent}
                            cacheOptions
                            loadOptions={studentLoadOptions}
                            defaultOptions
                            className="block mt-1 w-full"
                            onChange={event => setStudent(event)}
                        />
                        {Object.keys(student).length === 0 && (
                            <input
                                tabIndex={-1}
                                autoComplete="off"
                                style={{
                                    position: "absolute",
                                    opacity: 0,
                                    width: "100%",
                                }}
                                required
                            />
                        )}
                        <InputError
                            messages={errors.student}
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ModuleStudentAddForm;
