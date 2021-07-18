import React, {ComponentType} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, updateUserStatus, saveProfileUserPhoto, saveUserProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {profileType} from "../../types/types";


type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getUserProfile: (userId: number | null) => void
    getUserStatus: (userId: number | null) => void
    updateUserStatus: (status: string) => void
    saveProfileUserPhoto: (file: any) => void
    saveUserProfile: (profile: profileType) => Promise<any>

}
// типы для withRouter
type PathParamsType = {
    userId: string
}
type RouteComponentPropsType = RouteComponentProps<PathParamsType>

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentPropsType;

class ProfileContainer extends React.Component<PropsType>  {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    };

    componentDidMount() {
        this.refreshProfile();
    };

    componentDidUpdate(prevProps: PropsType) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
        ;
    };

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateUserStatus={this.props.updateUserStatus}
                     saveProfileUserPhoto={this.props.saveProfileUserPhoto}
            />
        )
    }
}


let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});


export default compose<ComponentType>(
    connect(mapStateToProps, {getUserProfile,
        getUserStatus,
        updateUserStatus,
        saveProfileUserPhoto,
        saveUserProfile}),
    withRouter,
)
(ProfileContainer)
