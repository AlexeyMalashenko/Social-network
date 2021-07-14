import React from "react";
import {actions} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        postsData: state.profilePage.postsData,
        postText: state.profilePage.postText
    };
};
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPost) => {
            dispatch(actions.addPostAС(newPost));
        }
    };
};



const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;