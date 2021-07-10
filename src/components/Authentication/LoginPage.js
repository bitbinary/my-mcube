import { Card, Tabs } from 'antd';
import LoginForm from './LoginForm';
const { TabPane } = Tabs;
function LoginPage() {
  function callback(key) {}
  return (
    <>
      {/* <PageHeader
        className='site-page-header'
        title='Login'
        subTitle='Welcome back'
      /> */}

      <div className='container-login'>
        <Card title='Login' style={{ margin: 'auto', borderRadius: '8px' }}>
          <Tabs defaultActiveKey='mentee' onChange={callback}>
            <TabPane tab='Mentee' key='mentee'>
              <LoginForm userType='mentee' />
            </TabPane>
            <TabPane tab='Mentor' key='mentor'>
              <LoginForm userType='mentor' />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </>
  );
}

export default LoginPage;
