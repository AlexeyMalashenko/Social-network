import axios from "axios";
import { userType } from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "46fb8b54-104d-4722-908d-101fea714c32"
    }
});

//server response result code constant
export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<userType>
    totalCount: number
    error: string | null
}

export type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
