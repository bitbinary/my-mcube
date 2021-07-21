import React, { useState } from 'react';
import { Row, Col, Tag, Button, Typography, Avatar } from 'antd';
import AppTitles from 'components/utils/AppTitles';
import AppTabs from './AppTabs.js';
import {
  UserOutlined,
  WechatOutlined,
  MailOutlined,
  LinkedinOutlined,
  EditOutlined,
  HomeTwoTone,
  PhoneOutlined,
  PhoneFilled,
} from '@ant-design/icons';
import EditProfileModal from './EditProfileModal.js';

function Profile() {
  const { Paragraph } = Typography;

  const [userId, setUserId] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = () => {
    openEditUsertModel('userId');
  };

  const openEditUsertModel = (UserId) => {
    setUserId(UserId);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const openLinkedinInNewTab = (url) => {
    window.open(url, '_blank');
  };

  const openMailInNewTab = (url) => {
    window.open('mailto:' + url, '_blank');
  };

  return (
    <>
      <EditProfileModal
        isModalVisible={isModalVisible}
        userId={userId}
        handleCancel={handleCancel}
      />
      <div>
        <Row className='profile-wrapper-header'>
          <Col lg={3} md={8} sm={24} xs={24}>
            <div className='profile-wrapper-header-div'>
              <Avatar
                style={{
                  backgroundColor: 'rgb(154 160 164)',
                  marginTop: '5%',
                  marginLeft: '5%',
                }}
                size={{
                  xs: 100,
                  sm: 100,
                  md: 100,
                  lg: 100,
                  xl: 120,
                  xxl: 140,
                }}
                icon={<UserOutlined />}
              />
            </div>
          </Col>

          <Col lg={15} md={15} sm={24} xs={24}>
            <div>
              <AppTitles
                className='large'
                content='Navya Vashisht'
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                }}
              />
              <AppTitles
                className='small'
                content='Master of Information Technology - UNSW'
                style={{ color: 'rgb(0 0 0)' }}
              />
              <div style={{ marginLeft: '1%' }}>
                <Tag color='magenta'>Data Science</Tag>
                <Tag color='cyan'>Java</Tag>
                <Tag color='lime'>AI</Tag>
                <Tag color='orange'>Python</Tag>
              </div>
            </div>
          </Col>
          <Col lg={6} md={12} sm={24} xs={24}>
            <span>
              <AppTitles
                content={
                  <HomeTwoTone style={{ fontSize: '25px' }} size='30px' />
                }
                style={{ fontWeight: 'bold' }}
              />
            </span>
            <AppTitles
              size='small'
              content='Location: UNSW, Kensington, Sydney, NSW'
            />
            <Button
              type='dashed'
              shape='round'
              icon={<WechatOutlined />}
              size={20}
              style={{ margin: '4px' }}
            />
            <Button
              type='dashed'
              shape='round'
              icon={<MailOutlined />}
              size={20}
              style={{ margin: '4px' }}
              onClick={() => openMailInNewTab('navya@gmail.com')}
            />
            <Button
              type='dashed'
              shape='round'
              icon={<LinkedinOutlined />}
              size={20}
              style={{ margin: '4px' }}
              onClick={() =>
                openLinkedinInNewTab(
                  'https://www.linkedin.com/in/arpitmathur1/',
                )
              }
            />
            <Button
              type='dashed'
              shape='round'
              size={20}
              style={{ margin: '4px' }}
            >
              <Paragraph
                copyable={{
                  text: '+610000000000',
                  icon: [
                    <PhoneOutlined key='copy-icon' />,
                    <PhoneFilled key='copied-icon' />,
                  ],
                  tooltips: ['Copy Contact info!', 'Copied!'],
                }}
              ></Paragraph>
            </Button>
            <Button
              type='primary'
              icon={<EditOutlined />}
              onClick={() => openEditUsertModel()}
            >
              Edit Profile
            </Button>
          </Col>
        </Row>
      </div>
      <AppTabs />
    </>
  );
}

export default Profile;
