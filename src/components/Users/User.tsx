import React from 'react'
import styles from "./Users.module.css";
import defaultUserPhoto from "../../assets/image/anonymous-avatar-icon-9.jpg";
import {NavLink} from "react-router-dom";
import {userType} from "../../types/types";

type PropsType = {
    user: userType
    followingInProgress: Array<number>
    onUserFollow: (userId: number) => void
    onUserUnfollow: (userId: number) => void
}

const User: React.FC<PropsType> = (props) => {
    return (
        <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + props.user.id}>
                        <img src={props.user.photos.small != null ? props.user.photos.small : defaultUserPhoto}
                             className={styles.userPhoto}/>
                             </NavLink>
                    </div>
                    <div>
                        {props.user.followed
                            ? <button disabled={props.followingInProgress.some(id => id == props.user.id)} onClick={() => {
                                props.onUserUnfollow(props.user.id);
                            }}>Отписаться</button>
                            : <button disabled={props.followingInProgress.some(id => id == props.user.id)} onClick={() => {
                                props.onUserFollow(props.user.id);
                            }}>Подписаться</button>}
                    </div>
                </span>
            <span>
                    <span>
                        <div>{props.user.name}</div>
                        <div>{props.user.status}</div>
                    </span>
                    <span>
                        <div>{"user.location.country"}</div>
                        <div>{"user.location.city"}</div>
                    </span>
                </span>
        </div>
    )
}

export default User;