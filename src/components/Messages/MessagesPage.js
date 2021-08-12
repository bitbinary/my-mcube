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
import { useLocation } from 'react-router-dom';
import { getRequest } from 'Config/axiosClient';
import MessageSearchSelect from 'components/utils/MessageSearchSelect';
import removeDuplicate from 'components/tools/removeDuplicate';

const { Content, Sider } = Layout;
export default function MessagesPage() {
  const { userId } = useSelector((state) => state.authenticateReducer);
  const { contacts, allUsers, tempContact } = useSelector(
    (state) => state.messageReducer,
  );
  const { profileData } = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  let contactData = [];
  const [activeContact, setActiveContact] = useState(contacts?.[0]);
  const [selectedAcontact, setSelectedAcontact] = useState(contacts?.[0]);

  const location = useLocation();
  useEffect(() => {
    setSelectedAcontact(activeContact?.user_id);
    return () => {};
  }, [activeContact]);

  useEffect(() => {
    let existingUsers = [...contacts, ...tempContact].map(
      (contact) => contact.user_id,
    );
    let nonExiting = tempContact.filter(
      (data) => !existingUsers.includes(data.user_id),
    );
    dispatch({
      type: actions.FORCEUPDATE,
      payload: { item: 'tempContact', value: nonExiting },
    });
    var id = `U_${location?.state?.userId}`;

    if (location?.state?.userId) {
      let existingUsers = [...contacts, ...tempContact].map(
        (contact) => contact.user_id,
      );
      if (existingUsers.includes(id)) {
        var user = [...contacts, ...tempContact].filter((item) => {
          return item.user_id === id;
        });
        console.log(user);
        setActiveContact(user[0]);
        setSelectedAcontact(user[0].user_id);
      } else {
        var user = allUsers.filter((item) => {
          return item.user_id === id;
        });
        dispatch({
          type: actions.FORCEUPDATE,
          payload: { item: 'tempContact', value: [...tempContact, ...user] },
        });
        setActiveContact(user[0]);
        setSelectedAcontact(user[0]?.user_id);
      }

      // setdata(nonExiting);
      // setFilteredData(nonExiting);
    }
    return () => {};
  }, [contacts]);

  useEffect(() => {
    dispatch({
      type: actions.GETCONTACTS,
      userId: userId,
    });
    const response = getRequest('user/name_list/');
    response.then((res) => {
      dispatch({
        type: actions.FORCEUPDATE,
        payload: { item: 'allUsers', value: res.data.data },
      });
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
  const onContactSelect = (user) => {
    if (user?.user_id) {
      // let selectedContact = [...contacts, ...tempContact].filter(
      //   (contact) => contact?.user_id === id,
      // );
      // console.log(selectedContact[0]);
      setActiveContact(user);
      setSelectedAcontact(user?.user_id);
    }
  };
  const onMenuSelect = (id) => {
    let selectedContact = [...contacts, ...tempContact].filter(
      (contact) => contact?.user_id === id,
    );
    console.log(selectedContact);
    setActiveContact(selectedContact[0]);
    setSelectedAcontact(selectedContact?.user_id);
    // }
  };
  contactData = removeDuplicate([...contacts, ...tempContact], 'user_id');
  contactData = contactData.filter(
    (contact) => contact.user_id !== `U_${userId}`,
  );
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
            onSelect={(event) => onMenuSelect(event.key)}
            defaultSelectedKeys={'search'}
            selectedKeys={[selectedAcontact || 'search']}
          >
            <Menu.Item
              key={'search'}
              className='messager-sidebar-menu-item'
              icon={
                <Avatar
                  style={{
                    backgroundColor: getRandomColor('search'),
                  }}
                  className='message-menu-item-avatar'
                  // icon={<UserOutlined />}
                >
                  {truncateName('search users')}
                </Avatar>
              }
            >
              <Tooltip title='Search' placement='right'>
                Search Users
              </Tooltip>
            </Menu.Item>
            {contactData
              ? contactData.map((contact) => (
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
                          `${contact?.first_name} ${contact?.last_name}`,
                        )}
                      </Avatar>
                    }
                  >
                    <Tooltip title={contact.first_name} placement='right'>
                      {`${contact?.first_name} ${contact?.last_name}`}
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
              >
                <MessageSearchSelect setActive={onContactSelect} />
              </Empty>
            )}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
