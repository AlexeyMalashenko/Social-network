import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/Message/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path = '/dialogs' render={ () => <DialogsContainer/> }/>
                    <Route path = '/profile/:userId?' render={ () => <ProfileContainer/> }/>
                    <Route path = '/news' render={ () => <News/> }/>
                    <Route path = '/music' render={ () => <Music/> }/>
                    <Route path = '/settings' render={ () => <Settings/> }/>
                    <Route path = '/users' render={ () => <UsersContainer/> }/>
                    <Route path = '/login' render={ () => <LoginContainer/> }/>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;
