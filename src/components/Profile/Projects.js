import React, { useEffect, useState } from 'react';
import { Row, PageHeader, Button, Empty } from 'antd';
import ProjectCard from './ProjectCard';
import InfiniteScroll from 'react-infinite-scroller';
import ProjectModal from './ProjectModal';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/Profile/actions';
import AddProjectModal from './AddProjectModal';
import { PlusOutlined } from '@ant-design/icons';
import Buttons from 'components/utils/Buttons';

function Projects({ user_id }) {
  const dispatch = useDispatch();
  const [projectId, setProjectId] = useState('');
  const [isProjectModalVisible, setIsProjectModalVisible] = useState(false);
  const [data, setData] = useState(null);
  const [isAddProjectModalVisible, setIsAddProjectModalVisible] =
    useState(false);
  const [itemsArray, setItemsArray] = useState([1, 2, 3]);
  const [hasMoreContents, setHasMoreContents] = useState(true);

  const { userProjectList, userProjectListTemp } = useSelector(
    (state) => state.profileReducer,
  );
  const { userId } = useSelector((state) => state.authenticateReducer);

  useEffect(() => {
    user_id
      ? dispatch({
          type: actions.GETTEMPUSERPROJECTS,
          payload: {
            user_id: user_id,
          },
        })
      : dispatch({
          type: actions.GETUSERPROJECTS,
          payload: {
            user_id: userId,
          },
        });
  }, []);

  useEffect(() => {
    if (user_id) {
      setData(userProjectListTemp[user_id]);
    } else {
      setData(userProjectList);
    }
    return () => {};
  }, [userProjectListTemp, userProjectList, user_id]);

  const openProjectModel = (projectId) => {
    setProjectId(projectId);
    setIsProjectModalVisible(true);
  };

  const openAddProjectModel = () => {
    // setUserId(UserId);
    setIsAddProjectModalVisible(true);
  };

  const handleProjectModalCancel = () => {
    setIsProjectModalVisible(false);
  };

  const handleAddProjectModalCancel = () => {
    setIsAddProjectModalVisible(false);
  };

  const fetchMoreProjects = () => {
    let temp_arr;
    temp_arr = [...itemsArray, 1];
    setItemsArray(temp_arr);
    if (temp_arr.length === 15) {
      setHasMoreContents(false);
    }
  };

  return (
    <>
      <ProjectModal
        isProjectModalVisible={isProjectModalVisible}
        projectId={projectId}
        handleProjectModalCancel={handleProjectModalCancel}
      />
      <AddProjectModal
        isAddProjectModalVisible={isAddProjectModalVisible}
        handleAddProjectModalCancel={handleAddProjectModalCancel}
      />
      <PageHeader
        className='forum-page-header'
        title='Projects'
        extra={
          user_id === undefined
            ? [
                <Button
                  type='primary'
                  shape='round'
                  icon={<PlusOutlined />}
                  disabled={user_id !== undefined ? true : false}
                  onClick={() => openAddProjectModel()}
                >
                  Add project
                </Button>,
              ]
            : []
        }
      ></PageHeader>
      {data?.length > 0 ? (
        <InfiniteScroll
          hasMore={hasMoreContents}
          initialLoad={false}
          pageStart={1}
          loadMore={() => fetchMoreProjects()}
          threshold={1}
        >
          <Row gutter={[16, 16]}>
            {data?.map((i, index) => (
              <ProjectCard
                user_id={user_id}
                key={i?.project_id}
                project_data={i}
                openProjectModel={openProjectModel}
              />
            ))}
          </Row>
        </InfiniteScroll>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{
            height: 60,
          }}
          description={<span>No Projects yet</span>}
        ></Empty>
      )}
    </>
  );
}

export default Projects;
