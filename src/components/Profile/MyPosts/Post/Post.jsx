import s from "./Post.module.css";
import React from "react";


const Post = (props) => {
    return (
        <div className={s.item}>
            <img src='https://i.pinimg.com/736x/98/b9/52/98b952001792e2b836669abf4d853712.jpg'/>
            {props.message}
            <div>
                <span>like {props.likesCount}</span>
            </div>
        </div>
    )
}


export default Post;