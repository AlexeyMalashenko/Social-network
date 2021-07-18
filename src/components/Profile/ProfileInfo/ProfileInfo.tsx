import React, {ChangeEvent, useState} from 'react';
import style from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import defaultUserPhoto from "../../../assets/image/anonymous-avatar-icon-9.jpg";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";
import {profileType, contactsType} from "../../../types/types";

type PropsType = {
    profile: profileType | null
    updateUserStatus: (status: string) => void
    status: string
    isOwner: boolean
    saveProfileUserPhoto: (file: File) => void
    saveUserProfile: (profile: profileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({profile, updateUserStatus, status, isOwner, saveProfileUserPhoto, saveUserProfile }) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onProfileUserPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            saveProfileUserPhoto(e.target.files[0]);
        }
        ;
    };

    const onSubmit = (formData: profileType) => {
        saveUserProfile(formData).then(
            () => {
                setEditMode(false)
            }
        );
    };

    return (
        <div className={style.ProfileInfoStyle}>
            <div className={style.descriptionBlock}>
                <img src={profile.photos.large != null ? profile.photos.large : defaultUserPhoto}/>
                {isOwner && <input type={"file"} onChange={onProfileUserPhotoSelected}/>}
            </div>
            <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
            {editMode ?
                <ProfileDataForm initialValues={profile}
                                 profile={profile}
                                 onSubmit={onSubmit}/> :
                <ProfileData profile={profile}
                             isOwner={isOwner}
                             goToEditMode={() => {
                                 setEditMode(true)
                             }}
                />}
        </div>
    )
}

type ProfileDataPropsType = {
    profile: profileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>Редактировать</button>
        </div>}
        <div>
            <b>Полное имя:</b> {profile.fullName}
        </div>
        <div>
            <b>В поиске работы:</b> {profile.lookingForAJob ? "Да" : "Нет"}
        </div>
        {profile.lookingForAJob &&
        <div>
            <b>Мои профессиональные навыки:</b> {profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>Обо мне:</b> {profile.aboutMe}
        </div>
        <div>
            <b>Контакты:</b> {Object
            .keys(profile.contacts)
            .map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof contactsType]}/>
        })}
        </div>
    </div>
}

type ContactsProps = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactsProps> = ({contactTitle, contactValue}) => {
    return <div className={style.contact}><b>{contactTitle} :</b> {contactValue}</div>
}


export default ProfileInfo;