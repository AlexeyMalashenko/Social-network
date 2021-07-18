import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TextArea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import { NewMessageFormType } from "../Dialogs";

const maxLength100 = maxLengthCreator(100);

//type NewMessageValuesKeysType = Extract<keyof NewMessageFormType, string>
type PropsType = {}

const AddMessageForm:React.FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> = (props) => {
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

export default reduxForm<NewMessageFormType>({form: 'dialogAddMessageForm'})(AddMessageForm)