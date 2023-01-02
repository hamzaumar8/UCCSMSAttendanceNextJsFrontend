import { useState } from "react";
import Button from "../../Button";
import Input from "../../Input";
import Label from "../../Label";
import AsyncSelect from "react-select/async";
import { useStudent } from "../../../src/hooks/student";
import Errors from "../../Errors";
import InputError from "../../InputError";
import { levelLoadOptions } from "../../../src/lib/selectoptions";

const StudentEditForm = ({ onClick, student }) => {
    const { editStudent, loading } = useStudent();
    const [firstName, setFirstName] = useState(student.first_name);
    const [surname, setSurname] = useState(student.surname);
    const [otherName, setOtherName] = useState(student.other_name);
    const [indexNumber, setIndexNumber] = useState(student.index_number);
    const [level, setLevel] = useState({
        label: student.level.name,
        value: student.level.id,
    });
    const [email, setEmail] = useState(student.user.email);
    const [phone, setPhone] = useState(student.phone);
    const [picture, setPicture] = useState("");
    const [previewImage, setPreviewImage] = useState(student.picture);

    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    const handlePicture = event => {
        if (event.target.files && event.target.files.length) {
            setPicture(event.target.files[0]);
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const submitForm = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("_method", "PATCH");
        formData.append("first_name", firstName);
        formData.append("surname", surname);
        formData.append("other_name", otherName);
        formData.append("index_number", indexNumber);
        formData.append("email", email);
        formData.append("level", level.value);
        formData.append("phone", phone);
        formData.append("picture", picture);
        editStudent({
            id: student.id,
            formData,
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

                            <InputError
                                messages={errors.first_name}
                                className="mt-1"
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="surname">Last Name</Label>
                            <Input
                                id="surname"
                                type="text"
                                value={surname}
                                placeholder="eg: Amponsah"
                                className="block mt-1 w-full"
                                onChange={event =>
                                    setSurname(event.target.value)
                                }
                                required
                            />{" "}
                            <InputError
                                messages={errors.surname}
                                className="mt-1"
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
                            />
                            <InputError
                                messages={errors.other_name}
                                className="mt-1"
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
                            <InputError
                                messages={errors.index_number}
                                className="mt-1"
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
                            <InputError
                                messages={errors.email}
                                className="mt-1"
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="level">Level (Class)</Label>
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
                            <InputError
                                messages={errors.level}
                                className="mt-1"
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={phone}
                                placeholder="eg: +233556455567"
                                className="block mt-1 w-full"
                                onChange={event => setPhone(event.target.value)}
                            />
                            <InputError
                                messages={errors.phone}
                                className="mt-1"
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
                            accept="image/*"
                            // value={picture}
                            className="block mt-1 w-full"
                            onChange={handlePicture}
                        />
                        {previewImage && (
                            <img
                                src={previewImage}
                                className="mt-1 object-cover w-[100px] h-[100px]"
                            />
                        )}
                        <InputError
                            messages={errors.picture}
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default StudentEditForm;
