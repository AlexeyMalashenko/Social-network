import style from "./MyPosts.module.css";
import React from "react";
import Post from "./Post/Post";
import AddPostForm, { addPostFormValuesType } from "./AddPostForm/AddPostForm";
import { postsDataType } from "../../../types/types";

export type MapPropsType = {
    postsData: Array<postsDataType>
};
export type DispatchPropsType = {
    addPost: (newPost: string) => void
};

type PropsType = MapPropsType & DispatchPropsType;
const MyPosts: React.FC<PropsType> = (props) => {

    let posts = props.postsData
        .map(post =>
            <Post message={post.message} likesCount={post.likesCount} key={post.id}/>
        );

    const addNewPost = (formData: addPostFormValuesType) => {
        props.addPost(formData.newPost)
    }

    return (
        <div className={style.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={addNewPost}/>
            <div className={style.posts}>
                {posts}
            </div>
        </div>
    )
}


export default MyPosts;