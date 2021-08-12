import { UserOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { getRandomColor } from 'components/tools/colorGenerator';
import React, { useState } from 'react';
import UserModal from './UserModal';

export default function Collaborators({ value }) {
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [idForModal, setIdForModal] = useState(null);

  const handleMoreDetails = (type, id) => {
    setIdForModal(id);
    setIsUserModalVisible(true);
  };
  const handleCancel = () => {
    setIsUserModalVisible(false);
  };
  return (
    <>
      <UserModal
        isModalVisible={isUserModalVisible}
        userID={idForModal}
        handleCancel={handleCancel}
      />
      <Tooltip
        title={`${value.first_name} ${value.last_name}`}
        placement='bottom'
      >
        <Avatar
          style={{
            backgroundColor: getRandomColor(
              `${value.first_name} ${value.last_name}`,
            ),
          }}
          onClick={() => handleMoreDetails('user_id', value.user_id)}
          size={30}
          icon={<UserOutlined />}
        />
      </Tooltip>
    </>
  );
}
