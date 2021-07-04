import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {profileType} from "../../types/types";

type PropsType = {
    isOwner: boolean
    profile: profileType
    status: string
    updateUserStatus: (status: string) => void
    saveProfileUserPhoto: (file: any) => void
    saveUserProfile: (profile: profileType) => void
}

const Profile:React.FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         updateUserStatus={props.updateUserStatus}
                         saveProfileUserPhoto={props.saveProfileUserPhoto}
                         saveUserProfile={props.saveUserProfile}
            />
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;