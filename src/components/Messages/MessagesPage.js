import React, { useState, useEffect } from 'react';
import { Layout, Menu, Tooltip, Avatar, Empty } from 'antd';
import UserDetails from './UserDetails';
import UserMessager from './utils/UserMessager';
import { truncateName } from 'components/tools/getTruncatedName';
import { getRandomColor } from 'components/tools/colorGenerator';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/Messages/actions';
import { useInterval } from 'components/tools/useInterval';
import logoimg from 'assets/logo/medium.png';
import AppTexts from 'components/utils/AppTexts';

const { Content, Sider } = Layout;
export default function MessagesPage() {
  const { userId } = useSelector((state) => state.authenticateReducer);
  const { contacts } = useSelector((state) => state.messageReducer);
  const { profileData } = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [activeContact, setActiveContact] = useState(contacts?.[0]);
  useEffect(() => {
    dispatch({
      type: actions.GETCONTACTS,
      userId: userId,
    });
    return () => {};
  }, []);
  useInterval(() => {
    // put your interval code here.
    dispatch({
      type: actions.GETCONTACTS,
      userId: userId,
    });
    return () => {};
  }, 1000 * 1);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  const onCollapseToggle = () => {
    setCollapsed(!collapsed);
  };
  const onContactSelect = (id) => {
    let selectedContact = contacts.filter((contact) => contact?.user_id === id);
    setActiveContact(selectedContact[0]);
  };
  return (
    <div className='messages-page-wrapper'>
      <Layout>
        <Sider
          collapsed={collapsed}
          onCollapse={onCollapse}
          style={{
            position: 'absolute',
            left: 0,
            zIndex: 999,
          }}
        >
          <UserDetails
            userName={`${profileData?.profile?.first_name}
                ${profileData?.profile?.last_name}`}
          />
          <Menu
            theme='dark'
            mode='inline'
            onSelect={(event) => onContactSelect(event.key)}
            defaultSelectedKeys={[contacts?.[0]?.user_id]}
          >
            {contacts
              ? contacts.map((contact) => (
                  <Menu.Item
                    key={contact?.user_id}
                    className='messager-sidebar-menu-item'
                    icon={
                      <Avatar
                        style={{
                          backgroundColor: getRandomColor(contact?.first_name),
                        }}
                        className='message-menu-item-avatar'
                        // icon={<UserOutlined />}
                      >
                        {truncateName(
                          `${contact.first_name} ${contact.last_name}`,
                        )}
                      </Avatar>
                    }
                  >
                    <Tooltip title={contact.first_name} placement='right'>
                      {`${contact.first_name} ${contact.last_name}`}
                    </Tooltip>
                  </Menu.Item>
                ))
              : null}
          </Menu>
        </Sider>
        <Layout style={!collapsed ? { marginLeft: 205 } : { marginLeft: 85 }}>
          <Content style={{}}>
            {activeContact ? (
              <UserMessager
                contact={activeContact}
                collapsed={collapsed}
                handleBack={onCollapseToggle}
              />
            ) : (
              <Empty
                className='empty-chat'
                image={logoimg}
                imageStyle={{
                  height: 60,
                }}
                description={
                  <AppTexts
                    className='strong'
                    // content='Please select a contact to start'
                  />
                }
              ></Empty>
            )}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
