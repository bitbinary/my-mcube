import { Card, Tabs } from 'antd';
import RegisterForm from './RegisterForm';
const { TabPane } = Tabs;

function RegisterPage() {
  function callback(key) {}
  return (
    <>
      <div className='container-login'>
        <Card
          title='Registration'
          style={{ margin: 'auto', borderRadius: '8px' }}
        >
          <Tabs defaultActiveKey='mentee' onChange={callback}>
            <TabPane tab='Mentee' key='mentee'>
              <RegisterForm userType='mentee' />
            </TabPane>
            <TabPane tab='Mentor' key='mentor'>
              <RegisterForm userType='mentor' />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </>
  );
}

export default RegisterPage;
