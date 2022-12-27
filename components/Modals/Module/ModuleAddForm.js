import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Button from "../../Button";
import Input from "../../Input";
import Label from "../../Label";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { useModule } from "../../../src/hooks/module";
import Errors from "../../Errors";
import InputError from "../../InputError";
const animatedCompnent = makeAnimated();

const ModuleAddForm = ({ onClick }) => {
    const { mountModule, loading } = useModule();

    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [level, setLevel] = useState("");
    const [startDate, setStartDate] = useState("");
    const [duration, setDuration] = useState(1);
    const [lecturer, setLecturer] = useState([]);
    const [cordinator, setCordinator] = useState("");
    const [courseRep, setCourseRep] = useState("");

    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    const submitForm = event => {
        event.preventDefault();
        let lecturers = [];
        lecturer.forEach(itm => lecturers.push(itm.value));
        mountModule({
            title: name,
            code,
            level,
            start_date: startDate,
            duration,
            lecturer: JSON.stringify(lecturers),
            cordinator,
            course_rep: courseRep,
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
                label:
                    i.other_name != null
                        ? `${i.title} ${i.first_name} ${i.other_name} ${i.last_name} (${i.staff_id})`
                        : `${i.title} ${i.first_name} ${i.last_name} (${i.staff_id})`,
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
                label:
                    i.other_name != null
                        ? `${i.first_name} ${i.last_name} ${i.other_name} (${i.index_number})`
                        : `${i.first_name} ${i.last_name} (${i.index_number})`,
                value: i.id,
            })),
        );
    };

    return (
        <form onSubmit={submitForm} className="-ml-2">
            <div className="flex items-center justify-between border-b px-8 py-4 ">
                <h4 className="text-2xl font-bold text-black-text">
                    New Module
                </h4>
                <div className="space-x-4">
                    <Button
                        onClick={onClick}
                        className="!rounded-full !px-8"
                        danger>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="!rounded-full !px-8"
                        loader={loading}>
                        <span>Mount</span>
                    </Button>
                </div>
            </div>

            <div className="pb-10">
                <div className="py-6 px-8 pr-10 space-y-5 border-b">
                    <Errors className="mb-5" errors={errors} />
                    <div className="">
                        <Label htmlFor="name">Module Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            placeholder="eg: Molecular and cell basices of health and diseases I"
                            className="block mt-1 w-full"
                            onChange={event => setName(event.target.value)}
                            required
                        />
                        <InputError messages={errors.title} className="mt-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="">
                            <Label htmlFor="code">Module Code</Label>
                            <Input
                                id="code"
                                type="text"
                                value={code}
                                className="block mt-1 w-full uppercase"
                                placeholder="MED 203"
                                onChange={event => setCode(event.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="level">Class</Label>
                            <AsyncSelect
                                cacheOptions
                                loadOptions={levelLoadOptions}
                                defaultOptions
                                className="block mt-1 w-full"
                                onChange={event => setLevel(event.value)}
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
                        </div>
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
                        </div>
                        <div className="">
                            <Label htmlFor="duration">Duration</Label>
                            <div className="flex items-center space-x-4 mt-1">
                                <Button
                                    className="!inline !rounded-full !px-4 !p-2"
                                    onClick={e => {
                                        e.preventDefault();
                                        duration > 1 &&
                                            setDuration(duration - 1);
                                    }}>
                                    <MinusIcon className="h-4 w-4" />
                                </Button>
                                <div className="w-full border py-2 px-3">
                                    <span>{duration}</span>{" "}
                                    <span>
                                        {duration > 1 ? "Weeks" : "Week"}
                                    </span>
                                </div>
                                <Button
                                    className="!inline !rounded-full !px-4 !p-2"
                                    onClick={e => {
                                        e.preventDefault();
                                        setDuration(duration + 1);
                                    }}>
                                    <PlusIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-6 px-8 pr-10 space-y-5">
                    <div className="relative">
                        <Label htmlFor="lecturer">Lecturer</Label>
                        <AsyncSelect
                            isMulti
                            components={animatedCompnent}
                            cacheOptions
                            loadOptions={loadOptions}
                            defaultOptions
                            className="block mt-1 w-full"
                            onChange={event => setLecturer(event)}
                        />
                        {Object.keys(lecturer).length === 0 && (
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
                    </div>
                    <div className="relative">
                        <Label htmlFor="cordinator">Cordinator</Label>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={loadOptions}
                            defaultOptions
                            className="block mt-1 w-full"
                            onChange={event => setCordinator(event.value)}
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
                    </div>
                    <div className="relative">
                        <Label htmlFor="courseRep">Course Rep</Label>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={courseRepLoadOptions}
                            defaultOptions
                            className="block mt-1 w-full"
                            onChange={event => setCourseRep(event.value)}
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
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ModuleAddForm;

// theme={theme => ({
//     ...theme,
//     borderRadius: 0,
//     colors: {
//         ...theme.colors,
//         primary25: "green",
//         primary: "black",
//         // neutral0: "#c8c8c8",
//         neutral90: "white",
//     },
// })}
