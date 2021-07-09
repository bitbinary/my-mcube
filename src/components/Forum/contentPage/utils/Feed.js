import React from 'react';
import { List, Avatar, Space, Skeleton } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import AppTexts from 'components/utils/AppTexts';
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
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
  return (
    <List className='feed-list-wrapper'>
      <List.Item
        key={title + index}
        actions={[
          <IconText
            icon={MessageOutlined}
            text={commentCount}
            key='list-vertical-message'
          />,
        ]}
      >
        <Skeleton loading={{ ...rest }?.loading} active avatar>
          <List.Item.Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            title={<AppTexts>{title}</AppTexts>}
            description={description}
          />
          {description}
        </Skeleton>
      </List.Item>
    </List>
  );
}
