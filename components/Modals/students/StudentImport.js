import { useState } from "react";
import { useLecturer } from "../../../src/hooks/lecturer";
import Button from "../../Button";
import Input from "../../Input";
import InputError from "../../InputError";
import Label from "../../Label";
import Select from "../../Select";

const StudentImport = ({ onClick }) => {
    const { importLecturer, loading } = useLecturer();

    const [file, setFile] = useState("");
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    const handleFile = event => {
        if (event.target.files && event.target.files.length) {
            setFile(event.target.files[0]);
        }
    };

    const handleSampleDownload = event => {
        event.preventDefault();
        // using Java Script method to get PDF file
        fetch("StudentsSample.csv").then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement("a");
                alink.href = fileURL;
                alink.download = "StudentsSample.csv";
                alink.click();
            });
        });
    };

    const submitForm = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        importLecturer({
            formData,
            setErrors,
            setStatus,
        });
    };

    return (
        <form
            onSubmit={submitForm}
            className="-ml-2"
            accept-charset="UTF-8"
            enctype="multipart/form-data">
            <div className="flex items-center justify-between border-b px-8 py-4 ">
                <h4 className="text-2xl font-bold text-black-text">
                    Import Student (CSV)
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
                <div className="py-4 px-8 pr-10 space-y-5">
                    <div className="flex items-center justify-between">
                        <p>Sample CSV file </p>
                        <button
                            type="button"
                            onClick={handleSampleDownload}
                            className="bg-primary-accent text-primary py-2 px-6 text-sm rounded-md">
                            Download
                        </button>
                    </div>
                </div>
                <div className="py-6 px-8 pr-10 space-y-5">
                    <div className="">
                        <Label htmlFor="file">CSV File</Label>
                        <Input
                            id="file"
                            type="file"
                            className="block mt-1 w-full"
                            onChange={handleFile}
                            required
                        />
                        <InputError messages={errors.file} className="mt-2" />
                    </div>
                    {loading && (
                        <div className="mt-2 text-center">
                            Uploading file data. Kindly wait ...
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
};

export default StudentImport;
