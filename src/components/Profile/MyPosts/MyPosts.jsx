import s from "./MyPosts.module.css";
import React from "react";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {required, maxLengthCreator} from "../../../utils/validators/validators";
import {TextArea} from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const NewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder={"Добавить новый пост"}
                    name={"newPost"}
                    component={TextArea}
                    validate={[required, maxLength10]}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const NewPostReduxForm = reduxForm({form: 'newPost'})(NewPostForm);

const MyPosts = (props) => {

    let posts = props.postsData
        .map(post =>
            <Post message={post.message} likesCount={post.likesCount} key={post.id}/>
        );

    const addNewPost = (formData) => {
        props.addPost(formData.newPost)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <NewPostReduxForm onSubmit={addNewPost}/>
            <div className={s.posts}>
                {posts}
            </div>
        </div>
    )
}


export default MyPosts;