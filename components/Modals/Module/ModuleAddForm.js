import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Button from "../../Button";
import Input from "../../Input";
import Label from "../../Label";

const ModuleAddForm = ({ onClick }) => {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [level, setLevel] = useState("");
    const [startDate, setStartDate] = useState("");
    const [duration, setDuration] = useState(1);
    const [lecturer, setLecturer] = useState("");
    const [cordinator, setCordinator] = useState("");
    const [courseRep, setCourseRep] = useState("");

    const submitForm = event => {
        event.preventDefault();
        //  addAttendance({
        //      lecturer_id: currentLecturer.id,
        //      module_id: moduleValue,
        //      date: now,
        //      start_time: checkInTime,
        //      end_time: checkOutTime,
        //      setErrors,
        //      setStatus,
        //  });
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
                    <Button type="submit" className="!rounded-full !px-8">
                        Mount
                    </Button>
                </div>
            </div>

            <div className="pb-10">
                <div className="py-6 px-8 pr-10 space-y-5 border-b">
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
                            <Input
                                id="level"
                                type="text"
                                value={level}
                                className="block mt-1 w-full"
                                onChange={event => setLevel(event.target.value)}
                                required
                            />
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
                    <div className="">
                        <Label htmlFor="lecturer">Lecturer</Label>
                        <Input
                            id="lecturer"
                            type="text"
                            value={lecturer}
                            className="block mt-1 w-full"
                            onChange={event => setLecturer(event.target.value)}
                            required
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="cordinator">Cordinator</Label>
                        <Input
                            id="cordinator"
                            type="text"
                            value={cordinator}
                            className="block mt-1 w-full uppercase"
                            placeholder="MED 203"
                            onChange={event =>
                                setCordinator(event.target.value)
                            }
                            required
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="courseRep">Course Rep</Label>
                        <Input
                            id="courseRep"
                            type="text"
                            value={courseRep}
                            className="block mt-1 w-full"
                            onChange={event => setCourseRep(event.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ModuleAddForm;
