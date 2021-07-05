import s from "./Post.module.css";
import React from "react";
import defaultUserPhoto from "../../../../assets/image/anonymous-avatar-icon-9.jpg";

type PropsType = {
    message: string
    likesCount: number
}

const Post:React.FC<PropsType> = ({message,likesCount}) => {
    return (
        <div className={s.item}>
            <img src={defaultUserPhoto}/>
            {message}
            <div>
                <span>like {likesCount}</span>
            </div>
        </div>
    )
}


export default Post;