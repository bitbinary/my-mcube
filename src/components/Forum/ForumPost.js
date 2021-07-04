import React from 'react';
import { Skeleton, Card, Avatar } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
const { Meta } = Card;

export default function ForumPost() {
  const { loader } = useSelector((state) => state.forumReducer);
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
      <Skeleton loading={loader} avatar active>
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
