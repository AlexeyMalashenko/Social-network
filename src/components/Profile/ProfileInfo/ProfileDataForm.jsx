import React from "react";
import {Input, TextArea} from "../../common/FormsControls/FormsControls";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import style from './ProfileInfo.module.css';
import styleFormsCommonErrore from "../../common/FormsControls/FormsControls.module.css";

const maxLength40 = maxLengthCreator(40);

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <button>Сохранить</button>
        </div>
        {error && <div className={styleFormsCommonErrore.formSummaryError}>
            {error}
        </div>}
        <div>
            <Field placeholder={"Полное имя"}
                   name={"fullName"}
                   component={Input}
                   validate={[required, maxLength40]}
            />
        </div>
        <div>
            <b>В поиске работы:</b>
            <Field placeholder={""}
                   name={"lookingForAJob"}
                   component={Input}
                   type={"checkbox"}
                   validate={[required, maxLength40]}
            />
        </div>
        <div>
            <b>Мои профессиональные навыки:</b>
            <Field placeholder={""}
                   name={"lookingForAJobDescription"}
                   component={TextArea}
                   validate={[required, maxLength40]}
            />
        </div>
        <div>
            <b>Обо мне:</b>
            <Field placeholder={""}
                   name={"aboutMe"}
                   component={TextArea}
                   validate={[required, maxLength40]}
            />
        </div>
        <div>
            <b>Контакты:</b> {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={style.contact}>
                <b>{key}: {<Field placeholder={key}
                                  name={"contacts." + key}
                                  component={Input}
                />}</b>
            </div>
        })}
        </div>
    </form>
}

const ProfileDataReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataReduxForm