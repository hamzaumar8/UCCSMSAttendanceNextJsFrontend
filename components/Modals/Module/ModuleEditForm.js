import { useState } from "react";
import Button from "../../Button";
import Input from "../../Input";
import Label from "../../Label";
import { useModule } from "../../../src/hooks/module";
import Errors from "../../Errors";
import InputError from "../../InputError";

const ModuleEditForm = ({ onClick, module }) => {
    const { editModule, loading } = useModule();

    const [title, setTtile] = useState(module.title);
    const [code, setCode] = useState(module.code);
    const [creditHour, setCreditHour] = useState(module.credit_hour);

    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    const submitForm = event => {
        event.preventDefault();
        editModule({
            id: module.id,
            title,
            code,
            credit_hour: creditHour,
            setErrors,
            setStatus,
        });
    };

    return (
        <form onSubmit={submitForm} className="-ml-2">
            <div className="flex items-center justify-between border-b px-8 py-4 ">
                <h4 className="text-2xl font-bold text-black-text">
                    Edit Module
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
                        <span>edit</span>
                    </Button>
                </div>
            </div>

            <div className="pb-10">
                <div className="py-6 px-8 pr-10 space-y-5">
                    <Errors className="mb-5" errors={errors} />
                    <div className="">
                        <Label htmlFor="title">Module Title</Label>
                        <Input
                            id="title"
                            type="text"
                            value={title}
                            placeholder="eg: Molecular and cell basices of health and diseases I"
                            className="block mt-1 w-full"
                            onChange={event => setTtile(event.target.value)}
                            required
                        />
                        <InputError messages={errors.title} className="mt-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="">
                            <Label htmlFor="code">Code</Label>
                            <Input
                                id="code"
                                type="text"
                                value={code}
                                className="block mt-1 w-full"
                                placeholder="eg: MED203"
                                onChange={event => setCode(event.target.value)}
                                required
                            />
                            <InputError
                                messages={errors.code}
                                className="mt-2"
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="creditHour">Credit Hours</Label>
                            <Input
                                id="creditHour"
                                type="text"
                                value={creditHour}
                                className="block mt-1 w-full"
                                placeholder="eg: 3"
                                onChange={event =>
                                    setCreditHour(event.target.value)
                                }
                            />

                            <InputError
                                messages={errors.credit_hour}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ModuleEditForm;
