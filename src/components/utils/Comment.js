import React, { useState } from 'react';
import { List, Avatar } from 'antd';

import moment from 'moment';
import AppTexts from './AppTexts';
import { UserOutlined } from '@ant-design/icons';
import { getRandomColor } from 'components/tools/colorGenerator';
import UserModal from './UserModal';

export default function Comment({ item }) {
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [idForModal, setIdForModal] = useState(item.user_id);

  const handleMoreDetails = (type, id) => {
    setIdForModal(id);
    setIsUserModalVisible(true);
  };
  const handleCancel = () => {
    setIsUserModalVisible(false);
  };
  return (
    <List.Item key={item.comment_id}>
      <UserModal
        key={isUserModalVisible}
        isModalVisible={isUserModalVisible}
        userID={idForModal}
        handleCancel={handleCancel}
      />
      <List.Item.Meta
        avatar={
          <Avatar
            icon={<UserOutlined />}
            style={{
              backgroundColor: getRandomColor(item.message),
            }}
            onClick={() => handleMoreDetails('user_id', item.user_id)}
          />
        }
        title={
          <>
            <AppTexts
              containerStyles='comment-name-container'
              className='medium'
              content={`${item?.first_name} ${item?.last_name}`}
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
      <div style={{ marginLeft: '58px' }}>
        <AppTexts content={item.message} />
      </div>
    </List.Item>
  );
}
