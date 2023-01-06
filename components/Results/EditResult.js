import { ArrowUpTrayIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Button from "../../../components/Button";
import HeadTitle from "../../../components/HeadTitle";
import InputError from "../../../components/InputError";
import AppLayout from "../../../components/Layouts/AppLayout";
import SemesterTag from "../../../components/SemesterTag";
import {
    handleResultState,
    useSSRResultState,
} from "../../../src/atoms/resultAtom";
import { useResult } from "../../../src/hooks/result";
import axios from "../../../src/lib/axios";

const EditResult = ({ result }) => {
    const { editResult, loading } = useResult();
    const [scores, setScores] = useState(result.assessments);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        let temp = [...scores];
        temp[index].score = value;
        setScores(temp);
    };

    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    const submitForm = event => {
        event.preventDefault();
        result.status = "submit";
        editResult({
            result,
            setErrors,
            setStatus,
        });
    };

    const saveForm = event => {
        event.preventDefault();
        result.status = "save";
        editResult({
            result,
            setErrors,
            setStatus,
        });
    };

    return (
        <>
            {scores.map((assessment, index) => {
                const err = errors.includes(`assessments.${index}.score`);
                return (
                    <tr className="" key={index}>
                        <td className="capitalize p-5 whitespace-nowrap border-b">
                            <span>
                                <div>{index + 1}.</div>
                            </span>
                        </td>
                        <td className="capitalize p-5 whitespace-nowrap border-b">
                            <span>
                                <div>{assessment.student.index_number}</div>
                            </span>
                        </td>
                        <td className="capitalize p-5 whitespace-nowrap border-b">
                            <span>
                                <div>{assessment.student.full_name}</div>
                            </span>
                        </td>
                        <td className="capitalize p-5 whitespace-nowrap text-center border-b">
                            <span>
                                <div>
                                    <input
                                        className={`${
                                            err
                                                ? "border-red-500 text-danger"
                                                : "border-gray-200 text-gray-text"
                                        } border-2  text-center p-2  font-bold w-20 rounded-lg`}
                                        name={`score.${index}`}
                                        onChange={e => handleChange(e, index)}
                                        value={assessment.score}
                                    />
                                    <InputError className="mt-2" />
                                </div>
                            </span>
                        </td>
                        <td className="capitalize py-5  border-b">
                            <div>
                                {assessment.remarks === "honour" && (
                                    <span className="bg-secondary-accent text-green-600 font-bold block text-center w-[130px] px-6 py-2 rounded-full text-xs">
                                        Honour
                                    </span>
                                )}
                                {assessment.remarks === "pass" && (
                                    <span className="bg-primary-accent text-primary font-bold block text-center w-[130px] px-6 py-2 rounded-full text-xs">
                                        Pass
                                    </span>
                                )}
                                {assessment.remarks === "fail" && (
                                    <span className="bg-red-200 text-danger font-bold block text-center w-[130px] px-6 py-2 rounded-full text-xs">
                                        Fail
                                    </span>
                                )}
                                {assessment.remarks === "ic" && (
                                    <span className="bg-red-300 text-white font-bold block text-center w-[130px] px-6 py-2 rounded-full text-xs">
                                        Incomplete
                                    </span>
                                )}
                            </div>
                        </td>
                    </tr>
                );
            })}
        </>
    );
};

export default EditResult;
