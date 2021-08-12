import React from 'react';
import { Button, Card, Col, Modal } from 'antd';
import {
  ExpandOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/Profile/actions';

function ProjectCard({ project_data, openProjectModel, user_id }) {
  const { userId } = useSelector((state) => state.authenticateReducer);
  const dispatch = useDispatch();
  const { confirm } = Modal;

  const handleClick = (projectID) => {
    openProjectModel(projectID);
  };
  function showConfirm() {
    confirm({
      title: 'Are you sure you want to remove this project?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch({
          type: actions.DELETEORUNFOLLOWPROJECT,
          payload: {
            user_id: userId,
            project_id: project_data.project_id.split('_')[1],
          },
        });
        dispatch({
          type: actions.GETUSERPROJECTS,
          payload: {
            user_id: userId,
          },
        });
      },
    });
  }
  console.log(user_id, user_id, userId);
  return (
    <Col lg={12} md={24} sm={24} xs={24}>
      <Card
        title={project_data.title}
        className='list-card'
        style={{ borderWidth: 'medium', height: '100%' }}
        actions={[
          user_id && user_id !== userId.split('_')[1] ? null : (
            <Button
              type={
                project_data.created_by.split('_')[1] === userId
                  ? 'danger'
                  : 'primary'
              }
              onClick={showConfirm}
            >
              {project_data.created_by.split('_')[1] === userId ? (
                <DeleteOutlined key='delete' />
              ) : (
                <CloseCircleOutlined key='unfollow' />
              )}
              {project_data.created_by.split('_')[1] === userId
                ? 'Delete'
                : 'Unfollow'}
            </Button>
          ),
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
