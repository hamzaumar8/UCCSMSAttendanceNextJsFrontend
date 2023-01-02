import { CameraIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRef, useState } from "react";
import { useAuth } from "../../src/hooks/auth";
import { useLecturer } from "../../src/hooks/lecturer";
import Button from "../Button";
import Card from "../Card";
import Input from "../Input";
import InputError from "../InputError";
import Label from "../Label";

const Profile = () => {
    const defaultImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/img/lecturers/default.png`;
    const { user } = useAuth();

    const { editLecturer, loading } = useLecturer();

    const [title, setTitle] = useState(user.lecturer.title);
    const [firstName, setFirstName] = useState(user.lecturer.first_name);
    const [surname, setSurname] = useState(user.lecturer.surname);
    const [otherName, setOtherName] = useState(user.lecturer.other_name);
    const [email, setEmail] = useState(user.email);
    const [picture, setPicture] = useState(user.lecturer.picture);
    const [staffId, setStaffId] = useState(user.lecturer.staff_id);
    const [phone, setPhone] = useState(user.lecturer.phone);
    const pictureRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);

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
        formData.append("id", user.lecturer.id);
        editLecturer({
            id: user.lecturer.id,
            formData,
            setErrors,
            setStatus,
        });
    };
    return (
        <form onSubmit={submitForm}>
            <Card
                header={<h1 className="text-xl font-extrabold">Profile</h1>}
                button={
                    <Button
                        loader={loading}
                        className="!rounded-full !px-6"
                        type="submit">
                        update
                    </Button>
                }>
                <div className="grid grid-cols-3 gap-20 px-5">
                    <div>
                        <div className="relative flex items-start justify-center py-6">
                            <div className="relative border border-primary rounded-lg  p-1 min-w-40">
                                <Image
                                    alt={user.lecturer.full_name}
                                    src={
                                        previewImage !== null
                                            ? previewImage
                                            : picture ?? defaultImg
                                    }
                                    priority
                                    height={100}
                                    width={100}
                                    className="rounded-lg object-cover w-full"
                                />
                                <div
                                    className="absolute flex items-center justify-center -top-5 -right-5 w-10 h-10 bg-primary rounded-full border border-primary-accent text-white cursor-pointer"
                                    onClick={() => pictureRef.current.click()}>
                                    <input
                                        id="picture"
                                        type="file"
                                        className="hidden"
                                        ref={pictureRef}
                                        onChange={handlePicture}
                                    />
                                    <CameraIcon className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                        <InputError
                            messages={errors.picture}
                            className="mt-2 text-center"
                        />
                    </div>

                    <div className="col-span-2 space-y-8">
                        <div className="grid grid-cols-2 gap-10">
                            <div className="">
                                <Label htmlFor="staffId">Staff ID</Label>
                                <Input
                                    id="staffId"
                                    type="text"
                                    value={staffId}
                                    placeholder="eg: Clementina"
                                    className="block mt-1 w-full bg-primary-accent border-0 !text-black-text"
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
                                <Label htmlFor="title">Title</Label>
                                <select
                                    id="title"
                                    value={title}
                                    className="block mt-1 w-full placeholder:text-gray-text text-gray-700 border-0 bg-primary-accent focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    onChange={event =>
                                        setTitle(event.target.value)
                                    }
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
                                    className="block mt-1 w-full bg-primary-accent border-0 !text-black-text"
                                    onChange={event =>
                                        setFirstName(event.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    messages={errors.first_name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="">
                                <Label htmlFor="surname">Surname</Label>
                                <Input
                                    id="surname"
                                    type="text"
                                    value={surname}
                                    placeholder="eg: Clementina"
                                    className="block mt-1 w-full bg-primary-accent border-0 !text-black-text"
                                    onChange={event =>
                                        setSurname(event.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    messages={errors.surname}
                                    className="mt-2"
                                />
                            </div>
                            <div className="">
                                <Label htmlFor="otherName">
                                    Other Name (s)
                                </Label>
                                <Input
                                    id="otherName"
                                    type="text"
                                    value={otherName}
                                    placeholder="eg: Clementina"
                                    className="block mt-1 w-full bg-primary-accent border-0 !text-black-text"
                                    onChange={event =>
                                        setOtherName(event.target.value)
                                    }
                                />
                                <InputError
                                    messages={errors.other_name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="text"
                                    value={phone}
                                    placeholder="eg: Clementina"
                                    className="block mt-1 w-full bg-primary-accent border-0 !text-black-text"
                                    onChange={event =>
                                        setPhone(event.target.value)
                                    }
                                />
                                <InputError
                                    messages={errors.phone}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="text"
                                value={email}
                                placeholder="eg: Clementina"
                                className="block mt-1 w-full bg-primary-accent border-0 !text-black-text"
                                onChange={event => setEmail(event.target.value)}
                                required
                            />
                            <InputError
                                messages={errors.email}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </form>
    );
};

export default Profile;
