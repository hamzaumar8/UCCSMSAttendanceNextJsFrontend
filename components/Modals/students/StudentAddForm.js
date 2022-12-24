import { useState } from "react";
import Input from "../../Input";
import InputError from "../../InputError";
import Label from "../../Label";

const StudentAddForm = () => {
    const [name, setName] = useState("");

    return (
        <div>
            {/* Name */}
            <div>
                <Label htmlFor="name">Name</Label>

                <Input
                    id="name"
                    type="text"
                    value={name}
                    className="block mt-1 w-full"
                    onChange={event => setName(event.target.value)}
                    required
                    autoFocus
                />

                <InputError className="mt-2" />
            </div>
        </div>
    );
};

export default StudentAddForm;
