import {stopSubmit} from "redux-form";
import {InferActionsTypes, BaseThunkType} from "./redux-store";
import {chatApi, ChatMessageApiType, StatusType} from "../api/chat-api";
import {Dispatch} from "redux";

//либа uuid для генерации уникальных кеев для эффективной перерисовки реакт виртуал дома
import {v1} from 'uuid';
type ChatMessageType = ChatMessageApiType & { id: string }

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
};

const ChatReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "chat/MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
                    .filter((m, index, array) => index >= array.length - 100
                    )
            }
        case "chat/STATUS_CHANGED":
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state;
    }
};

export const actions = {
    messagesReceived: (messages: ChatMessageApiType[]) => ({
        type: 'chat/MESSAGES_RECEIVED', payload: {messages}
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'chat/STATUS_CHANGED', payload: {status}
    } as const)
}

//мемо
let _newMessageHandler: ((messages: ChatMessageApiType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

let _newMessageStatusChangedHandler: ((messages: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageStatusChangedHandler === null) {
        _newMessageStatusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }

    return _newMessageStatusChangedHandler
}

//санки
export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.start()
    chatApi.subscribe("messages-received", newMessageHandlerCreator(dispatch))
    chatApi.subscribe("status-changed", statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.stop()
    chatApi.unsubscribe("messages-received", newMessageHandlerCreator(dispatch))
    chatApi.unsubscribe("status-changed", statusChangedHandlerCreator(dispatch))
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatApi.sendMessage(message)
}

export default ChatReducer;

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>;