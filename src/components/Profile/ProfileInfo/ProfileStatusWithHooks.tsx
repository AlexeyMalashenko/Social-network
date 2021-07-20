import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from "react";

type PropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }


    return (
        <div>
            {!editMode &&
            <div>
                <b> Статус: </b><span onClick={activateEditMode}>{props.status || "--------------"}</span>
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