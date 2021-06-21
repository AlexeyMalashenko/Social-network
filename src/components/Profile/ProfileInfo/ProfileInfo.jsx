import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import defaultUserPhoto from "../../../assets/image/anonymous-avatar-icon-9.jpg";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    const onProfileUserPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.saveProfileUserPhoto(e.target.files[0]);
        }
        ;
    };

    return (
        <div className={s.ProfileInfoStyle}>
            <div className={s.descriptionBlock}>
                <div>
                    {props.profile.fullName}
                </div>
                <img src={props.profile.photos.large != null ? props.profile.photos.large : defaultUserPhoto}/>
                {props.isOwner && <input type={"file"} onChange={onProfileUserPhotoSelected}/>}
                <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
                <div>
                    <div>Обо мне: {props.profile.aboutMe}</div>
                    <div> Контакты:
                        <div>Фейсбук {props.profile.contacts.facebook}</div>
                        <div>Мой сайт {props.profile.contacts.website}</div>
                        <div>ВК {props.profile.contacts.vk}</div>
                        <div>Твиттер {props.profile.contacts.twitter}</div>
                        <div>Инстарграмм {props.profile.contacts.instagram}</div>
                        <div>Ютуб {props.profile.contacts.youtube}</div>
                        <div>ГитХаб {props.profile.contacts.github}</div>
                        <div>Главная ссылка {props.profile.contacts.mainLink}</div>
                    </div>
                    <div>
                        {props.profile.lookingForAJob && "В поиске работы: " + props.profile.lookingForAJobDescription}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;