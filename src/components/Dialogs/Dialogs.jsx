import React from 'react';
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {Redirect} from "react-router-dom";

const Dialogs = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs
        .map(dialog =>
            <DialogItem name={dialog.name} id={dialog.id} key={dialog.id}/>
        );

    let messagesElements = state.messages
        .map(message =>
            <Message message={message.message} key={message.id}/>
        );

    let newMessageElement = React.createRef();

    let addMessage = () => {
        props.addMessage();
    }

    let textAreaOnChange = () => {
        let text = newMessageElement.current.value;
        props.updateMessageText(text);
    }

    if(!props.isAuth) return <Redirect to={"/login"}/>;

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div>
                    <textarea onChange={textAreaOnChange} ref={newMessageElement} value={state.messageText}/>
                </div>
                <div>
                    <button onClick={addMessage}>
                        Отправить
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Dialogs;
