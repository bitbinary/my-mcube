import React from 'react';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import AppTexts from 'components/utils/AppTexts';
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
export default function Feed({ color, id, name, pantone_value, year }) {
  return (
    <List.Item
      key={id}
      actions={[
        <IconText icon={StarOutlined} text='156' key='list-vertical-star-o' />,
        <IconText icon={LikeOutlined} text='156' key='list-vertical-like-o' />,
        <IconText
          icon={MessageOutlined}
          text='2'
          key='list-vertical-message'
        />,
      ]}
      extra={
        <img
          width={272}
          alt='logo'
          src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
        />
      }
    >
      <List.Item.Meta
        avatar={
          <Avatar style={{ backgroundColor: color }} icon={<UserOutlined />} />
        }
        title={<AppTexts>{name}</AppTexts>}
        description={year}
      />
      {pantone_value}
    </List.Item>
  );
}
