import {getAuthUserData} from "./auth-reducer";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {FormAction} from "redux-form";


let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "app/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
};

export const actions = {
    initializedSuccess : () => ({type: 'app/INITIALIZED_SUCCESS'} as const)
}

//санка
export const initializeApp = (): ThunkType => async (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
        dispatch(actions.initializedSuccess());
    });
}

export default appReducer;

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
