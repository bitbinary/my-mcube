import React from 'react';
import { Tabs } from 'antd';
import Projects from './Projects';
import Skills from './Skills';
import Reviews from './Reviews';

function AppTabs() {
  const { TabPane } = Tabs;

  const tabStyle = {
    margin: 'auto',
    padding: '2%',
    width: '75%',
  };

  return (
    <Tabs defaultActiveKey='1' size='large' centered>
      <TabPane tab='Projects' key='1' style={tabStyle}>
        <Projects />
      </TabPane>
      <TabPane tab='Skills' key='2' style={tabStyle}>
        <Skills />
      </TabPane>
      <TabPane tab='Reviews' key='3' style={tabStyle}>
        <Reviews />
      </TabPane>
    </Tabs>
  );
}

export default AppTabs;
