import s from "./MyPosts.module.css";
import React from "react";
import Post from "./Post/Post";

const MyPosts = (props) => {

    let posts = props.postsData
        .map(post =>
            <Post message={post.message} likesCount={post.likesCount} key={post.id}/>
        );

    let newPostElement = React.createRef();

    let addPost = () => {
        props.addPost();
    }

    let textOnChange = () => {
        let text = newPostElement.current.value;
        props.updatePostText(text);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={textOnChange}
                              ref={newPostElement}
                              value={props.postText}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {posts}
            </div>
        </div>
    )
}

export default MyPosts;