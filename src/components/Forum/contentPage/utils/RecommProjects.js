import React from 'react';
import { Avatar, Space, Tag, Col, Button, Card, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ExpandOutlined } from '@ant-design/icons';
import { getRandomColor } from 'components/tools/colorGenerator';

// const defaultText =
//   'The Career Ready Mentoring Program connects UNSW students from their second year of study.';
export default function RecommProjects({
  projectTitle,
  firstName,
  lastName,
  projectDescription,
  // email,
  // projectStatus,
  // user_id,
  project_id,
  // loading,
  // userType,
  // location,
  // startDate,
  skills,
  handleClick,
}) {
  return (
    <Col lg={8} md={12} sm={24} xs={24}>
      <Card
        className='list-card'
        title={
          <>
            <div style={{ textAlign: 'left' }}>
              <Space align='start' wrap>
                <Avatar
                  icon={<UserOutlined />}
                  style={{
                    float: 'left',
                    backgroundColor: getRandomColor(firstName),
                  }}
                />
                <>
                  {firstName || 'Amel'}
                  {lastName || 'Johny'}
                </>
                <>{projectTitle || 'Project Title'}</>
              </Space>
            </div>
          </>
        }
        // style={{}}
        actions={[
          <Button onClick={() => handleClick('project_id', project_id)}>
            <ExpandOutlined key='expand' />
            View Project
          </Button>,
        ]}
      >
        <div style={{ display: 'flex', flex: 1 }}>{projectDescription}</div>
        <Divider />
        <Space wrap>
          {skills.split(',').map((skill) => (
            <Tag color='#2db7f5'>{skill}</Tag>
          ))}
        </Space>
        <Tag className='card-user-type' color='#ffb12e'>
          Project
        </Tag>
      </Card>
    </Col>
  );
}
