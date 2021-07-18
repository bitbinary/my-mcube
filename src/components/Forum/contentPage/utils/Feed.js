import React, { useState } from 'react';
import { List, Avatar, Space, Skeleton, Tooltip } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import AppTexts from 'components/utils/AppTexts';
import ViewWrapper from 'components/Forum/contentPage/utils/ViewWrapper';
import CommentsWrapper from 'components/utils/CommentsWrapper';
import moment from 'moment';

const IconText = ({ icon, text, handleClick }) => (
  <Space onClick={handleClick}>
    {'Comments'}
    {React.createElement(icon)}
    {text}
  </Space>
);
const defaultText =
  'The Career Ready Mentoring Program connects UNSW students from their second year of study onwards with established industry professionals, providing students with a significant opportunity to focus on career development during the transition from study to work.';
export default function Feed({
  index,
  title,
  description,
  lastModified,
  createdAt,
  postOwner,
  commentCount,
  ...rest
}) {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const toggleComments = () => {
    setCommentsVisible(!commentsVisible);
  };
  return (
    <ViewWrapper>
      <List className='feed-list-wrapper'>
        <List.Item
          key={title + index}
          actions={[
            <IconText
              icon={MessageOutlined}
              text={commentCount}
              handleClick={toggleComments}
              key='list-vertical-message'
            />,
          ]}
          className='feed-list-item'
        >
          <Skeleton loading={{ ...rest }?.loading} active avatar>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={
                <>
                  <AppTexts
                    className='mediumlarge'
                    content='Re:Regarding Project'
                  ></AppTexts>
                  <Tooltip
                    title={moment()
                      .subtract(1, 'days')
                      .format('YYYY-MM-DD HH:mm:ss')}
                  >
                    <AppTexts
                      content={moment(createdAt).subtract(1, 'days').fromNow()}
                    />
                  </Tooltip>
                </>
              }
              description={<AppTexts content={defaultText} />}
            />
          </Skeleton>
        </List.Item>
        {commentsVisible && <CommentsWrapper id={title} />}
      </List>
    </ViewWrapper>
  );
}
