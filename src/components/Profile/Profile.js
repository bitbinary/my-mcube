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
import ViewWrapper from './utils/ViewWrapper.js';
import AppTexts from 'components/utils/AppTexts.js';
import { useHistory } from 'react-router-dom';
import avatarImg from 'assets/avatar.jpg';
function Profile({ user_id }) {
  const { Paragraph } = Typography;
  const dispatch = useDispatch();
  let history = useHistory();

  // const [userId, setUserId] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { profileData } = useSelector((state) => state.profileReducer);
  const { userId } = useSelector((state) => state.authenticateReducer);
  useEffect(() => {
    dispatch({
      type: actions.GETUSERDETAILS,
      payload: {
        user_id: user_id ? user_id : userId,
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

  const openEditUsertModel = () => {
    // setUserId(UserId);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function openChatModule() {
    history.push('/messages');
  }

  const openLinkedinInNewTab = (url) => {
    window.open(url, '_blank');
  };

  const openMailInNewTab = (url) => {
    window.open(`mailto: ${url}`, '_blank');
  };

  return profileData ? (
    <ViewWrapper grid={true}>
      <EditProfileModal
        isModalVisible={isModalVisible}
        userId={userId}
        handleCancel={handleCancel}
      />
      <Row className='profile-wrapper-header'>
        <div className='profile-wrapper-header-div'>
          <Avatar
            src={avatarImg}
            style={{
              // backgroundColor: 'rgb(154 160 164)',
              backgroundColor: getRandomColor('Navya'),
              margin: 'auto',
            }}
            size={{
              xs: 50,
              sm: 50,
              md: 80,
              lg: 80,
              xl: 100,
              xxl: 100,
            }}
            // icon={<UserOutlined />}
          />
        </div>

        <Col lg={15} md={15} sm={24} xs={24}>
          <div>
            <AppTitles
              className='large'
              content={`${profileData?.profile?.first_name}
                ${profileData?.profile?.last_name}`}
              style={{
                fontWeight: 'bold',
              }}
            />
            <AppTexts
              className='medium italics'
              content={`Title: ${profileData?.profile?.title}`}
            />
            <div className='italics' style={{ marginLeft: '1%' }}>
              Interests: {interestsList}
            </div>
          </div>
        </Col>
        <Col
          lg={6}
          md={12}
          sm={24}
          xs={24}
          style={{
            justifyContent: 'flex-end',
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Row justify='start' align='start'>
            <AppTitles
              content={<HomeTwoTone style={{ fontSize: '25px' }} size='30px' />}
              style={{ fontWeight: 'bold' }}
            />
            <AppTitles
              size='small'
              content={`
              ${profileData?.profile?.city} ,
              ${profileData?.profile?.state},
              ${profileData?.profile?.country},
              ${profileData?.profile?.zipcode}`}
            />
          </Row>

          <div>
            <Button
              type='dashed'
              shape='round'
              icon={<WechatOutlined />}
              size={20}
              style={{ margin: '4px' }}
              onClick={openChatModule}
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
          </div>
          <Button
            type='primary'
            shape='round'
            icon={<EditOutlined />}
            onClick={() => openEditUsertModel()}
            style={{ position: 'absolute', top: '0px', right: '0px' }}
          >
            Edit
          </Button>
        </Col>
      </Row>
      <AppTabs />
    </ViewWrapper>
  ) : null;
}

export default Profile;
