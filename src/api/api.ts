import axios, {AxiosResponse} from "axios";
import {profileType} from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "46fb8b54-104d-4722-908d-101fea714c32"
    }
});


export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}


export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    }
};

export const followAPI = {
    setFollow(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data);
    },
    setUnfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
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

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(response => response.data);
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha});
    },
    logout() {
        return instance.delete(`auth/login`);
    }
};

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status});
    },
    saveProfilePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile: profileType) {
        return instance.put(`profile`, profile);
    }
};

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
};

//instance.get<string>(`auth/me`).then((res) => res.data)