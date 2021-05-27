import {dialogsReducer} from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

let store = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, message: 'message 1', likesCount: 10},
                {id: 2, message: 'message 2', likesCount: 11},
                {id: 3, message: 'message 3', likesCount: 14},
                {id: 4, message: 'message 4', likesCount: 111},
                {id: 5, message: 'message 5', likesCount: 112},
            ],
            postText: ''
        },
        messagesPage: {
            dialogs: [
                {id: 1, name: 'dialog1'},
                {id: 2, name: 'dialog2'},
                {id: 3, name: 'dialog3'},
                {id: 4, name: 'dialog4'},
                {id: 5, name: 'dialog5'},
            ],
            messages: [
                {id: 1, message: 'сообщение 1'},
                {id: 2, message: 'сообщение 2'},
                {id: 3, message: 'сообщение 3'},
                {id: 4, message: 'сообщение 4'},
                {id: 5, message: 'сообщение 5'},
            ],
            messageText: ''
        }
    },
    _callSubscriber() {
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);

        this._callSubscriber(this._state);
    }
};

export default store;