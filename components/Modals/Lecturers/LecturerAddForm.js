import { useState } from "react";
import Button from "../../Button";
import Input from "../../Input";
import Label from "../../Label";

const LecturerAddForm = ({ onClick }) => {
    const [fullName, setFullName] = useState("");
    const [title, setTitle] = useState("");
    const [staffId, setStaffId] = useState("");
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
                    Add lecturer
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
                    <div className="grid grid-cols-4 gap-2">
                        <div className="">
                            <Label htmlFor="title">Lecuturer Title</Label>
                            <Input
                                id="title"
                                type="text"
                                value={title}
                                className="block mt-1 w-full"
                                onChange={event => setTitle(event.target.value)}
                                required
                            />
                        </div>
                        <div className="col-span-3">
                            <Label htmlFor="fullName">Lecuturer Name</Label>
                            <Input
                                id="fullName"
                                type="text"
                                value={fullName}
                                placeholder="eg: Clecmentina Amponsah Agyei"
                                className="block mt-1 w-full"
                                onChange={event =>
                                    setFullName(event.target.value)
                                }
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="">
                            <Label htmlFor="staffId">Staff ID</Label>
                            <Input
                                id="staffId"
                                type="text"
                                value={staffId}
                                className="block mt-1 w-full"
                                placeholder="eg: 25309"
                                onChange={event =>
                                    setStaffId(event.target.value)
                                }
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
                </div>
                <div className="py-6 px-8 pr-10 space-y-5">
                    <div className="">
                        <Label htmlFor="picture">lecturer's Picture</Label>
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

export default LecturerAddForm;
