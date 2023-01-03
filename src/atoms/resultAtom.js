import { atom } from "recoil";

export const handleResultState = atom({
    key: "handleResultState",
    default: false,
});

export const useSSRResultState = atom({
    key: "useSSRResultState",
    default: true,
});
