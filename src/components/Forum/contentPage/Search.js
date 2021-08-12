import React, { useEffect, useState } from 'react';
import actions from 'redux/Forum/actions';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { Row, Empty } from 'antd';
import UserCard from './utils/UserCard';
import ProjectCard from './utils/ProjectCard';
import ProjectModal from 'components/Profile/ProjectModal';
import UserModal from 'components/utils/UserModal';
import ForumPhSearchExtras from '../HeaderExtras/ForumPhSearchExtras';
import capitalize from 'components/tools/capitalize';
import logoimg from 'assets/logo/medium.png';
import sorter from 'components/tools/sorter';

export default function Search() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [idForModal, setIdForModal] = useState('');
  const [userIdModal, setUserIdModal] = useState(null);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isProjectModalVisible, setIsProjectModalVisible] = useState(false);
  const { searchData, searchString, searchLoading } = useSelector(
    (state) => state.forumReducer,
  );
  function getDummy() {
    let numberofDummy = 5;
    let dummyData = [];
    for (var i = 0; i < numberofDummy; i++) {
      dummyData.push({ title: `dummy${i}`, loading: true });
    }
    return dummyData;
  }
  const doSearch = () => {
    dispatch({
      type: actions.TOGGLESTATE,
      payload: { label: 'searchLoading', value: true },
    });
    dispatch({
      type: actions.SEARCHFEEDS,
      params: { searchString: searchString },
    });
  };

  useEffect(() => {
    let results = searchData;
    results = results.filter((result) => result.score > 0);
    setData(results);
    return () => {};
  }, [searchData]);
  // const addMoreFeeds = () => {
  //   setData([...getDummy()]);
  //   doSearch();
  //   return () => {};
  // };

  const handleMoreDetails = (type, id) => {
    console.log(type, id);
    setIdForModal(id);
    if (type === 'project_id') {
      setIsProjectModalVisible(true);
    } else {
      setUserIdModal(id);
      setIsUserModalVisible(true);
    }
  };
  const handleCancel = () => {
    setIsProjectModalVisible(false);
    setIsUserModalVisible(false);
  };
  if (data.length > 0) {
    return (
      <>
        <ProjectModal
          isProjectModalVisible={isProjectModalVisible}
          projectId={idForModal}
          handleProjectModalCancel={handleCancel}
        />
        <UserModal
          isModalVisible={isUserModalVisible}
          projectId={idForModal}
          handleCancel={handleCancel}
          userID={userIdModal}
        />
        <InfiniteScroll
          pageStart={0}
          initialLoad={false}
          // loadMore={}
          hasMore={true || false}
          // element={ListWrapper}
          loader={
            <div className='feed-loader-wrapper' key={0}>
              {/* <Space direction='vertical'>
                <Buttons
                  type='primary'
                  loading={searchLoading}
                  handleClick={() => addMoreFeeds()}
                  content={searchLoading ? 'Loading More' : 'Load More'}
                ></Buttons>
              </Space> */}
            </div>
          }
          threshold={100}
        >
          <Row className='search-result-container' gutter={[24, 24]}>
            {sorter(data, 'score', true)?.map((searchResult, index) =>
              !searchResult?.project_id ? (
                <UserCard
                  key={searchResult.title + index}
                  index={index}
                  city={searchResult.city}
                  country={searchResult.country}
                  first_name={capitalize(searchResult.first_name)}
                  last_name={capitalize(searchResult.last_name)}
                  links={searchResult.links}
                  pic={searchResult.pic}
                  score={searchResult.score}
                  state={searchResult.state}
                  title={searchResult.title}
                  user_id={searchResult.user_id}
                  zipcode={searchResult.zipcode}
                  loading={searchLoading}
                  handleClick={handleMoreDetails}
                />
              ) : (
                <ProjectCard
                  key={searchResult.title + index}
                  index={index}
                  project_description={searchResult.project_description}
                  project_id={searchResult.project_id}
                  project_location={searchResult.project_location}
                  project_requirement={searchResult.project_requirement}
                  project_start_date={searchResult.project_start_date}
                  project_title={searchResult.project_title}
                  score={searchResult.score}
                  loading={searchLoading}
                  handleClick={handleMoreDetails}
                />
              ),
            )}
          </Row>
        </InfiniteScroll>
      </>
    );
  } else if (searchLoading) {
    return (
      <Empty
        className='empty-search'
        image={logoimg}
        imageStyle={{
          height: 60,
        }}
        description={<span>Collecting Search Results...</span>}
      ></Empty>
    );
  } else {
    return (
      <Empty
        className='empty-search'
        image={logoimg}
        description={
          searchData.length === 0 ? (
            <div
              style={{ minWidth: '300px', margin: 'auto', marginTop: '50px' }}
            >
              <ForumPhSearchExtras />
            </div>
          ) : (
            <div
              style={{ minWidth: '300px', margin: 'auto', marginTop: '50px' }}
            >
              {' '}
              <span> No matching results found...</span>
            </div>
          )
        }
      >
        {/* <Buttons handleClick={doSearch} content='Retry Search' /> */}
      </Empty>
    );
  }
}
