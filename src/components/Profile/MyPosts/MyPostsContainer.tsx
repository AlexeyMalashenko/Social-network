import React from "react";
import {actions} from "../../../redux/profile-reducer";
import MyPosts, {DispatchPropsType, MapPropsType } from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";


let mapStateToProps = (props: AppStateType) => {
    return {
        postsData: props.profilePage.postsData
    }
};

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(
    mapStateToProps,
    {addPost: actions.addPostAС})
(MyPosts);

export default MyPostsContainer;