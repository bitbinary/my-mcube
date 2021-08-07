import React, { useEffect, useState } from 'react';
import { Row, PageHeader, Button } from 'antd';
import ProjectCard from './ProjectCard';
import InfiniteScroll from 'react-infinite-scroller';
import ProjectModal from './ProjectModal';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/Profile/actions';
import AddProjectModal from './AddProjectModal';
import { PlusOutlined } from '@ant-design/icons';

function Projects() {
  const dispatch = useDispatch();
  const [projectId, setProjectId] = useState('');
  const [isProjectModalVisible, setIsProjectModalVisible] = useState(false);
  const [isAddProjectModalVisible, setIsAddProjectModalVisible] =
    useState(false);
  const [itemsArray, setItemsArray] = useState([1, 2, 3]);
  const [hasMoreContents, setHasMoreContents] = useState(true);

  const { userProjectList } = useSelector((state) => state.profileReducer);
  const { userId } = useSelector((state) => state.authenticateReducer);

  useEffect(() => {
    dispatch({
      type: actions.GETUSERPROJECTS,
      payload: {
        user_id: userId,
      },
    });
  }, []);

  const openProjectModel = (projectId) => {
    console.log(projectId);
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
        title='Projects'
        subTitle='User Projects'
        extra={[
          <Button
            type='primary'
            shape='round'
            icon={<PlusOutlined />}
            onClick={() => openAddProjectModel()}
          >
            Add project
          </Button>,
        ]}
      ></PageHeader>
      <InfiniteScroll
        hasMore={hasMoreContents}
        initialLoad={false}
        pageStart={1}
        loadMore={() => fetchMoreProjects()}
        threshold={1}
        loader={
          <div className='feed-loader-wrapper'>
            {/* <Buttons
              type='primary'
              // loading={projectsLoading}
              handleClick={() => fetchMoreProjects()}
              content={'Load More'}
            ></Buttons> */}
          </div>
        }
      >
        <Row gutter={[16, 16]}>
          {userProjectList.map((i, index) => (
            <ProjectCard
              key={index}
              project_data={i}
              openProjectModel={openProjectModel}
            />
          ))}
        </Row>
      </InfiniteScroll>
    </>
  );
}

export default Projects;
