import React, {useEffect, useState} from "react";
import {updateUserStatus} from "../../../redux/profile-reducer";


const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status)
        }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }


    return (
        <div>
            {!editMode &&
            <div>
                <span onClick={activateEditMode}>{props.status || "--------------"}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={onStatusChange}
                       onBlur={deactivateEditMode}
                       autoFocus={true}
                       value={status}
                />
            </div>
            }
        </div>
    )

}
export default ProfileStatusWithHooks;