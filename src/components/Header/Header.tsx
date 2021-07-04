import React from 'react';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";

type PropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

const Header:React.FC<PropsType> = ({isAuth, login,logout}) => {
    return <header className={style.header}>
        <img src='https://static-cse.canva.com/blob/232576/800px-NBC_logo.svg.png'/>

        <div className={style.loginBlock}>
            {isAuth ?
               <div>{login} - <button onClick={logout}>Выйти</button> </div>  :
                <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default Header;