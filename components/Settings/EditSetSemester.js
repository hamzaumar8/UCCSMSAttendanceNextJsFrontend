import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useSemester } from "../../src/hooks/semester";
import Button from "../Button";
import Card from "../Card";
import Input from "../Input";
import InputError from "../InputError";
import Label from "../Label";

const EditSetSemester = ({ currentSemester }) => {
    const { editSemester, loading } = useSemester();

    const [semesterName, setSemesterName] = useState(currentSemester.semester);
    const [academicYear, setAcademicYear] = useState(
        currentSemester.academic_year,
    );
    const [startDate, setStartDate] = useState(currentSemester.start_date);
    const [endDate, setEndDate] = useState(currentSemester.end_date);
    const [assessmentStatus, setAssessmentStatus] = useState(
        currentSemester.assessment_status,
    );

    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    var year = new Date().getFullYear();
    var lastyear = new Date().getFullYear() - 1;
    var range = [];
    var lastrange = [];
    var academic_year = [];
    lastrange.push(lastyear);
    range.push(year);
    for (var i = 1; i < 7; i++) {
        lastrange.push(lastyear + i);
        range.push(year + i);
        academic_year.push(lastrange[i - 1] + "-" + lastrange[i]);
        var fullyear = lastrange.concat(range);
    }

    const submitForm = event => {
        event.preventDefault();
        editSemester({
            id: currentSemester.id,
            semester_name: semesterName,
            academic_year: academicYear,
            start_date: startDate,
            end_date: endDate,
            setErrors,
            setStatus,
        });
    };
    return (
        <form onSubmit={submitForm}>
            <Card
                header={
                    <h1 className="flex text-gray-text space-x-2 items-center uppercase text-sm font-semibold">
                        <CalendarDaysIcon className="h-5 w-5" />
                        <span>Set Semester</span>
                    </h1>
                }
                button={
                    <Button
                        type="submit"
                        loader={loading}
                        className="!rounded-full px-6">
                        update
                    </Button>
                }>
                <div className="mr-16 space-y-4">
                    <div className="">
                        <Label htmlFor="semesterName">Semester</Label>
                        <select
                            id="semesterName"
                            value={semesterName}
                            className="block mt-1 w-full placeholder:text-gray-text text-gray-700 border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={event =>
                                setSemesterName(event.target.value)
                            }
                            required>
                            <option></option>
                            <option value="first">First</option>
                            <option value="second">Second</option>
                        </select>

                        <InputError
                            messages={errors.semesterName}
                            className="mt-1"
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="academicYear">academicYear</Label>
                        <select
                            id="academicYear"
                            value={academicYear}
                            className="block mt-1 w-full placeholder:text-gray-text text-gray-700 border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={event =>
                                setAcademicYear(event.target.value)
                            }
                            required>
                            <option>{academicYear}</option>
                            {academic_year.map((ac_year, index) => (
                                <option key={index} value={ac_year}>
                                    {ac_year}
                                </option>
                            ))}
                        </select>
                        <InputError messages={errors.title} className="mt-1" />
                    </div>
                    <div className="">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                            id="startDate"
                            type="date"
                            value={startDate}
                            className="block mt-1 w-full"
                            onChange={event => setStartDate(event.target.value)}
                            required
                        />
                        <InputError
                            messages={errors.startDate}
                            className="mt-1"
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                            id="endDate"
                            type="date"
                            value={endDate}
                            className="block mt-1 w-full"
                            onChange={event => setEndDate(event.target.value)}
                            required
                        />
                        <InputError
                            messages={errors.endDate}
                            className="mt-1"
                        />
                    </div>
                </div>
            </Card>
        </form>
    );
};

export default EditSetSemester;
