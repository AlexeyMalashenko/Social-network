import axios, {AxiosResponse} from "axios";
import {photosType, profileType} from "../types/types";

const instance = axios.create({
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

type GetUsersType = {
    items: [
        {
            name: string
            id: number
            photos: {
                small: string
                large: string
            }
            status: string,
            followed: boolean
        }
    ]
    totalCount: number
    error: string
}
export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    }
};

type SetDeleteFollowType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}
export const followAPI = {
    setFollow(userId: number) {
        return instance.post<SetDeleteFollowType>(`follow/${userId}`)
            .then(response => response.data);
    },
    setUnfollow(userId: number) {
        return instance.delete<SetDeleteFollowType>(`follow/${userId}`)
            .then(response => response.data);
    }
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>

}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum
    messages: Array<string>

}
type LogoutResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}
export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(response => response.data);
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete<LogoutResponseType>(`auth/login`)
            .then(response => response.data);
    }
};

type UpdateStatusResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}
type SaveProfilePhotoResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {
        photos: photosType
    }
}
type SaveProfileResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {}
}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<profileType>(`profile/${userId}`)
            .then(response => response.data);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
            .then(response => response.data);
    },
    updateStatus(status: string) {
        return instance.put<UpdateStatusResponseType>(`profile/status`, {status: status});
    },
    saveProfilePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put<SaveProfilePhotoResponseType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },
    saveProfile(profile: profileType) {
        return instance.put<SaveProfileResponseType>(`profile`, profile);
    }
};

type SecurityAPIResponseType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<SecurityAPIResponseType>(`security/get-captcha-url`)
            .then(response => response.data)
    }
};
