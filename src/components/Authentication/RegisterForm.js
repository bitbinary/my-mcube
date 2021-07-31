import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from 'redux/Authenticate/actions';
import { useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
export default function RegisterForm({ userType }) {
  const history = useHistory();
  const { loader } = useSelector((state) => state.authenticateReducer);
  const [userName, setUserName] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const dispatch = useDispatch();

  let onFinish = () => {
    dispatch({
      type: actions.SIGNUP,
      payload: {
        username: userName,
        firstname: userFirstName,
        lastname: userLastName,
        password: userPassword,
        usertype: userType,
      },
    });
  };
  const toLoginPage = () => {
    history.push('/login');
  };
  return (
    <Form
      name='normal_login'
      className='form'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name='firstname'
        rules={[
          {
            required: true,
            message: 'Please input your First Name!',
          },
        ]}
      >
        <Input
          size='large'
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='First Name'
          autoComplete='First Name'
          value={userFirstName}
          onChange={(e) => setUserFirstName(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name='lastname'
        rules={[
          {
            required: true,
            message: 'Please input your Last Name!',
          },
        ]}
      >
        <Input
          size='large'
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Last Name'
          autoComplete='Last Name'
          value={userLastName}
          onChange={(e) => setUserLastName(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name='username'
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input
          size='large'
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Username'
          autoComplete='username'
          onChange={(e) => setUserName(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
          size='large'
          autoComplete='current-password'
          onChange={(e) => setUserPassword(e.target.value)}
        />
      </Form.Item>
      {/* <Form.Item>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item> */}

      <Form.Item>
        <Button
          loading={loader}
          type='primary'
          className='login-form-button'
          size='large'
          htmlType='submit'
        >
          Register
        </Button>
      </Form.Item>
      <Form.Item className='login-form-button-link'>
        <Button type='link' onClick={() => toLoginPage()} size='large'>
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
}
