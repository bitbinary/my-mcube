import React from 'react';
import { Button, Card, Col } from 'antd';
import { ExpandOutlined, DeleteOutlined } from '@ant-design/icons';

function ProjectCard({ project_data, openProjectModel }) {
  const handleClick = (projectID) => {
    openProjectModel(projectID);
  };
  return (
    <Col lg={12} md={12} sm={24} xs={24}>
      <Card
        title={project_data.title}
        className='list-card'
        style={{ borderWidth: 'medium', height: '100%' }}
        actions={[
          <Button type='danger'>
            <DeleteOutlined key='delete' />
            Delete
          </Button>,
          <Button onClick={() => handleClick(project_data.project_id)}>
            <ExpandOutlined key='expand' />
            View
          </Button>,
        ]}
      >
        <div className='text-wrapper'>{project_data.description}</div>
      </Card>
    </Col>
  );
}

export default ProjectCard;
