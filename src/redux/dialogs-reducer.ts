import { dialogType, messageType } from "../types/types";
import {InferActionsTypes} from "./redux-store";


let initialState = {
    dialogs: [
        {id: 1, name: 'dialog1'},
        {id: 2, name: 'dialog2'},
        {id: 3, name: 'dialog3'},
        {id: 4, name: 'dialog4'},
        {id: 5, name: 'dialog5'},
    ] as Array<dialogType>,
    messages: [
        {id: 1, message: 'сообщение 1'},
        {id: 2, message: 'сообщение 2'},
        {id: 3, message: 'сообщение 3'},
        {id: 4, message: 'сообщение 4'},
        {id: 5, message: 'сообщение 5'},
    ] as Array<messageType>
}

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

export const dialogsReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "dialogs/ADD-MESSAGE":
            let newMessage = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: newMessage}]
            };
        default:
            return state;
    }
};

export const actions = {
    addMessageActionCreator: (newMessageBody: string) => ({type: "dialogs/ADD-MESSAGE", newMessageBody} as const)
}

export default dialogsReducer;