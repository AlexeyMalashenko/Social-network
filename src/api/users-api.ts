import {GetItemsType, instance, ResponseType} from "./api";

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10, term = "") {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`)
            .then(response => response.data);
    }
};

export const followAPI = {
    setFollow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)
            .then(response => response.data);
    },
    setUnfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`)
            .then(response => response.data);
    }
}