const ADD_MESSAGE = 'ADD-MESSAGE';

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
    ]
}

export const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: newMessage}]
            };
        default:
            return state;
    }
};

export const addMessageActionCreator = (newMessageBody) => ({type: ADD_MESSAGE, newMessageBody});

export default dialogsReducer;