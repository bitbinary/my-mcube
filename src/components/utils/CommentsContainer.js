import React, { useState } from 'react';
import {
  Tooltip,
  Input,
  Form,
  List,
  Spin,
  Avatar,
  Space,
  notification,
} from 'antd';
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

const { TextArea } = Input;
const data = [
  {
    actions: [],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>{moment().subtract(1, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>{moment().subtract(1, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
];
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
            itemLayout='vertical'
            dataSource={[...comments]}
            renderItem={(item) => (
              <List.Item key={item.comment_id}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      icon={<UserOutlined />}
                      style={{
                        backgroundColor: getRandomColor(item.message),
                      }}
                    />
                  }
                  title={
                    <>
                      <AppTexts
                        containerStyles='comment-name-container'
                        className='medium'
                        content={`${item.first_name || 'first name'} ${
                          item.last_name || 'last name'
                        }`}
                      ></AppTexts>
                      <AppTexts
                        containerStyles='comment-timestamp-container'
                        className='comment-timestamp xsmall'
                        content={moment(new Date(item.timestamp * 1000))
                          .subtract(0, 'days')
                          .fromNow()}
                      />
                    </>
                  }
                  description={<AppTexts content={item.content} />}
                />
                <AppTexts
                  // containerStyle={{ 'padding-left': '50px' }}
                  style={{ paddingLeft: '58px' }}
                  content={item.message}
                />
              </List.Item>
            )}
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
