import React from 'react';
import {Link} from "react-router-dom";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsAuth, selectLogin} from '../../redux/auth-selectors';
import {logout} from '../../redux/auth-reducer';

export const Header: React.FC = (props) => {

    const isAuth = useSelector(selectIsAuth);
    const login = useSelector(selectLogin);

    const dispatch = useDispatch()

    const logoutCallBack = () => {
        dispatch(logout())
    }

    const {Header} = Layout;

    return <Header className="header">
        <Row>
            <Col span={16}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    {/*<Menu.Item key="1">nav 1</Menu.Item>*/}
                    {/*<Menu.Item key="2">nav 2</Menu.Item>*/}
                    {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
                </Menu>
            </Col>
            {isAuth ?
                <> <Col span={2}>
                    <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                </Col>
                    <Col span={6}>
                        <Button onClick={logoutCallBack}>Выйти</Button>
                    </Col>
                </>
                : <Col span={8}>
                    <Button>
                        <Link to={'/login'}>Войти</Link>
                    </Button>
                </Col>}
        </Row>
    </Header>


}
