import usersReducer, {actions, initialStateType} from "./users-reducer";

let state: initialStateType;

beforeEach(() => {
    state = {
        users:
            [
                {id: 0, name: "User 1", followed: false, status: "status 00", photos: {small: null, large: null}},
                {id: 1, name: "User 2", followed: false, status: "status 10", photos: {small: null, large: null}},
                {id: 2, name: "User 3", followed: true, status: "status 20", photos: {small: null, large: null}},
                {id: 3, name: "User 4", followed: true, status: "status 30", photos: {small: null, large: null}}
            ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        filter: {
            term: "",
            friend: null as null | boolean
        }
    }
}) // инициализация ЧИСТОГО стейта перед каждый новым тестом

test("follow success", () => {
        const newState = usersReducer(state, actions.followSuccess(1))

        expect(newState.users[0].followed).toBeFalsy();
        expect(newState.users[1].followed).toBeTruthy();
    }
)

test("unfollow success", () => {
        const newState = usersReducer(state, actions.unfollowSuccess(3))

        expect(newState.users[2].followed).toBeTruthy();
        expect(newState.users[3].followed).toBeFalsy();
    }
)
