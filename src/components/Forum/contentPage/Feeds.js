import React, { useEffect, useState, useRef } from 'react';
import actions from 'redux/Forum/actions';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Feed from './utils/Feed';
import searcher from 'components/tools/searcher';
import { Space, Empty } from 'antd';
import Buttons from 'components/utils/Buttons';
import ProjectModal from 'components/Profile/ProjectModal';
import sorter from 'components/tools/sorter';
import capitalize from 'components/tools/capitalize';

export default function Feeds({ projectId }) {
  const dispatch = useDispatch();
  const { contentFeeds, feedLoading, feedSortBy, feedSearchString } =
    useSelector((state) => state.forumReducer);
  let currentContentFeed = useRef(contentFeeds);
  const [data, setData] = useState([]);
  const [idForModal, setIdForModal] = useState('');
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isProjectModalVisible, setIsProjectModalVisible] = useState(false);
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
  function getDummy() {
    let numberofDummy = 5;
    let dummyData = [];
    for (var i = 0; i < numberofDummy; i++) {
      dummyData.push({ title: `dummy${i}`, loading: true });
    }
    return dummyData;
  }
  useEffect(() => {
    // eslint-disable-next-line
    // eslint-disable-next-line
    // projectId;
    var newData = [...currentContentFeed.current, ...getDummy()];
    if (projectId) {
      console.log(projectId === data?.project_id);

      newData = newData.filter((data) => {
        return data?.project_id === projectId;
      });
    }
    setData(newData);
    dispatch({
      type: actions.GETFEEDS,
      params: { filters: [], type: [] },
    });
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    let sortedContent = sorter([...contentFeeds], feedSortBy);
    var newData = [...sortedContent];
    if (projectId) {
      console.log(projectId === data?.project_id);

      newData = newData.filter((data) => {
        return data?.project_id === projectId;
      });
    }
    setData(newData);
    return () => {};
  }, [contentFeeds]);
  useEffect(() => {
    let filteredContent = searcher(
      feedSearchString,
      [...contentFeeds],
      ['title'],
    );
    let sortedContent = sorter([...filteredContent], feedSortBy);
    var newData = [...sortedContent];
    if (projectId) {
      newData = newData.filter((data) => {
        return data?.project_id === projectId;
      });
    }
    setData(newData);
    return () => {};
  }, [feedSortBy, feedSearchString]);

  const addMoreFeeds = () => {
    // dispatch({
    //   type: actions.FEEDLOADING,
    //   isloading: true,
    // });
    // setData([...data, ...getDummy()]);
    // dispatch({
    //   type: actions.ADDFEEDS,
    //   params: { filters: [], type: [] },
    // });
  };
  if (data.length > 0) {
    return (
      <>
        <ProjectModal
          isProjectModalVisible={isProjectModalVisible}
          projectId={idForModal}
          handleProjectModalCancel={handleCancel}
        />
        <InfiniteScroll
          pageStart={0}
          initialLoad={false}
          loadMore={() => addMoreFeeds()}
          hasMore={true || false}
          // element={ListWrapper}
          loader={
            <div className='feed-loader-wrapper' key={0}>
              {/* <Space direction='vertical'>
                <Buttons
                  type='primary'
                  loading={feedLoading}
                  handleClick={() => addMoreFeeds()}
                  content={feedLoading ? 'Loading More' : 'Load More'}
                ></Buttons>
              </Space> */}
            </div>
          }
          threshold={100}
        >
          <Space size={10} className='full-wide' direction='vertical'>
            {data.map((feed, index) => {
              return (
                <Feed
                  key={feed.post_id}
                  index={index}
                  project_id={feed.project_id}
                  firstName={capitalize(feed.first_name)}
                  lastName={capitalize(feed.last_name)}
                  title={feed.title || 'Default Post Title'}
                  description={feed.content}
                  lastModified={feed.last_modified}
                  createdAt={feed.timestamp}
                  postOwner={feed.user_id}
                  commentCount={feed.comments?.length || 0}
                  comments={feed.comments}
                  loading={feed?.loading}
                  postId={feed.post_id}
                  userId={feed.user_id}
                  handleClick={handleMoreDetails}
                  dontRenderViewProject={projectId ? true : false}
                />
              );
            })}
          </Space>
        </InfiniteScroll>
      </>
    );
  } else if (feedLoading) {
    return (
      <Empty
        image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
        imageStyle={{
          height: 60,
        }}
        description={<span>Collecting Feeds...</span>}
      ></Empty>
    );
  } else {
    return (
      <Empty
        image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
        imageStyle={{
          height: 60,
        }}
        description={<span>No Feeds...</span>}
      >
        <Buttons handleClick={addMoreFeeds} content='Retry loading feeds' />
      </Empty>
    );
  }
}
