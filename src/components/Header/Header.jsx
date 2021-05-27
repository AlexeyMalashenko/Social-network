import React from 'react';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return <header className={style.header}>
        <img src='https://static-cse.canva.com/blob/232576/800px-NBC_logo.svg.png'/>

        <div className={style.loginBlock}>
            {props.isAuth ?
               <div>{props.login}</div> :
                <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default Header;