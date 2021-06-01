import React from 'react';
import {connect} from "react-redux";
import Login from "./Login";
import {login, logout} from "../../redux/auth-reducer";

class LoginContainer extends React.Component {

    render() {
        return <Login login={this.props.login}
                      logout={this.props.logout}/>
    }
}

export default connect(null, {
    login, logout
})(LoginContainer);