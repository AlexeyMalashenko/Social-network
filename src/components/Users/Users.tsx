import React from 'react'
import {userType} from '../../types/types';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

type  PropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalUsersCount: number
    pageSize: number
    users: Array<userType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({
                                      currentPage, totalUsersCount, pageSize,
                                      onPageChanged, users, ...props
                                  }) => {

    return <div>
        <Paginator currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount}
                   pageSize={pageSize}
        />
        <div>
            {
                users.map((user) => <User user={user}
                                          key={user.id}
                                          followingInProgress={props.followingInProgress}
                                          follow={props.follow}
                                          unfollow={props.unfollow}
                />)
            }
        </div>
    </div>
}

export default Users;