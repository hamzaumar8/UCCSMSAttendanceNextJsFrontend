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

export const handleModuleMountState = atom({
    key: "handleModuleMountState",
    default: false,
});

export const useSSRModuleMountState = atom({
    key: "useSSRModuleMountState",
    default: true,
});

export const getModuleMountState = atom({
    key: "getModuleBankState",
    default: {},
});
