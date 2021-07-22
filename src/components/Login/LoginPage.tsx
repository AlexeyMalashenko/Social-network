import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import styles from "./../common/FormsControls/FormsControls.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import { login } from '../../redux/auth-reducer';

const maxLength40 = maxLengthCreator(40);

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Email"}
                       name={"email"}
                       component={Input}
                       validate={[required, maxLength40]}
                />
            </div>
            <div>
                <Field placeholder={"Password"}
                       name={"password"}
                       component={Input}
                       type={"password"}
                       validate={[required, maxLength40]}
                />
            </div>
            <div>
                <Field type={"checkbox"}
                       name={"rememberMe"}
                       component={Input}
                /> remember me
            </div>

            {props.captchaUrl && <img src={props.captchaUrl}/>}
            <div>
                <Field placeholder={"captcha"}
                       name={"captcha"}
                       component={Input}
                       validate={[required]}
                />
            </div>

            {props.error && <div className={styles.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm);

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

export const LoginPage: React.FC = (props) => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>Логин</h1>
        <LoginReduxForm captchaUrl={captchaUrl} onSubmit={onSubmit}/>
    </div>
}

