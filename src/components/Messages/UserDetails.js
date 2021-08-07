import React from 'react';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getRandomColor } from 'components/tools/colorGenerator';

const { Meta } = Card;
export default function UserDetails({ userName }) {
  return (
    <Card
      style={{ width: '100%' }}
      className='messager-user-details-card'
      cover={
        <div>
          <Avatar
            large
            icon={<UserOutlined />}
            style={{
              backgroundColor: getRandomColor(),
            }}
          />
        </div>
      }
      // actions={[
      //   <SettingOutlined key='setting' />,
      //   <EllipsisOutlined key='ellipsis' />,
      // ]}
    >
      <Meta title={userName} />
    </Card>
  );
}
