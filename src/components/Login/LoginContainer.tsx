import React from 'react';
import {connect} from "react-redux";
import Login from "./Login";
import {login, logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchPropsType = {
    login: (email: string,
            password: string,
            rememberMe: boolean,
            captcha: string | null) => void
    logout: () => void
}

export type PropsType = MapStatePropsType & MapDispatchPropsType;

class LoginContainer extends React.Component<PropsType> {
    render() {
        return <Login login={this.props.login}
                      logout={this.props.logout}
                      isAuth={this.props.isAuth}
                      captchaUrl={this.props.captchaUrl}
        />
    }
}


const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(mapStateToProps, {
    login, logout
})(LoginContainer);