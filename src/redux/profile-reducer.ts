import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {photosType, postsDataType, profileType } from "../types/types";
import {ThunkAction} from "redux-thunk";
import { AppStateType } from "./redux-store";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';

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

export type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = action.newPost;
            return {
                ...state,
                postsData: [...state.postsData, {id: 6, message: newPost, likesCount: 1488}]
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                postsData: state.postsData.filter(post => post.id != action.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as profileType
            }
        default:
            return state;
    }
};
//типизация экшенов
type ActionsTypes = addPostAСType | setUserProfileType | setStatusType | deletePostType | savePhotoSuccessType;

type addPostAСType = {
    type: typeof ADD_POST,
    newPost: string
}
export const addPostAС = (newPost: string): addPostAСType => ({type: ADD_POST, newPost});
type setUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: profileType
}
export const setUserProfile = (profile: profileType): setUserProfileType => ({type: SET_USER_PROFILE, profile});
type setStatusType = {
    type: typeof SET_STATUS,
    status: string
}
export const setStatus = (status: string): setStatusType => ({type: SET_STATUS, status});
type deletePostType = {
    type: typeof DELETE_POST,
    postId: number
}
export const deletePost = (postId: number): deletePostType => ({type: DELETE_POST, postId});
type savePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: photosType
}
export const savePhotoSuccess = (photos: photosType): savePhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, photos});

//санки
type ThunkType = ThunkAction<Promise<any>, AppStateType, unknown, ActionsTypes>;

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response));
}

export const getUserStatus = (userId: number): ThunkType  => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateUserStatus = (status: string): ThunkType  => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const saveProfileUserPhoto = (file: any): ThunkType  => async (dispatch) => {
    let response = await profileAPI.saveProfilePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}


//решить вопрос с типом санки, в которой есть stopSumbit из redux-form
export const saveUserProfile = (profile: profileType)  => async (dispatch: any) => {
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(setUserProfile(profile));
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
}

export default profileReducer;