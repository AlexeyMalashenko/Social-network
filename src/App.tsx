import React, { ComponentType } from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Route, withRouter, Switch, Redirect} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/preloader";
import {compose} from "redux";
import store, {AppStateType} from "./redux/redux-store";
import { UsersPage } from './components/Users/UsersContainer';
import { LoginPage } from './components/Login/LoginPage';


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <React.Suspense fallback={<Preloader/>}>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Switch>
                            <Redirect exact from="/" to="/profile" />
                            <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                            <Route path='/news' render={() => <News/>}/>
                            <Route path='/music' render={() => <Music/>}/>
                            <Route path='/settings' render={() => <Settings/>}/>
                            <Route path='/users' render={() => <UsersPage/>}/>
                            <Route path='/login' render={() => <LoginPage/>}/>
                        </Switch>
                    </div>
                </React.Suspense>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({initialized: state.app.initialized})

let AppContainer = compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const MainApp: React.FC = () => {
    return <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <AppContainer/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
};

export default MainApp;