import React from 'react';
import { Avatar, Space, Skeleton, Tag, Col, Button, Card, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ExpandOutlined } from '@ant-design/icons';
import { getRandomColor } from 'components/tools/colorGenerator';

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
  return (
    <Col lg={12} md={12} sm={24} xs={24}>
      <Skeleton loading={loading} avatar active>
        <Card
          title={
            <div style={{ textAlign: 'left' }}>
              <Space align='start' wrap>
                <Avatar
                  icon={<UserOutlined />}
                  style={{ backgroundColor: getRandomColor() }}
                ></Avatar>
                <>
                  {firstName || 'Amel'}
                  {lastName || 'Johny'}
                </>
              </Space>
            </div>
          }
          style={{ float: 'left' }}
          actions={[
            <Button
              type='ghost'
              onClick={() => handleClick('user_id', user_id)}
            >
              <ExpandOutlined key='expand' />
              View details
            </Button>,
          ]}
        >
          {' '}
          {defaultText}
          <Divider />
          <Space wrap>
            {skills.split(',').map((skill) => (
              <Tag color='#2db7f5'>{skill}</Tag>
            ))}
          </Space>
        </Card>
      </Skeleton>
    </Col>
  );
}
