import { useDispatch } from 'react-redux';
import actions from 'redux/Authenticate/actions';
import { useSelector } from 'react-redux';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
function RegisterPage() {
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
    <>
      {/* <PageHeader
        className='site-page-header'
        title='Registration'
        subTitle='Welcome Onboard'
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
                type='secondary'
                onClick={() => toLoginPage()}
                className='login-form-button'
                size='large'
              >
                Sign in
              </Button>
            </Form.Item>
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
          </Form>
        </Card>
      </div>
    </>
  );
}

export default RegisterPage;
