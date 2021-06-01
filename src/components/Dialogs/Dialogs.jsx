import React from 'react';
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {TextArea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const maxLength100 = maxLengthCreator(100);

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

    if (!props.isAuth) return <Redirect to={"/login"}/>;

    const addNewMessage = (formData) => {
        props.sendMessage(formData.newMessageBody);
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

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
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
