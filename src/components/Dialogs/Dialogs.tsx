import React from 'react';
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {TextArea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {dialogType, messageType } from '../../types/types';

const maxLength100 = maxLengthCreator(100);

type PropsType = {
    isAuth: boolean
    dialogs: Array<dialogType>
    messages: Array<messageType>
    sendMessage: (newMessageBody: string) => void
}

const Dialogs: React.FC<PropsType> = ({dialogs, messages, isAuth, sendMessage }) => {

    let dialogsElements = dialogs
        .map(dialog =>
            <DialogItem name={dialog.name} id={dialog.id} key={dialog.id}/>
        );

    let messagesElements = messages
        .map(message =>
            <Message message={message.message} key={message.id}/>
        );

    if (!isAuth) return <Redirect to={"/login"}/>;

    const addNewMessage = (formData: any) => {
        sendMessage(formData.newMessageBody);
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <AddMessageReduxForm onSubmit={addNewMessage}/>
            </div>

        </div>
    )
}

type PropsFormType= {
    handleSubmit: any
}

const AddMessageForm:React.FC<PropsFormType> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                       component={TextArea}
                       name={"newMessageBody"}
                       placeholder={"Введите ваше сообщение"}
                       validate={[required, maxLength100]}
                />
            </div>
            <div>
                <button>
                    Отправить
                </button>
            </div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;
