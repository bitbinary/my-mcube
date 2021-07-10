import React from 'react';
import { Tabs } from 'antd';
import UserDetails from './UserDetails';
import UserMessager from './utils/UserMessager';

const { TabPane } = Tabs;
export default function MessagesPage() {
  return (
    <div className='messages-page-wrapper'>
      <Tabs tabBarExtraContent={{ left: <UserDetails /> }} tabPosition='left'>
        <TabPane className='messages-tab-pane' tab='Amel Johny' key='ameljohny'>
          <UserMessager />
        </TabPane>
        <TabPane className='messages-tab-pane' tab='R S Kamal' key='kamalrs'>
          <UserMessager />
        </TabPane>
        <TabPane
          className='messages-tab-pane'
          tab='Arpit Mathur'
          key='arpitmathur'
        >
          <UserMessager />
        </TabPane>
      </Tabs>
    </div>
  );
}
