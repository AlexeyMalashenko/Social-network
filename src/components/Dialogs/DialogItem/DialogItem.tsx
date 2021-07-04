import React from 'react';
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";

type PropsType = {
    id:  number
    name: string
}

const DialogItem:React.FC<PropsType> = ({id, name}) => {
    return (
        <div className={`${s.dialog} ${s.active}`}>
            <NavLink to={"/dialogs/" + id}>{name}</NavLink>
        </div>
    )
}

export default DialogItem;
