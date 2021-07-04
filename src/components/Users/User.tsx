import React from 'react'
import styles from "./Users.module.css";
import defaultUserPhoto from "../../assets/image/anonymous-avatar-icon-9.jpg";
import {NavLink} from "react-router-dom";
import {userType} from "../../types/types";

type PropsType = {
    user: userType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

let User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : defaultUserPhoto}
                             className={styles.userPhoto}/>
                             </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={followingInProgress.some(id => id == user.id)} onClick={() => {
                                unfollow(user.id);
                            }}>Отписаться</button>
                            : <button disabled={followingInProgress.some(id => id == user.id)} onClick={() => {
                                follow(user.id);
                            }}>Подписаться</button>}
                    </div>
                </span>
            <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
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