import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Button from "../../Button";
import Input from "../../Input";
import Label from "../../Label";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { useModule } from "../../../src/hooks/module";
import Errors from "../../Errors";
import InputError from "../../InputError";
import { useRecoilState } from "recoil";
import { modalEditState } from "../../../src/atoms/modalAtom";
import axios from "../../../src/lib/axios";
const animatedCompnent = makeAnimated();

const ModuleMountEditForm = ({ onClick, module }) => {
    const { editMountModule, loading } = useModule();

    const [moduleName, setModuleName] = useState({
        label: module.module.title,
        value: module.module.id,
    });
    const [startDate, setStartDate] = useState(module.start_date);
    const [endDate, setEndDate] = useState(module.end_date);
    const [level, setLevel] = useState({
        label: module.level.name,
        value: module.level.id,
    });
    const [lecturer, setLecturer] = useState(
        module.lecturers.map(lecturer => ({
            label: `${lecturer.title} ${lecturer.first_name} ${
                lecturer.other_name && lecturer.other_name + " "
            }${lecturer.surname} (${lecturer.staff_id})`,
            value: lecturer.id,
        })),
    );
    const [courseRep, setCourseRep] = useState({
        label: `${module.course_rep.full_name} (${module.course_rep.index_number})`,
        value: module.course_rep.id,
    });
    const [cordinator, setCordinator] = useState({
        label: `${module.cordinator.full_name} (${module.cordinator.staff_id})`,
        value: module.cordinator.id,
    });

    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    const submitForm = event => {
        event.preventDefault();
        let lecturers = [];
        lecturer.forEach(itm => lecturers.push(itm.value));

        editMountModule({
            id: module.id,
            module: moduleName.value,
            level: level.value,
            start_date: startDate,
            end_date: endDate,
            lecturer: lecturers,
            cordinator: cordinator.value,
            course_rep: courseRep.value,
            setErrors,
            setStatus,
        });
    };

    const levelLoadOptions = async (inputText, callback) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/lev/backend?s=${inputText}`,
        );
        const json = await response.json();
        callback(
            json.map(i => ({
                label: i.name,
                value: i.id,
            })),
        );
    };
    const loadOptions = async (inputText, callback) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/lect/backend?s=${inputText}`,
        );
        const json = await response.json();
        callback(
            json.map(i => ({
                label: `${i.title} ${i.first_name} ${
                    i.other_name && i.other_name + " "
                }${i.surname} (${i.staff_id})`,
                value: i.id,
            })),
        );
    };
    const courseRepLoadOptions = async (inputText, callback) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/stud/backend?s=${inputText}`,
        );
        const json = await response.json();
        callback(
            json.map(i => ({
                label: `${i.full_nme} ${i.surname} ${
                    i.other_name && i.other_name + " "
                } (${i.index_number})`,
                value: i.id,
            })),
        );
    };

    const moduleLoadOption = async (inputText, callback) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/mod_bank/backend?s=${inputText}`,
        );
        const json = await response.json();
        callback(
            json.map(i => ({
                label: `${i.title} (${i.code})`,
                value: i.id,
            })),
        );
    };
    return (
        <form onSubmit={submitForm} className="-ml-2">
            <div className="flex items-center justify-between border-b px-8 py-4 ">
                <h4 className="text-2xl font-bold text-black-text">
                    Edit Mounted Module
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
                        <span>Edit</span>
                    </Button>
                </div>
            </div>

            <div className="pb-10">
                <div className="py-6 px-8 pr-10 space-y-5 border-b">
                    <Errors className="mb-5" errors={errors} />
                    <div className="">
                        <Label htmlFor="moduleName">Module</Label>
                        <AsyncSelect
                            defaultValue={moduleName}
                            cacheOptions
                            loadOptions={moduleLoadOption}
                            defaultOptions
                            className="block mt-1 w-full"
                            onChange={event => setModuleName(event)}
                            required
                        />
                        <InputError messages={errors.module} className="mt-2" />
                    </div>
                    <div className="">
                        <Label htmlFor="level">Level</Label>
                        <AsyncSelect
                            defaultValue={level}
                            cacheOptions
                            loadOptions={levelLoadOptions}
                            defaultOptions
                            className="block mt-1 w-full"
                            onChange={event => setLevel(event)}
                            required
                        />
                        {level === "" && (
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
                        <InputError messages={errors.level} className="mt-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="">
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input
                                id="startDate"
                                type="date"
                                value={startDate}
                                className="block mt-1 w-full"
                                onChange={event =>
                                    setStartDate(event.target.value)
                                }
                                required
                            />
                            <InputError
                                messages={errors.start_date}
                                className="mt-2"
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="endDate">End Date</Label>
                            <Input
                                id="endDate"
                                type="date"
                                value={endDate}
                                className="block mt-1 w-full"
                                onChange={event =>
                                    setEndDate(event.target.value)
                                }
                                required
                            />
                            <InputError
                                messages={errors.end_date}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>
                <div className="py-6 px-8 pr-10 space-y-5">
                    <div className="relative">
                        <Label htmlFor="lecturer">
                            Lecturer <span className="lowercase">(s)</span>
                        </Label>
                        <AsyncSelect
                            isMulti
                            components={animatedCompnent}
                            defaultValue={lecturer}
                            cacheOptions
                            loadOptions={loadOptions}
                            defaultOptions
                            className="block mt-1 w-full"
                            onChange={event => setLecturer(event)}
                        />
                        {lecturer === 0 && (
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
                            messages={errors.lecturer}
                            className="mt-2"
                        />
                    </div>
                    <div className="relative">
                        <Label htmlFor="cordinator">Cordinator</Label>
                        <AsyncSelect
                            defaultValue={cordinator}
                            cacheOptions
                            loadOptions={loadOptions}
                            defaultOptions
                            className="block mt-1 w-full"
                            onChange={event => setCordinator(event)}
                            required
                        />
                        {cordinator === "" && (
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
                            messages={errors.cordinator}
                            className="mt-2"
                        />
                    </div>
                    <div className="relative">
                        <Label htmlFor="courseRep">Course Rep</Label>
                        <AsyncSelect
                            defaultValue={courseRep}
                            cacheOptions
                            loadOptions={courseRepLoadOptions}
                            defaultOptions
                            className="block mt-1 w-full"
                            onChange={event => setCourseRep(event)}
                            required
                        />
                        {courseRep === "" && (
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
                            messages={errors.course_rep}
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ModuleMountEditForm;
