import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "46fb8b54-104d-4722-908d-101fea714c32"
    }
});

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    }
};

export const followAPI = {
    setFollow(userId = 1) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data);
    },
    setUnfollow(userId = 1) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data);
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
            .then(response => response.data);
    }
};

export const profileAPI = {
    authUserData(userId = 1) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data);
    }
};
