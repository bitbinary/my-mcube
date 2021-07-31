import React, { useEffect, useState, useRef } from 'react';
import actions from 'redux/Forum/actions';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Feed from './utils/Feed';
import { Space, Empty } from 'antd';
import Buttons from 'components/utils/Buttons';
import ProjectModal from 'components/Profile/ProjectModal';

export default function Feeds() {
  const dispatch = useDispatch();
  const { contentFeeds, feedLoading } = useSelector(
    (state) => state.forumReducer,
  );
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
    setData([...currentContentFeed.current, ...getDummy()]);
    dispatch({
      type: actions.GETFEEDS,
      params: { filters: [], type: [] },
    });
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    setData(contentFeeds);
    return () => {};
  }, [contentFeeds]);
  const addMoreFeeds = () => {
    dispatch({
      type: actions.FEEDLOADING,
      isloading: true,
    });
    setData([...contentFeeds, ...getDummy()]);
    dispatch({
      type: actions.ADDFEEDS,
      params: { filters: [], type: [] },
    });
    return () => {};
  };
  if (data.length > 0) {
    return (
      <>
        <ProjectModal
          isModalVisible={isProjectModalVisible}
          projectId={idForModal}
          handleCancel={handleCancel}
        />
        <InfiniteScroll
          pageStart={0}
          initialLoad={false}
          loadMore={() => addMoreFeeds()}
          hasMore={true || false}
          // element={ListWrapper}
          loader={
            <div className='feed-loader-wrapper' key={0}>
              <Space direction='vertical'>
                <Buttons
                  type='primary'
                  loading={feedLoading}
                  handleClick={() => addMoreFeeds()}
                  content={feedLoading ? 'Loading More' : 'Load More'}
                ></Buttons>
              </Space>
            </div>
          }
          threshold={100}
        >
          <Space size={10} className='full-wide' direction='vertical'>
            {data.map((feed, index) => (
              <Feed
                key={feed.post_id}
                index={index}
                project_id={feed.project_id}
                title={feed.title || 'Default Post Title'}
                description={feed.content}
                lastModified={feed.last_modified}
                createdAt={feed.timestamp}
                postOwner={feed.postOwner}
                commentCount={feed.comments?.length || 0}
                comments={feed.comments}
                loading={feed?.loading}
                postId={feed.post_id}
                userId={feed.user_id}
                handleClick={handleMoreDetails}
              />
            ))}
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
