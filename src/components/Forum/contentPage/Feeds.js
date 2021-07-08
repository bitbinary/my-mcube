import React, { useEffect } from 'react';
import actions from 'redux/Forum/actions';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Feed from './utils/Feed';
import { Spin } from 'antd';
export default function Feeds() {
  const dispatch = useDispatch();
  const { contentFeeds } = useSelector((state) => state.forumReducer);

  useEffect(() => {
    // eslint-disable-next-line
    if (contentFeeds.length === 0)
      // eslint-disable-next-line
      dispatch({
        type: actions.GETFEEDS,
        params: { filters: [], type: [] },
      });
    return () => {};
  }, [dispatch, contentFeeds]);

  const addMoreFeeds = () => {
    dispatch({
      type: actions.ADDFEEDS,
      params: { filters: [], type: [] },
    });
    return () => {};
  };
  return (
    <InfiniteScroll
      pageStart={0}
      initialLoad={false}
      loadMore={() => addMoreFeeds()}
      hasMore={true || false}
      loader={
        <div className='feed-loader-wrapper' key={0}>
          <Spin size='large' />
        </div>
      }
      threshold={50}
    >
      {contentFeeds.map((feed, index) => (
        <Feed key={feed.title + index} />
      ))}
    </InfiniteScroll>
    // <List
    //   itemLayout='vertical'
    //   size='large'
    //   // pagination={{
    //   //   onChange: (page) => {
    //   //     console.log(page);
    //   //   },
    //   //   pageSize: 3,
    //   // }}
    //   dataSource={contentFeeds}
    //   footer={
    //     <div>
    //       <b>ant design</b> footer part
    //     </div>
    //   }
    //   renderItem={(item) => <Feed {...item} />}
    // />
  );
}
