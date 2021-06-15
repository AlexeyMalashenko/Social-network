import {followAPI, userAPI} from "../api/api";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [
        /* {
             id: 1, photoUrl: 'https://bipbap.ru/wp-content/uploads/2018/03/03-3-700x637-640x582.jpg',
             followed: true, fullName: 'Name1', status: 'Status1', location: {city: 'Minsk', country: 'Belarus'}
         },
         {
             id: 2, photoUrl: 'https://bipbap.ru/wp-content/uploads/2018/03/03-3-700x637-640x582.jpg',
             followed: false, fullName: 'Name2', status: 'Status2', location: {city: 'Minsk', country: 'Belarus'}
         },
         {
             id: 3, photoUrl: 'https://bipbap.ru/wp-content/uploads/2018/03/03-3-700x637-640x582.jpg',
             followed: true, fullName: 'Name3', status: 'Status3', location: {city: 'Minsk', country: 'Belarus'}
         },
         {
             id: 4, photoUrl: 'https://bipbap.ru/wp-content/uploads/2018/03/03-3-700x637-640x582.jpg',
             followed: false, fullName: 'Name4', status: 'Status4', location: {city: 'Minsk', country: 'Belarus'}
         },
         {
             id: 5, photoUrl: 'https://bipbap.ru/wp-content/uploads/2018/03/03-3-700x637-640x582.jpg',
             followed: true, fullName: 'Name5', status: 'Status5', location: {city: 'Minsk', country: 'Belarus'}
         },
         {
             id: 6, photoUrl: 'https://bipbap.ru/wp-content/uploads/2018/03/03-3-700x637-640x582.jpg',
             followed: false, fullName: 'Name6', status: 'Status6', location: {city: 'Minsk', country: 'Belarus'}
         },
         {
             id: 7, photoUrl: 'https://bipbap.ru/wp-content/uploads/2018/03/03-3-700x637-640x582.jpg',
             followed: true, fullName: 'Name7', status: 'Status7', location: {city: 'Minsk', country: 'Belarus'}
         }*/
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user;
                })
            }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }
};

export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

export const requestUsers = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));

        let data = await userAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
};


export const follow = (userId) => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        let data = await followAPI.setFollow(userId);
        if (data.resultCode == 0) {
            dispatch(followSuccess(userId));
        }
        dispatch(toggleFollowingProgress(false, userId));
    }
};

export const unfollow = (userId) => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        let data = await followAPI.setUnfollow(userId)
        if (data.resultCode == 0) {
            dispatch(unfollowSuccess(userId));
        }
        dispatch(toggleFollowingProgress(false, userId));
    }
};


export default usersReducer;