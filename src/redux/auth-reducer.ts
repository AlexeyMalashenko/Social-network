import {authAPI as authApi, ResultCodeEnum, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};

export type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

type setAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean | null
}
type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: setAuthUserDataActionPayloadType
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({
    type: SET_USER_DATA, payload: {userId, email, login, isAuth}
});

type setCaptchaUrlActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: string }
}
export const setCaptchaUrl = (captchaUrl: string): setCaptchaUrlActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
});

//общий тип экшенов
type ActionsTypes = setAuthUserDataActionType | setCaptchaUrlActionType;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

//санки
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authApi.me();

    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}
//решить вопрос с типом санки, в которой есть stopSumbit из redux-form
export const login = (email: string, password: string, rememberMe: boolean, captcha: null | string) => async (dispatch: any) => {
    let loginData = await authApi.login(email, password, rememberMe, captcha);

    if (loginData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        if (loginData.resultCode === ResultCodeEnum.CaptchaIsRequired) {
            dispatch(getCaptcha());
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}

export const logout = (): ThunkType  => async (dispatch) => {
    let response = await authApi.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptcha = (): ThunkType  => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url;
    dispatch(setCaptchaUrl(captchaUrl));
}

export default authReducer;