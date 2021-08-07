import React, { useEffect, useState } from 'react';
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
  Tooltip,
} from 'antd';
import { getRequest } from 'Config/axiosClient';
import { getRandomColor } from 'components/tools/colorGenerator';

function ProjectModal({
  isProjectModalVisible,
  projectId,
  handleProjectModalCancel,
}) {
  const { Paragraph, Text } = Typography;
  const { confirm } = Modal;
  const [data, setData] = useState(null);

  function showConfirm() {
    confirm({
      title: 'Do you want to join the project?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        alert('OK');
      },
    });
  }
  useEffect(() => {
    setData(null);
    const id = projectId.split('_')[1];
    if (isProjectModalVisible) {
      getRequest(`project/${id}`).then((res) => {
        setData(res.data.data[0]);
      });
    }
    return () => {};
  }, [isProjectModalVisible]);
  return (
    <div>
      {data ? (
        <Modal
          title={data?.title}
          visible={isProjectModalVisible}
          onCancel={handleProjectModalCancel}
          // onOk={null}
          className='project-modal-wrapper'
          footer={[
            <Button key='submit' type='primary' loading={false} onClick={null}>
              Join
            </Button>,
          ]}
        >
          <Row gutter={[16, 24]}>
            <Col>
              <Text strong>Description:</Text>
              <Paragraph>{data?.description}</Paragraph>
            </Col>
          </Row>
          {/* <Divider />
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
        </Row> */}
          <Divider />
          <Row>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <Text strong>{`${data?.created_by} Ukesh`}</Text>
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
                  {[
                    'Mark Tom',
                    'MAtherw Jackk',
                    'Jikosh jayunga',
                    'Jintara Filanda',
                    'Mikoshi Kara',
                    'Innachi yako',
                  ].map((value) => (
                    <Tooltip title={value} placement='bottom'>
                      <Avatar
                        style={{
                          backgroundColor: getRandomColor(value),
                        }}
                        size={30}
                        icon={<UserOutlined />}
                      />
                    </Tooltip>
                  ))}
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal>
      ) : null}
    </div>
  );
}

export default ProjectModal;
