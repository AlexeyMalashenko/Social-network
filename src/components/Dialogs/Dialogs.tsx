import React from 'react';
import style from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {dialogType, messageType } from '../../types/types';
import AddMessageForm from './AddMessageForm/AddMessageForm';

type PropsType = {
    dialogs: Array<dialogType>
    messages: Array<messageType>
    sendMessage: (newMessageBody: string) => void
}

export type NewMessageFormType = {
    newMessageBody: string
}

const Dialogs: React.FC<PropsType> = ({dialogs, messages, sendMessage }) => {

    let dialogsElements = dialogs
        .map(dialog =>
            <DialogItem name={dialog.name} id={dialog.id} key={dialog.id}/>
        );

    let messagesElements = messages
        .map(message =>
            <Message message={message.message} key={message.id}/>
        );

    const addNewMessage = (formData: NewMessageFormType) => {
        sendMessage(formData.newMessageBody);
    }
    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={style.messages}>
                {messagesElements}
                <AddMessageForm onSubmit={addNewMessage}/>
            </div>

        </div>
    )
}

export default Dialogs;
