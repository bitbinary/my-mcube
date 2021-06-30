import React from 'react';
import { Menu } from 'antd';
import { useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import logo from 'logo.svg';
// import logocube from 'logocube.svg';
import { useHistory } from 'react-router-dom';

export default function NavBarPublic() {
  //Variables
  const history = useHistory();
  const [mail, setMail] = useState('');

  //Functions
  const handleClick = (e) => {
    setMail(e.key);
  };
  const goToLogin = () => {
    history.push('/login');
  };
  const goToHome = () => {
    history.push('/home');
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
        <Menu.Item
          key='home'
          icon={<HomeOutlined />}
          onClick={() => goToHome()}
        >
          home
        </Menu.Item>
        <Menu.Item key='loginRegister' onClick={() => goToLogin()}>
          LogIn/Register
        </Menu.Item>
      </Menu>
    </>
  );
}
