import React from 'react';
import { Button, Card, Col } from 'antd';
import { ExpandOutlined, DeleteOutlined } from '@ant-design/icons';

function ProjectCard({ openProjectModel }) {
  const handleClick = () => {
    openProjectModel('projectID');
  };
  return (
    <Col lg={8} md={12} sm={24} xs={24}>
      <Card
        title='Chat Application'
        className='list-card'
        style={{ borderWidth: 'medium' }}
        actions={[
          <Button>
            <DeleteOutlined key='delete' />
            Delete Project
          </Button>,
          <Button onClick={() => handleClick()}>
            <ExpandOutlined key='expand' />
            View Project
          </Button>,
        ]}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </Card>
    </Col>
  );
}

export default ProjectCard;
