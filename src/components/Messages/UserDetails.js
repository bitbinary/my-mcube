import React from 'react';
import { Card, Avatar } from 'antd';
// import { EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;
export default function UserDetails() {
  return (
    <Card
      style={{ width: '100%' }}
      cover={
        <div>
          <Avatar
            large
            src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
          />
        </div>
      }
      // actions={[
      //   <SettingOutlined key='setting' />,
      //   <EllipsisOutlined key='ellipsis' />,
      // ]}
    >
      <Meta title='Amel Johny' description='Online' />
    </Card>
  );
}
