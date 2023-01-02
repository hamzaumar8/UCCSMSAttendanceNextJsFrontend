import { useState } from "react";
import { useLecturer } from "../../../src/hooks/lecturer";
import Button from "../../Button";
import Input from "../../Input";
import InputError from "../../InputError";
import Label from "../../Label";
import Select from "../../Select";

const LecturerEditForm = ({ onClick, lecturer }) => {
    const { editLecturer, loading } = useLecturer();
    console.log(lecturer);
    const [title, setTitle] = useState(lecturer.title);
    const [firstName, setFirstName] = useState(lecturer.first_name);
    const [surname, setSurname] = useState(lecturer.surname);
    const [otherName, setOtherName] = useState(lecturer.other_name);
    const [staffId, setStaffId] = useState(lecturer.staff_id);
    const [email, setEmail] = useState(lecturer.user.email);
    const [phone, setPhone] = useState(lecturer.phone);
    const [picture, setPicture] = useState("");
    const [previewImage, setPreviewImage] = useState(lecturer.picture);

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
        formData.append("title", title);
        formData.append("first_name", firstName);
        formData.append("surname", surname);
        formData.append("other_name", otherName);
        formData.append("staff_id", staffId);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("picture", picture);
        editLecturer({
            id: lecturer.id,
            formData,
            setErrors,
            setStatus,
        });
    };

    return (
        <form onSubmit={submitForm} className="-ml-2">
            <div className="flex items-center justify-between border-b px-8 py-4 ">
                <h4 className="text-2xl font-bold text-black-text">
                    Edit lecturer Details
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
                    <div className="grid grid-cols-2 gap-8">
                        <div className="">
                            <Label htmlFor="title">Title</Label>
                            <select
                                id="title"
                                value={title}
                                className="block mt-1 w-full placeholder:text-gray-text text-gray-700 border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={event => setTitle(event.target.value)}
                                required>
                                <option></option>
                                <option value="Prof.">Prof</option>
                                <option value="Dr.">Dr</option>
                                <option value="Rev.">Rev</option>
                                <option value="Mr.">Mr</option>
                                <option value="Mrs.">Mrs</option>
                                <option value="Miss.">Miss</option>
                            </select>
                            <InputError
                                messages={errors.title}
                                className="mt-1"
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                type="text"
                                value={firstName}
                                placeholder="eg: Clementina"
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
                            />
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
                                placeholder="eg: Agyei"
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
                            <InputError
                                messages={errors.staff_id}
                                className="mt-2"
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="phone">phone</Label>
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
                                className="mt-2"
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
                        <InputError messages={errors.email} className="mt-2" />
                    </div>
                </div>
                <div className="py-6 px-8 pr-10 space-y-5">
                    <div className="">
                        <Label htmlFor="picture">lecturer's Picture</Label>
                        <Input
                            id="picture"
                            type="file"
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

export default LecturerEditForm;
