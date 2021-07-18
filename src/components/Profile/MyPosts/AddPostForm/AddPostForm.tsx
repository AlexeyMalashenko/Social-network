import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TextArea} from "../../../common/FormsControls/FormsControls";
import React from "react";

const maxLength10 = maxLengthCreator(10);

type PropsType = {}

export type addPostFormValuesType = {
    newPost: string
}

const AddPostForm: React.FC<InjectedFormProps<addPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder={"Добавить новый пост"}
                    name={"newPost"}
                    component={TextArea}
                    validate={[required, maxLength10]}
                />
            </div>
            <div>
                <button>Добавить запись</button>
            </div>
        </form>
    )
}

export default reduxForm<addPostFormValuesType>({form: 'newPost'})(AddPostForm);
