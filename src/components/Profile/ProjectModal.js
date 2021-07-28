import React from 'react';
import { UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Row,
  Col,
  Modal,
  Typography,
  Divider,
  Tag,
  Avatar,
  Button,
} from 'antd';

function ProjectModal({ isModalVisible, projectId, handleCancel }) {
  const { Paragraph, Text } = Typography;
  const { confirm } = Modal;

  function showConfirm() {
    confirm({
      title: 'Do you want to join the project?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        alert('OK');
      },
    });
  }

  return (
    <div className='project-modal-wrapper'>
      <Modal
        title='Project'
        visible={isModalVisible}
        onCancel={handleCancel}
        // onOk={null}
        width='100%'
        footer={[
          <Button key='submit' type='primary' loading={false} onClick={null}>
            Join
          </Button>,
        ]}
        style={{ maxWidth: 1600 }}
      >
        <Row gutter={[16, 24]}>
          <Col>
            <Text strong>Description:</Text>
            <Paragraph>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Paragraph>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24}>
            <Text strong>Skills:</Text>
          </Col>
          <Col style={{ marginTop: '1%' }}>
            <Tag color='magenta'>Data Science</Tag>
            <Tag color='cyan'>Java</Tag>
            <Tag color='lime'>AI</Tag>
            <Tag color='orange'>Data Science</Tag>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Text strong>Created By:</Text>
              </Col>
              <Col span={24} style={{ marginTop: '1%' }}>
                <Avatar
                  style={{
                    backgroundColor: 'rgb(154 160 164)',
                  }}
                  size={30}
                  icon={<UserOutlined />}
                />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Text strong>Contributors:</Text>
              </Col>
              <Col span={24} style={{ marginTop: '1%' }}>
                <Avatar
                  style={{
                    backgroundColor: 'rgb(154 160 164)',
                  }}
                  size={30}
                  icon={<UserOutlined />}
                />
                <Avatar
                  style={{
                    backgroundColor: 'rgb(154 160 164)',
                  }}
                  size={30}
                  icon={<UserOutlined />}
                />
                <Avatar
                  style={{
                    backgroundColor: 'rgb(154 160 164)',
                  }}
                  size={30}
                  icon={<UserOutlined />}
                />
                <Avatar
                  style={{
                    backgroundColor: 'rgb(154 160 164)',
                  }}
                  size={30}
                  icon={<UserOutlined />}
                />
                <Avatar
                  style={{
                    backgroundColor: 'rgb(154 160 164)',
                  }}
                  size={30}
                  icon={<UserOutlined />}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default ProjectModal;
