import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Empty, Modal } from 'antd';
import Profile from 'components/Profile/Profile';

function UserModal({ isModalVisible, userID, handleCancel }) {
  let id = userID?.split('_')[1];

  return id ? (
    <Modal
      title='User Profile'
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      width='100%'
      style={{
        maxWidth: 1000,
        height: '80%',
      }}
    >
      {<Profile user_id={id} />}
    </Modal>
  ) : null;
}

export default UserModal;
