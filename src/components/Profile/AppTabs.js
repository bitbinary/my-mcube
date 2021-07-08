import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import Projects from './Projects';
import Skills from './Skills';
import Reviews from './Reviews';

function AppTabs() {
  const { TabPane } = Tabs;

  const tabStyle = {
    marginLeft: '150px',
    marginBottom: '20px',
    padding: '50px',
    backgroundColor: '#bfbfbf29',
    width: '1200px',
    height: '490px',
    overflowY: 'scroll',
    border: '1px solid rgb(43, 43, 183)',
  };

  return (
    <>
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
    </>
  );
}

export default AppTabs;
