import React from 'react'
import styles from "./Users.module.css";
import defaultUserPhoto from "../../assets/image/anonymous-avatar-icon-9.jpg";
import {NavLink} from "react-router-dom";


let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        <div>
            {pages.map(page => {
                return <span className={props.currentPage === page && styles.selectedPage}
                             onClick={(e) => {
                                 props.onPageChanged(page)
                             }}
                             key={page.id}>
                        {page}
                    </span>
            })}
        </div>
        {
            props.users.map((user) => <div key={user.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : defaultUserPhoto}
                             className={styles.userPhoto}/>
                             </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={props.followingInProgress.some( id => id == user.id)} onClick={() => {
                                props.unfollow(user.id);
                            }}>Отписаться</button>
                            : <button disabled={props.followingInProgress.some( id => id == user.id)}  onClick={() => {
                                props.follow(user.id);
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
            </div>)
        }
    </div>
}

export default Users;