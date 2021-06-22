import React, {useState} from 'react';
import style from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import defaultUserPhoto from "../../../assets/image/anonymous-avatar-icon-9.jpg";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }

    const onProfileUserPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.saveProfileUserPhoto(e.target.files[0]);
        }
        ;
    };

    const onSubmit = (formData) => {
        props.saveUserProfile(formData).then(
            () => {
                setEditMode(false)
            }
        );
    };

    return (
        <div className={style.ProfileInfoStyle}>
            <div className={style.descriptionBlock}>
                <img src={props.profile.photos.large != null ? props.profile.photos.large : defaultUserPhoto}/>
                {props.isOwner && <input type={"file"} onChange={onProfileUserPhotoSelected}/>}
            </div>
            <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
            {editMode ?
                <ProfileDataForm initialValues={props.profile}
                                 profile={props.profile}
                                 onSubmit={onSubmit}/> :
                <ProfileData profile={props.profile}
                             isOwner={props.isOwner}
                             goToEditMode={() => {
                                 setEditMode(true)
                             }}
                />}
        </div>
    )
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
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
            <b>Контакты:</b> {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
    </div>
}

const Contact = ({contactTitle, contactValue}) => {
    return <div className={style.contact}><b>{contactTitle} :</b> {contactValue}</div>
}


export default ProfileInfo;