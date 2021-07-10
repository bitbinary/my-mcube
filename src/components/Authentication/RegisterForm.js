import React from 'react';
import { useDispatch } from 'react-redux';
import actions from 'redux/Authenticate/actions';
import { useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
export default function RegisterForm() {
  const history = useHistory();
  const { loader } = useSelector((state) => state.authenticateReducer);

  const dispatch = useDispatch();

  let onFinish = () => {
    dispatch({
      type: actions.LOGIN,
      payload: { email: 'eve.holt@reqres.in', password: 'cityslicka' },
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
        name='fullname'
        rules={[
          {
            required: true,
            message: 'Please input your Full Name!',
          },
        ]}
      >
        <Input
          size='large'
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Full Name'
          autoComplete='Full Name'
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
