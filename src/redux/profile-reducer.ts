import {ResultCodeEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {photosType, postsDataType, profileType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import { profileAPI } from "../api/profile-api";

let initialState = {
    postsData: [
        {id: 1, message: 'message 1', likesCount: 10},
        {id: 2, message: 'message 2', likesCount: 11},
        {id: 3, message: 'message 3', likesCount: 14},
        {id: 4, message: 'message 4', likesCount: 111},
        {id: 5, message: 'message 5', likesCount: 112},
    ] as Array<postsDataType>,
    profile: null as profileType | null,
    status: ""
};



const profileReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "profile/ADD-POST":
            let newPost = action.newPost;
            return {
                ...state,
                postsData: [...state.postsData, {id: 6, message: newPost, likesCount: 1488}]
            }
        case "profile/SET_USER_PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "profile/SET_STATUS":
            return {
                ...state,
                status: action.status
            }
        case "profile/DELETE_POST":
            return {
                ...state,
                postsData: state.postsData.filter(post => post.id != action.postId)
            }
        case "profile/SAVE_PHOTO_SUCCESS":
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as profileType
            }
        default:
            return state;
    }
};

export const actions = {
    addPostAС: (newPost: string) => ({type: 'profile/ADD-POST', newPost} as const),
    setUserProfile: (profile: profileType) => ({type: 'profile/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'profile/SET_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'profile/DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: photosType) => ({type: 'profile/SAVE_PHOTO_SUCCESS', photos} as const)
}

//санки
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let userData = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(userData));
}

export const getUserStatus = (userId: number): ThunkType  => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(response));
}

export const updateUserStatus = (status: string): ThunkType  => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setStatus(status));
    }
}

export const saveProfileUserPhoto = (file: File): ThunkType  => async (dispatch) => {
    let photoData = await profileAPI.saveProfilePhoto(file)
    if (photoData.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.savePhotoSuccess(photoData.data.photos));
    }
}

export const saveUserProfile = (profile: profileType): ThunkType  => async (dispatch) => {
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setUserProfile(profile));
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
}

export default profileReducer;

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;