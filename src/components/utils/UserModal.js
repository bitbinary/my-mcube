import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import Profile from 'components/Profile/Profile';

function UserModal({ isModalVisible, userID, handleCancel }) {
  const { confirm } = Modal;

  function showConfirm() {
    confirm({
      title: 'Do you want to connect?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        alert('OK');
      },
    });
  }

  return (
    <Modal
      title='Chat Application'
      visible={isModalVisible}
      onCancel={handleCancel}
      onOk={showConfirm}
      width='100%'
    >
      <Profile />
    </Modal>
  );
}

export default UserModal;
