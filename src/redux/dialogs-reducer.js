const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT';

let initialState = {
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

export const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = state.messageText;
            return {
                ...state,
                messageText: '',
                messages: [...state.messages, {id: 6, message: newMessage}]
            };
        case
        UPDATE_MESSAGE_TEXT:
            return {
                ...state,
                messageText: action.messageText
            };
        default:
            return state;
    }
};

export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const updateMessageTextActionCreator = (text) => ({
    type: UPDATE_MESSAGE_TEXT,
    messageText: text
});

export default dialogsReducer;