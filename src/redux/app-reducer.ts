import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";


let initialState = {
    initialized: false
};

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>

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

/*type initializedSuccessActionType = {
    type: typeof 'app/INITIALIZED_SUCCESS'
}*/

export const actions = {
    initializedSuccess : () => ({type: 'app/INITIALIZED_SUCCESS'} as const)
}


//type ThunkType = ThunkAction<void, AppStateType, unknown, initializedSuccessActionType>;

//санка
export const initializeApp = ()/*: ThunkType */=> (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
        dispatch(actions.initializedSuccess());
    });
}

export default appReducer;