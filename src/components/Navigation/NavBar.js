import React from 'react';
import { Menu } from 'antd';
import { useState } from 'react';
import {
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import logo from 'logo.svg';

const { SubMenu } = Menu;
export default function NavBar() {
  const [mail, setMail] = useState('');
  const handleClick = (e) => {
    setMail(e.key);
  };

  return (
    <>
      <Menu onClick={handleClick} selectedKeys={[mail]} mode='horizontal'>
        <Menu.Item className='App-logo'>
          <img src={logo} className='logo' alt='logo' key='logo' />
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
            <Menu.Item key='LogOut' icon={<LogoutOutlined />}>
              Logout
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </>
  );
}
