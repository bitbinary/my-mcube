import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from 'redux/Authenticate/actions';
import { useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export default function LoginForm({ userType }) {
  const history = useHistory();
  const { loader } = useSelector((state) => state.authenticateReducer);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const toRegisterPage = () => {
    history.push('/register');
  };

  let onFinish = () => {
    dispatch({
      type: actions.LOGIN,
      payload: {
        username: userName,
        password: userPassword,
        usertype: userType,
      },
    });
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
          value={userName}
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
          value={userPassword}
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
          htmlType='submit'
          className='login-form-button'
          size='large'
        >
          Log in
        </Button>
      </Form.Item>
      <Form.Item className='login-form-button-link'>
        <Button type='link' size='large' onClick={() => toRegisterPage()}>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
}
