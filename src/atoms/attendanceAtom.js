import { atom } from "recoil";

export const confirmModalState = atom({
    key: "confirmModalState",
    default: false,
});

export const attendanceLecStuState = atom({
    key: "attendanceLecStuState",
    default: true,
});
