import React, { useState } from 'react';
import { Avatar, Space, Skeleton, Tag, Col, Button, Card, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ExpandOutlined } from '@ant-design/icons';
import { getRandomColor } from 'components/tools/colorGenerator';
import UserModal from 'components/utils/UserModal';

const defaultText =
  'The Career Ready Mentoring Program connects UNSW students from their second year of study.';
export default function RecommMM({
  // index,
  // city,
  // country,
  // profilePicLink,
  firstName,
  lastName,
  // email,
  user_id,
  skills,
  loading,
  // userType,
  handleClick,
}) {
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [idForModal, setIdForModal] = useState(null);

  const handleMoreDetails = (type, id) => {
    console.log(id);
    setIdForModal(id);
    setIsUserModalVisible(true);
  };
  const handleCancel = () => {
    setIsUserModalVisible(false);
  };
  return (
    <>
      <UserModal
        isModalVisible={isUserModalVisible}
        userID={idForModal}
        handleCancel={handleCancel}
      />
      <Col lg={8} md={12} sm={24} xs={24}>
        <Skeleton loading={loading} avatar active>
          <Card
            title={
              <div style={{ textAlign: 'left' }}>
                <Space align='start' wrap>
                  <Avatar
                    icon={<UserOutlined />}
                    style={{ backgroundColor: getRandomColor(firstName) }}
                  ></Avatar>
                  <>
                    {firstName || 'Amel'}
                    {lastName || 'Johny'}
                  </>
                </Space>
              </div>
            }
            className='list-card'
            style={{ float: 'left' }}
            actions={[
              <Button
                type='ghost'
                onClick={() => handleMoreDetails('user_id', user_id)}
              >
                <ExpandOutlined key='expand' />
                View details
              </Button>,
            ]}
          >
            <div style={{ display: 'flex', flex: 1 }}> {defaultText}</div>
            <Divider />
            <Space wrap>
              {skills?.split(',').map((skill) => (
                <Tag color='#2db7f5'>{skill}</Tag>
              ))}
            </Space>
            <Tag className='card-user-type' color='#3ca6b5'>
              User
            </Tag>
          </Card>
        </Skeleton>
      </Col>
    </>
  );
}
