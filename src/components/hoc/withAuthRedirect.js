import * as React from "react";
import {Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {getUserProfile, getUserStatus, updateUserStatus} from "../../redux/profile-reducer";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
});

export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to='/login'/>

            return <Component {...this.props} />
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}
