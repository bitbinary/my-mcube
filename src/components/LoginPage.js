import { useDispatch } from 'react-redux';
import actions from 'redux/Authenticate/actions';
import { useSelector } from 'react-redux';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
function LoginPage() {
  const history = useHistory();
  const { loader } = useSelector((state) => state.authenticateReducer);

  const dispatch = useDispatch();

  let onFinish = () => {
    dispatch({
      type: actions.LOGIN,
      payload: { email: 'eve.holt@reqres.in', password: 'cityslicka' },
    });
  };
  const toRegisterPage = () => {
    history.push('/register');
  };

  return (
    <>
      {/* <PageHeader
        className='site-page-header'
        title='Login'
        subTitle='Welcome back'
      /> */}

      <div className='container-login'>
        <Card style={{ margin: 'auto', borderRadius: '8px' }}>
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
            <Form.Item>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>

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
            <Form.Item>
              <Button
                type='secondary'
                className='login-form-button'
                size='large'
                onClick={() => toRegisterPage()}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default LoginPage;
