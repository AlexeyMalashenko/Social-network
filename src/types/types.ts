export type postsDataType = {
    id: number,
    message: string,
    likesCount: number
}
export type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type photosType = {
    small: string | null
    large: string | null
}
export type profileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
    photos: photosType
}
export type userType = {
    id: number
    name: string
    status: string
    photos: photosType
    followed: boolean
}

export type dialogType = {
    id: number,
    name: string
}
export type messageType = {
    id: number,
    message: string
}
