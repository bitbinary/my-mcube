import React, { useState } from 'react';
import { Input, Form, List, Spin, Avatar, Space, notification } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import AppTexts from './AppTexts';
import Buttons from './Buttons';
import { UserOutlined } from '@ant-design/icons';
import { getRandomColor } from 'components/tools/colorGenerator';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/Forum/actions';
import { getRequest } from 'Config/axiosClient';
import { useInterval } from 'components/tools/useInterval';
import Comment from './Comment';

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item className='comment-input-wrapper'>
      <TextArea
        placeholder='Enter your comments here'
        className='add-comment-input'
        rows={4}
        onChange={onChange}
        value={value}
        onPressEnter={onSubmit}
      />
    </Form.Item>
    <Form.Item className='comment-submit-wrapper'>
      <Buttons
        htmlType='submit'
        loading={submitting}
        handleClick={onSubmit}
        type='primary'
        content='Add Comment'
      ></Buttons>
    </Form.Item>
  </>
);
export default function CommentsContainer({ postId, defaultComments = [] }) {
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([...defaultComments]);
  // const [data, setData] = useState([])
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.authenticateReducer);
  useInterval(async () => {
    const response = await getRequest(`posts/comments/${postId.split('_')[1]}`);
    setComments(response?.data?.data?.comments || []);

    return () => {};
  }, 1000 * 1);
  const [loading] = useState(false);
  const [hasMore] = useState(true);
  const handleSubmit = () => {
    if (newComment.length === 0) {
      notification['info']({
        message: 'Please enter comment',
        // description: response?.data?.message,
        placement: 'bottomRight',
      });
      return;
    }
    dispatch({
      type: actions.ADDCOMMENT,
      payload: {
        userId: Number(userId),
        postId: Number(postId.split('_')[1]),
        comment: newComment,
      },
    });
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setNewComment('');
    }, 1000);
  };
  const handleChange = (e) => {
    setNewComment(e.target.value);
  };
  const handleInfiniteOnLoad = (e) => {};
  return (
    <Space direction='vertical' className='comment-list-spacer'>
      <div className='comments-infinite-container'>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!loading && hasMore}
          useWindow={false}
        >
          <List
            key={comments?.length}
            itemLayout='vertical'
            dataSource={comments}
            renderItem={(item) => <Comment key={item.comment_id} item={item} />}
          >
            {loading && hasMore && (
              <div className='demo-loading-container'>
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
      <Editor
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitting={submitting}
        value={newComment}
      />
    </Space>
  );
}
