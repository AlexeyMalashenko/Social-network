import { follow } from "./users-reducer"
import {followAPI} from "../api/users-api"
import {ResponseType, ResultCodeEnum} from "../api/api";

jest.mock("../api/users-api")
const userAPIMock = followAPI as jest.Mocked<typeof followAPI>

const result: ResponseType = {
    data: {},
    messages: [],
    resultCode: ResultCodeEnum.Success
}

userAPIMock.setFollow.mockReturnValue(Promise.resolve(result))

test ("name", async () => {
    const thunk = follow(1)
    const dispatch = jest.fn() // фейковый диспатч

    // @ts-ignore
    await thunk(dispatch)
    expect(dispatch).toBeCalledTimes(3)

})