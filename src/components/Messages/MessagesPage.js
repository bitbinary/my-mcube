import React, { useState } from 'react';
import { Layout, Menu, Tooltip, Avatar } from 'antd';
import UserDetails from './UserDetails';
import UserMessager from './utils/UserMessager';
import { truncateName } from 'components/tools/getTruncatedName';

const { Content, Sider } = Layout;
const contacts = [
  { name: 'Amel Johny', status: 'Active', userId: 'asdf' },
  { name: 'Amel Johny1', status: 'Away', userId: 'asdf1' },
  { name: 'Amel Johny2', status: 'Active', userId: 'asdf2' },
  { name: 'Kamal RS', status: 'Away', userId: 'aaws' },
  { name: 'RS kamal', status: 'Active', userId: 'asasdf' },
  { name: 'Arpit', status: 'Active', userId: 'asdadf' },
  { name: 'Arpit Mathur', status: 'Away', userId: 'asddf' },
  { name: 'Amel', status: 'Active', userId: 'asdfff' },
  { name: 'Johny', status: 'Away', userId: 'asdasdf' },
];
export default function MessagesPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeContact, setActiveContact] = useState(contacts[0]);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  const onCollapseToggle = () => {
    setCollapsed(!collapsed);
  };
  const onContactSelect = (id) => {
    let selectedContact = contacts.filter((contact) => contact.userId === id);
    setActiveContact(selectedContact[0]);
  };
  return (
    <div className='messages-page-wrapper'>
      <Layout>
        <Sider
          collapsed={collapsed}
          onCollapse={onCollapse}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'absolute',
            left: 0,
            zIndex: 999,
          }}
        >
          <UserDetails />
          <Menu
            theme='dark'
            mode='inline'
            onSelect={(event) => onContactSelect(event.key)}
            defaultSelectedKeys={[contacts[0].userId]}
          >
            {contacts.map((contact) => (
              <Menu.Item
                key={contact.userId}
                className='messager-sidebar-menu-item'
                icon={
                  <Avatar
                    style={{ backgroundColor: '#87d068' }}
                    className='message-menu-item-avatar'
                    // icon={<UserOutlined />}
                  >
                    {truncateName(contact.name)}
                  </Avatar>
                }
              >
                <Tooltip title={contact.name} placement='right'>
                  {contact.name}
                </Tooltip>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout style={!collapsed ? { marginLeft: 205 } : { marginLeft: 85 }}>
          <Content style={{}}>
            <UserMessager
              contact={activeContact}
              collapsed={collapsed}
              handleBack={onCollapseToggle}
            />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
