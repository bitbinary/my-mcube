import React from 'react';
import { Tabs } from 'antd';
import Projects from './Projects';
import Skills2 from './Skills2';
import Skills from './Skills';
import Reviews from './Reviews';

function AppTabs({ user_id }) {
  const { TabPane } = Tabs;

  const tabStyle = {
    margin: 'auto',
    padding: '2%',
    width: '75%',
  };

  return (
    <Tabs className='profile-tabs' defaultActiveKey='1' size='large' centered>
      <TabPane tab='Projects' key='1' style={tabStyle}>
        <Projects user_id={user_id} />
      </TabPane>
      {!user_id ? (
        <TabPane tab='Skills' key='2' style={tabStyle}>
          <Skills user_id={user_id} />
        </TabPane>
      ) : null}
      <TabPane tab='Reviews' key='3' style={tabStyle}>
        <Reviews user_id={user_id} />
      </TabPane>
    </Tabs>
  );
}

export default AppTabs;
