import React from 'react';
import { Skeleton, Card, Avatar } from 'antd';
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
    <div className='project-card-wrapper'>
      <Card
        style={{ width: 300, marginTop: 16 }}
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
                style={{ backgroundColor: getRandomColor() }}
              />
            }
            title={project_title}
            description={project_description}
            style={{ textAlign: 'left' }}
          />
        </Skeleton>
      </Card>
    </div>
  );
}
// data.project_description
// data.project_id
// data.project_location
// data.project_requirement
// data.project_start_date
// data.project_title
// data.score
