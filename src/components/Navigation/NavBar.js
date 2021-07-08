import React from 'react';
import { Menu } from 'antd';
import { useDispatch } from 'react-redux';
import actions from 'redux/Authenticate/actions';
import { useState } from 'react';
import {
  MailOutlined,
  GoldOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import logo from 'logo.svg';
// import logocube from 'logocube.svg';
import { useHistory } from 'react-router-dom';

// const { SubMenu } = Menu;
export default function NavBar() {
  //Variables
  const history = useHistory();
  const [mail, setMail] = useState('');
  const dispatch = useDispatch();

  //Functions
  const handleClick = (e) => {
    setMail(e.key);
  };

  const profile = () => {
    history.push('/profile');
  };

  const logout = () => {
    dispatch({
      type: actions.LOGOUT,
    });
    history.push('/login');
  };
  const changeToForum = () => {
    history.push('/forum');
  };

  //Render
  return (
    <>
      <Menu onClick={handleClick} selectedKeys={[mail]} mode='horizontal'>
        <Menu.Item className='App-logo' key='applogo'>
          <div>
            {/* <img src={logocube} className='logo' alt='logo' key='logo' /> */}
            <img src={logo} className='logo' alt='logo' key='logo' />
          </div>
        </Menu.Item>
        <Menu.Item key='messages' icon={<MailOutlined />}>
          Messages
        </Menu.Item>
        {/* <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
              Navigation Two
            </Menu.Item> */}
        <Menu.Item
          key='Profile'
          icon={<UserOutlined />}
          onClick={() => profile()}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          key='forum'
          icon={<GoldOutlined />}
          onClick={() => changeToForum()}
        >
          Forum
        </Menu.Item>
        <Menu.Item
          key='LogOut'
          icon={<LogoutOutlined />}
          onClick={() => logout()}
        >
          Logout
        </Menu.Item>
      </Menu>
    </>
  );
}
