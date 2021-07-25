import React, {ComponentType} from 'react';
import './App.css';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Route, withRouter, Switch, Redirect, NavLink} from "react-router-dom";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/preloader";
import {compose} from "redux";
import store, {AppStateType} from "./redux/redux-store";
import {UsersPage} from './components/Users/UsersContainer';
import {LoginPage} from './components/Login/LoginPage';
import 'antd/dist/antd.css'

import {Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined, LaptopOutlined} from '@ant-design/icons';
import {Header} from './components/Header/Header';
import { Footer } from 'antd/lib/layout/layout';

const {SubMenu} = Menu;
const {Content, Sider} = Layout;

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const ChatPage = React.lazy(() => import('./Pages/ChatPage'));

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
            <Layout>
                <Header/>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            //defaultSelectedKeys={['1']}
                            //defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined/>} title="Профиль">
                                <Menu.Item key="1"><NavLink to="/profile">Профиль</NavLink></Menu.Item>
                                <Menu.Item key="2"> <NavLink to="/dialogs">Сообщения</NavLink></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Пользователи">
                                <Menu.Item key="5"><NavLink to="/users">Друзья</NavLink></Menu.Item>
                                <Menu.Item key="6"><NavLink to="/chat">Чат</NavLink></Menu.Item>
                                <Menu.Item key="7"><NavLink to="/news">Новости</NavLink></Menu.Item>
                                <Menu.Item key="8"><NavLink to="/music">Музыка</NavLink></Menu.Item>
                                <Menu.Item key="9"><NavLink to="/settings">Настройки</NavLink></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            {/*<Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                            {/*<Breadcrumb.Item>List</Breadcrumb.Item>*/}
                            {/*<Breadcrumb.Item>App</Breadcrumb.Item>*/}
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <React.Suspense fallback={<Preloader/>}>
                                <Switch>
                                    <Redirect exact from="/" to="/profile"/>
                                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                                    <Route path='/chat' render={() => <ChatPage/>}/>
                                    <Route path='/news' render={() => <News/>}/>
                                    <Route path='/music' render={() => <Music/>}/>
                                    <Route path='/settings' render={() => <Settings/>}/>
                                    <Route path='/users' render={() => <UsersPage/>}/>
                                    <Route path='/login' render={() => <LoginPage/>}/>
                                </Switch>
                            </React.Suspense>
                        </Content>
                    </Layout>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>Тестовый проект социальной сети</Footer>
            </Layout>

            /*  <div className='app-wrapper'>
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
              </div>*/
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