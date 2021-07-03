import React, { useState } from 'react';
import { Skeleton, Card, Avatar } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
const { Meta } = Card;

export default function ForumPost() {
  const [loading] = useState(true);
  //   const onChange = (checked) => {
  //     setLoading(!checked);
  //   };
  return (
    <Card
      style={{ marginTop: 16 }}
      actions={[
        <RollbackOutlined key='reply' />,
        <EditOutlined key='edit' />,
        <DeleteOutlined key='delete' />,
      ]}
    >
      {/* <Switch checked={!loading} onChange={onChange} /> */}
      <Skeleton loading={loading} avatar active>
        <Meta
          avatar={
            <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
          }
          title='Feed title'
          description='This is the feed description'
        />
      </Skeleton>
    </Card>
  );
}
