import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Button from "../../Button";
import Input from "../../Input";
import Label from "../../Label";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { useModule } from "../../../src/hooks/module";
import InputError from "../../InputError";
import {
    courseRepLoadOptions,
    lecturerLoadOptions,
    levelLoadOptions,
    moduleLoadOption,
} from "../../../src/lib/selectoptions";
const animatedCompnent = makeAnimated();

const ModuleMountForm = ({ onClick }) => {
    const { mountModule, loading } = useModule();

    const [module, setModule] = useState("");
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
            module: module,
            level,
            start_date: startDate,
            duration,
            lecturer: lecturers,
            cordinator,
            course_rep: courseRep,
            setErrors,
            setStatus,
        });
    };

    return (
        <form onSubmit={submitForm} className="-ml-2">
            <div className="flex items-center justify-between border-b px-8 py-4 ">
                <h4 className="text-2xl font-bold text-black-text">
                    Mount Module
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
                        <span>Mount</span>
                    </Button>
                </div>
            </div>

            <div className="pb-10">
                <div className="py-6 px-8 pr-10 space-y-5 border-b">
                    {errors.msg && (
                        <p className="text-sm text-red-600 bg-red-100 p-1">
                            {errors.msg}
                        </p>
                    )}
                    <div className="">
                        <Label htmlFor="module">Module</Label>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={moduleLoadOption}
                            defaultOptions
                            className="block mt-1 w-full"
                            onChange={event => setModule(event.value)}
                            required
                        />
                        {module === "" && (
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
                        <InputError messages={errors.module} className="mt-2" />
                    </div>
                    <div className="">
                        <Label htmlFor="level">Level</Label>
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
                            <InputError
                                messages={errors.duration}
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
                            cacheOptions
                            loadOptions={lecturerLoadOptions}
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
                        <InputError
                            messages={errors.lecturer}
                            className="mt-2"
                        />
                    </div>
                    <div className="relative">
                        <Label htmlFor="cordinator">Cordinator</Label>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={lecturerLoadOptions}
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
                        <InputError
                            messages={errors.cordinator}
                            className="mt-2"
                        />
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

export default ModuleMountForm;
