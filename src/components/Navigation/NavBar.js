import React from 'react';
import { Menu } from 'antd';
import { useDispatch } from 'react-redux';
import actions from 'redux/Authenticate/actions';
import { useState } from 'react';
import {
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import logo from 'logo.svg';
// import logocube from 'logocube.svg';
import { useHistory } from 'react-router-dom';

const { SubMenu } = Menu;
export default function NavBar() {
  //Variables
  const history = useHistory();
  const [mail, setMail] = useState('');
  const dispatch = useDispatch();

  //Functions
  const handleClick = (e) => {
    setMail(e.key);
  };
  const logout = () => {
    dispatch({
      type: actions.LOGOUT,
    });
    history.push('/login');
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

        <SubMenu key='SubMenu' icon={<SettingOutlined />} title='Settings'>
          <Menu.ItemGroup>
            <Menu.Item key='Profile' icon={<UserOutlined />}>
              Profile
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup>
            <Menu.Item
              key='LogOut'
              icon={<LogoutOutlined />}
              onClick={() => logout()}
            >
              Logout
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </>
  );
}
