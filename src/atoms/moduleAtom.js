import { atom } from "recoil";

export const handleModuleBankState = atom({
    key: "handleModuleBankState",
    default: false,
});

export const useSSRModuleBankState = atom({
    key: "useSSRModuleBankState",
    default: true,
});

export const getModuleBankState = atom({
    key: "getModuleBankState",
    default: {},
});
