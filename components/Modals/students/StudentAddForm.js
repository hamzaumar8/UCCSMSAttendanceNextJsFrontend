import { useState } from "react";
import Button from "../../Button";
import Input from "../../Input";
import Label from "../../Label";

const StudentAddForm = ({ onClick }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [otherName, setOtherName] = useState("");
    const [indexNumber, setIndexNumber] = useState("");
    const [level, setLevel] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [picture, setPicture] = useState("");

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
                        className="!capitalize !rounded-full !px-8">
                        Submit
                    </Button>
                </div>
            </div>

            <div className="pb-10">
                <div className="py-6 px-8 pr-10 space-y-5 border-b">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                type="text"
                                value={firstName}
                                placeholder="eg: Clecmentina"
                                className="block mt-1 w-full"
                                onChange={event =>
                                    setFirstName(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                type="text"
                                value={lastName}
                                placeholder="eg: Amponsah"
                                className="block mt-1 w-full"
                                onChange={event =>
                                    setLastName(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="otherName">Other Name(s)</Label>
                            <Input
                                id="otherName"
                                type="text"
                                value={otherName}
                                placeholder="eg: Akosua"
                                className="block mt-1 w-full"
                                onChange={event =>
                                    setOtherName(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="indexNumber">Index Number</Label>
                            <Input
                                id="indexNumber"
                                type="text"
                                value={indexNumber}
                                className="block mt-1 w-full uppercase"
                                placeholder="eg: SM/SMS/21/0001"
                                onChange={event =>
                                    setIndexNumber(event.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                placeholder="eg: name.stu.ucc.edu.gh"
                                className="block mt-1 w-full"
                                onChange={event => setEmail(event.target.value)}
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
                            <Label htmlFor="contact">Contact</Label>
                            <Input
                                id="contact"
                                type="tel"
                                value={contact}
                                placeholder="eg: +233556455567"
                                className="block mt-1 w-full"
                                onChange={event =>
                                    setContact(event.target.value)
                                }
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="py-6 px-8 pr-10 space-y-5">
                    <div className="">
                        <Label htmlFor="picture">Students's Picture</Label>
                        <Input
                            id="picture"
                            type="file"
                            value={picture}
                            className="block mt-1 w-full"
                            onChange={event => setPicture(event.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default StudentAddForm;
