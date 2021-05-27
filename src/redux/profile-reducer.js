import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    postsData: [
        {id: 1, message: 'message 1', likesCount: 10},
        {id: 2, message: 'message 2', likesCount: 11},
        {id: 3, message: 'message 3', likesCount: 14},
        {id: 4, message: 'message 4', likesCount: 111},
        {id: 5, message: 'message 5', likesCount: 112},
    ],
    postText: '',
    profile: null,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = state.postText;
            return {
                ...state,
                postText: '',
                postsData: [...state.postsData, {id: 6, message: newPost, likesCount: 1488}]
            }
        case UPDATE_POST_TEXT:
            return {
                ...state,
                postText: action.postText
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state;
    }
};

export const addPostActionCreator = () => ({type: ADD_POST});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const updatePostTextActionCreator = (text) => ({
    type: UPDATE_POST_TEXT,
    postText: text
});
//санки
export const getUserProfile = (userId) => {
    return (dispatch) => {
        if (!userId) {
            userId = 2;
        }
        profileAPI.authUserData(userId)
            .then(data => {
                dispatch(setUserProfile(data));
            });
    }
}

export default profileReducer;