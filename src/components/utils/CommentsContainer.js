import React, { useState } from 'react';
import { Tooltip, Input, Form, List, Spin, Avatar, Space } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import AppTexts from './AppTexts';
import Buttons from './Buttons';
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
        title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
];
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item className='comment-input-wrapper'>
      <TextArea
        className='add-comment-input'
        rows={4}
        onChange={onChange}
        value={value}
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
export default function CommentsContainer({ ItemId }) {
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState('');
  // const [data, setData] = useState([])
  const [loading] = useState(false);
  const [hasMore] = useState(true);
  const handleSubmit = () => {
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
    <>
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
              dataSource={[...data]}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                    }
                    title={
                      <AppTexts href='https://ant.design'>
                        {item.title}
                      </AppTexts>
                    }
                    description={<AppTexts content={item.content} />}
                  />
                  <div>Extra Content</div>
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
    </>
  );
}
