import React from 'react';
import {connect} from "react-redux";
import Login from "./Login";
import {login, logout} from "../../redux/auth-reducer";

class LoginContainer extends React.Component {
    render() {
        return <Login login={this.props.login}
                      logout={this.props.logout}
                      isAuth={this.props.isAuth}
                      captchaUrl={this.props.captchaUrl}
        />
    }
}


const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {
    login, logout
})(LoginContainer);