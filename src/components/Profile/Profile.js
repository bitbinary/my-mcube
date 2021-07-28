import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/Profile/actions';
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
import { getRandomColor } from '../tools/colorGenerator';

function Profile() {
  const { Paragraph } = Typography;
  const dispatch = useDispatch();

  const [userId, setUserId] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { profileData } = useSelector((state) => state.profileReducer);

  useEffect(() => {
    dispatch({
      type: actions.GETUSERDETAILS,
      payload: {
        user_id: 1,
      },
    });
  }, []);

  var interestsList = profileData?.interest?.topic
    .substring(1, profileData?.interest?.topic.length - 1)
    .split(',')
    .map(function (interest) {
      return (
        <Tag color={getRandomColor(interest)}>
          {interest.substring(1, interest.length - 1)}
        </Tag>
      );
    });

  // const handleClick = () => {
  //   openEditUsertModel('userId');
  // };

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
    window.open(`mailto: ${url}`, '_blank');
  };

  return (
    <>
      <EditProfileModal
        isModalVisible={isModalVisible}
        userId={userId}
        handleCancel={handleCancel}
      />
      <div className='view-container'>
        <Row className='profile-wrapper-header'>
          <Col lg={3} md={8} sm={24} xs={24}>
            <div className='profile-wrapper-header-div'>
              <Avatar
                style={{
                  // backgroundColor: 'rgb(154 160 164)',
                  backgroundColor: getRandomColor('Navya'),
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
                content={`${profileData?.profile?.first_name}
                  ${profileData?.profile?.last_name}`}
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                }}
              />
              <AppTitles
                className='small'
                content={profileData?.profile?.title}
                style={{ color: 'rgb(0 0 0)' }}
              />
              <div style={{ marginLeft: '1%' }}>{interestsList}</div>
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
              content={`Location: 
                ${profileData?.profile?.city} ,
                ${profileData?.profile?.state},
                ${profileData?.profile?.country},
                ${profileData?.profile?.zipcode}`}
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
              onClick={() => openMailInNewTab(profileData?.profile?.email)}
            />
            <Button
              type='dashed'
              shape='round'
              icon={<LinkedinOutlined />}
              size={20}
              style={{ margin: '4px' }}
              onClick={() => openLinkedinInNewTab(profileData?.profile?.links)}
            />
            <Button
              type='dashed'
              shape='round'
              size={20}
              style={{ margin: '4px' }}
            >
              <Paragraph
                copyable={{
                  text: profileData?.profile?.mobile_no,
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
