import { Card, Tabs } from 'antd';
import LoginForm from './LoginForm';
const { TabPane } = Tabs;
function LoginPage() {
  function callback(key) {}

  return (
    <>
      <div className='container-login'>
        <Card title='Login' style={{ margin: 'auto', borderRadius: '8px' }}>
          <Tabs defaultActiveKey='mentee' onChange={callback}>
            <TabPane tab='Mentee' key='mentee'>
              <LoginForm userType='Mentee' />
            </TabPane>
            <TabPane tab='Mentor' key='mentor'>
              <LoginForm userType='Mentor' />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </>
  );
}

export default LoginPage;
