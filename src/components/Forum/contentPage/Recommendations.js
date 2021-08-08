import React, { useEffect, useState } from 'react';
import actions from 'redux/Forum/actions';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import RecommMM from './utils/RecommM&M';
import { Space, Empty, Row } from 'antd';
import Buttons from 'components/utils/Buttons';
import RecommProjects from './utils/RecommProjects';
import ProjectModal from 'components/Profile/ProjectModal';
import UserModal from 'components/utils/UserModal';
import capitalize from 'components/tools/capitalize';
import logoimg from 'assets/logo/medium.png';

export default function Recommendations() {
  const dispatch = useDispatch();
  const {
    recommLoading,
    recommselectedtype,
    contentRecommMentees,
    contentRecommMentors,
    contentRecommProjects,
  } = useSelector((state) => state.forumReducer);
  const { userId } = useSelector((state) => state.authenticateReducer);
  const [idForModal, setIdForModal] = useState('');
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isProjectModalVisible, setIsProjectModalVisible] = useState(false);
  var displayData = [];
  // function getDummy() {
  //   let numberofDummy = 5;
  //   let dummyData = [];
  //   for (var i = 0; i < numberofDummy; i++) {
  //     dummyData.push({ title: `dummy${i}`, loading: true });
  //   }
  //   return dummyData;
  // }
  useEffect(() => {
    dispatch({
      type: actions.GETRECOMM,
      params: { user_id: userId, recommType: recommselectedtype },
    });
    return () => {};
  }, [recommselectedtype, dispatch]);

  const addMoreRecomm = () => {
    dispatch({
      type: actions.RECOMMLOADING,
      isloading: true,
    });
    switch (recommselectedtype) {
      case 'project':
        dispatch({
          type: actions.ADDRECOMM,
          params: { user_id: userId, recommType: recommselectedtype },
        });
        break;
      case 'mentees':
        dispatch({
          type: actions.ADDRECOMM,
          params: { user_id: userId, recommType: recommselectedtype },
        });
        break;
      case 'mentor':
        dispatch({
          type: actions.ADDRECOMM,
          params: { user_id: userId, recommType: recommselectedtype },
        });
        break;
      default:
        return null;
    }
  };

  const handleMoreDetails = (type, id) => {
    setIdForModal(id);
    if (type === 'project_id') {
      setIsProjectModalVisible(true);
    } else {
      setIsUserModalVisible(true);
    }
  };

  const handleCancel = () => {
    setIsProjectModalVisible(false);
    setIsUserModalVisible(false);
  };
  if (recommselectedtype === 'project') displayData = contentRecommProjects;
  else if (recommselectedtype === 'mentees') displayData = contentRecommMentees;
  else displayData = contentRecommMentors;

  if (displayData.length > 0) {
    return (
      <>
        <ProjectModal
          isModalVisible={isProjectModalVisible}
          projectId={idForModal}
          handleCancel={handleCancel}
        />
        <UserModal
          isModalVisible={isUserModalVisible}
          projectId={idForModal}
          handleCancel={handleCancel}
        />
        <InfiniteScroll
          pageStart={0}
          initialLoad={false}
          loadMore={() => addMoreRecomm()}
          hasMore={true || false}
          // element={ListWrapper}
          loader={
            <div className='Recomm-loader-wrapper' key={0}>
              {/* <Space direction='vertical'>
                <Buttons
                  type='primary'
                  loading={recommLoading}
                  handleClick={() => addMoreRecomm()}
                  content={recommLoading ? 'Loading More' : 'Load More'}
                ></Buttons>
              </Space> */}
            </div>
          }
          threshold={150}
        >
          <Row className='recommendation-container' gutter={[16, 16]}>
            {displayData.map((recomm, index) =>
              recommselectedtype !== 'project' ? (
                <RecommMM
                  key={recomm?.first_name + index}
                  index={index}
                  city={recomm?.city}
                  country={recomm?.country}
                  profilePicLink={recomm?.profile_link}
                  firstName={capitalize(recomm?.first_name)}
                  lastName={capitalize(recomm?.last_name)}
                  email={recomm?.email}
                  user_id={recomm?.user_id}
                  skills={recomm?.skill_name}
                  loading={recomm?.loading}
                  userType={recomm?.user_type}
                  handleClick={handleMoreDetails}
                />
              ) : (
                <RecommProjects
                  index={index}
                  key={recomm?.first_name + index}
                  projectTitle={recomm?.title}
                  firstName={capitalize(recomm?.first_name)}
                  lastName={capitalize(recomm?.last_name)}
                  projectDescription={recomm?.description}
                  email={recomm?.email}
                  projectStatus={recomm?.status}
                  user_id={recomm?.user_id}
                  project_id={recomm?.project_id}
                  loading={recomm?.loading}
                  userType={recomm?.user_type}
                  location={recomm?.location}
                  startDate={recomm?.start_date}
                  skills={recomm?.skill_name}
                  handleClick={handleMoreDetails}
                />
              ),
            )}
          </Row>
        </InfiniteScroll>
      </>
    );
  } else if (recommLoading) {
    return (
      <Empty
        className='empty-search'
        image={logoimg}
        imageStyle={{
          height: 60,
        }}
        description={<span>Collecting Recommendations...</span>}
      >
        {contentRecommMentors}
        {contentRecommMentees}
        {contentRecommProjects}
      </Empty>
    );
  } else {
    return (
      <Empty
        className='empty-search'
        image={logoimg}
        imageStyle={{
          height: 60,
        }}
        description={<span>Waiting for Recommendations...</span>}
      >
        <Buttons handleClick={addMoreRecomm} content='Retry loading Recomm' />
      </Empty>
    );
  }
}
