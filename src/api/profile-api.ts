import {photosType, profileType} from "../types/types";
import {instance, ResultCodeEnum, ResponseType} from "./api";

type SaveProfilePhotoResponseType = {
        photos: photosType
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
        return instance.put<ResponseType>(`profile/status`, {status: status});
    },
    saveProfilePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put<ResponseType<SaveProfilePhotoResponseType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },
    saveProfile(profile: profileType) {
        return instance.put<ResponseType>(`profile`, profile);
    }
};