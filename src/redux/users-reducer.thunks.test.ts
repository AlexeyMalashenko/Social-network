import {actions, follow, unfollow} from "./users-reducer"
import {followAPI} from "../api/users-api"
import {ResponseType, ResultCodeEnum} from "../api/api";

jest.mock("../api/users-api")
const userAPIMock = followAPI as jest.Mocked<typeof followAPI>

const result: ResponseType = {
    data: {},
    messages: [],
    resultCode: ResultCodeEnum.Success
}

const dispatchMock = jest.fn() // фейковый диспатч
const getStateMock = jest.fn() // фейковый стейт

beforeEach(() => {
    dispatchMock.mockClear() // обнуление перед каждым тестом
    getStateMock.mockClear() // обнуление перед каждым тестом
})

test ("success follow thunk", async () => {
    userAPIMock.setFollow.mockResolvedValue(Promise.resolve(result))
    const thunk = follow(1)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))

})

test ("success unfollow thunk", async () => {
    userAPIMock.setUnfollow.mockResolvedValue(Promise.resolve(result))
    const thunk = unfollow(1)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))

})