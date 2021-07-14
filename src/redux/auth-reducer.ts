import {ResultCodeEnum, ResultCodeForCaptchaEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {InferActionsTypes, BaseThunkType} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityApi} from "../api/security-api";
import { Action } from "redux";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>

const authReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'auth/SET_USER_DATA':
        case 'auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'auth/SET_USER_DATA', payload: {userId, email, login, isAuth}
    } as const),
    setCaptchaUrl: (captchaUrl: string) => ({
        type: 'auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}
    } as const)
}

type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>;

//санки
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me();

    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: null | string): ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha);

    if (loginData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptcha());
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    let logoutData = await authAPI.logout()
    if (logoutData.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export const getCaptcha = (): ThunkType => async (dispatch) => {
    let CaptchaUrlData = await securityApi.getCaptchaUrl()
    const captchaUrl = CaptchaUrlData.url;
    dispatch(actions.setCaptchaUrl(captchaUrl));
}

export default authReducer;