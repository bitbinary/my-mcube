import React from 'react';
import { Skeleton, Card, Avatar, Tag, Col } from 'antd';
import { ExpandOutlined, UserOutlined } from '@ant-design/icons';
import { getRandomColor } from 'components/tools/colorGenerator';
import Buttons from 'components/utils/Buttons';

const { Meta } = Card;
export default function ProjectCard({
  project_description,
  project_id,
  project_location,
  project_requirement,
  project_start_date,
  project_title,
  score,
  loading,
  handleClick,
}) {
  return (
    <Col lg={8} md={12} sm={24} xs={24}>
      <Skeleton loading={loading} avatar active>
        <Card
          style={{ marginTop: 16 }}
          className='list-card'
          actions={[
            null,
            <Buttons
              handleClick={() => handleClick('project_id', project_id)}
              content={
                <>
                  <ExpandOutlined key='expand' /> View Project
                </>
              }
            />,
          ]}
        >
          <Skeleton loading={loading} avatar active>
            <Meta
              avatar={
                <Avatar
                  icon={<UserOutlined />}
                  style={{ backgroundColor: getRandomColor(project_title) }}
                />
              }
              title={project_title}
              description={project_description}
              style={{ textAlign: 'left' }}
            />
          </Skeleton>
          <Tag className='card-user-type' color='#ffb12e'>
            Project
          </Tag>
        </Card>
      </Skeleton>
    </Col>
  );
}
// data.project_description
// data.project_id
// data.project_location
// data.project_requirement
// data.project_start_date
// data.project_title
// data.score
