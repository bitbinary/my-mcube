import React, { useState } from 'react';
import {
  Row,
  Col,
  Typography,
  Divider,
  Modal,
  Input,
  Tooltip,
  Tag,
} from 'antd';
import {
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  TagsOutlined,
} from '@ant-design/icons';

function EditProfileModal({ isModalVisible, userId, handleCancel }) {
  const { Paragraph, Text } = Typography;
  const { confirm } = Modal;
  const { Search } = Input;
  const [editFirstName, setFirstName] = useState('Navya');
  const [editLastName, setLastName] = useState('Vashisht');
  const [editEmail, setEmail] = useState('navya@gmail.com');
  const [editContactNo, setContactNo] = useState('+610000000000');
  const [editCity, setCity] = useState('Sydney');
  const [editState, setState] = useState('NSW');
  const [editCountry, setCountry] = useState('Australia');
  const [editZipCode, setZipCode] = useState('2033');
  const [editTitle, setTitle] = useState(
    'Master of Information Technology - UNSW',
  );
  const [editLinkedInURL, setLinkedInURL] = useState(
    'https://www.linkedin.com/in/arpitmathur1/',
  );

  function showConfirm() {
    confirm({
      title: 'Do you want to save the changes?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        alert('OK');
      },
    });
  }

  return (
    <Modal
      title='Edit User Profile'
      visible={isModalVisible}
      onCancel={handleCancel}
      onOk={showConfirm}
      width='80%'
    >
      <Row gutter={[16, 24]}>
        <Col lg={4} md={15} sm={20} xs={20}>
          <Text strong>First Name:</Text>
        </Col>
        <Col lg={8} md={15} sm={20} xs={20}>
          <Paragraph editable={{ onChange: setFirstName }}>
            {editFirstName}
          </Paragraph>
        </Col>
        <Col lg={4} md={15} sm={20} xs={20}>
          <Text strong>Last Name:</Text>
        </Col>
        <Col lg={8} md={15} sm={20} xs={20}>
          <Paragraph editable={{ onChange: setLastName }}>
            {editLastName}
          </Paragraph>
        </Col>
        <Col lg={4} md={15} sm={20} xs={20}>
          <Text strong>Email:</Text>
        </Col>
        <Col lg={8} md={15} sm={20} xs={20}>
          <Paragraph editable={{ onChange: setEmail }}>{editEmail}</Paragraph>
        </Col>
        <Col lg={4} md={15} sm={20} xs={20}>
          <Text strong>Contact No. :</Text>
        </Col>
        <Col lg={8} md={15} sm={20} xs={20}>
          <Paragraph editable={{ onChange: setContactNo }}>
            {editContactNo}
          </Paragraph>
        </Col>
        <Col lg={4} md={15} sm={20} xs={20}>
          <Text strong>Title:</Text>
        </Col>
        <Col lg={20} md={20} sm={20} xs={20}>
          <Paragraph editable={{ onChange: setTitle }}>{editTitle}</Paragraph>
        </Col>
        <Col lg={4} md={15} sm={20} xs={20}>
          <Text strong>LinkedIn URL:</Text>
        </Col>
        <Col lg={20} md={20} sm={20} xs={20}>
          <Paragraph editable={{ onChange: setLinkedInURL }}>
            {editLinkedInURL}
          </Paragraph>
        </Col>
        <Col lg={4} md={15} sm={20} xs={20}>
          <Text strong>City:</Text>
        </Col>
        <Col lg={8} md={15} sm={20} xs={20}>
          <Paragraph editable={{ onChange: setCity }}>{editCity}</Paragraph>
        </Col>
        <Col lg={4} md={15} sm={20} xs={20}>
          <Text strong>State:</Text>
        </Col>
        <Col lg={8} md={15} sm={20} xs={20}>
          <Paragraph editable={{ onChange: setState }}>{editState}</Paragraph>
        </Col>
        <Col lg={4} md={15} sm={20} xs={20}>
          <Text strong>Country:</Text>
        </Col>
        <Col lg={8} md={15} sm={20} xs={20}>
          <Paragraph editable={{ onChange: setCountry }}>
            {editCountry}
          </Paragraph>
        </Col>
        <Col lg={4} md={15} sm={20} xs={20}>
          <Text strong>Zip code:</Text>
        </Col>
        <Col lg={8} md={15} sm={20} xs={20}>
          <Paragraph editable={{ onChange: setZipCode }}>
            {editZipCode}
          </Paragraph>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 24]}>
        <Col lg={4} md={15} sm={20} xs={20}>
          <Text strong>Interests:</Text>
        </Col>
        <Col lg={12} md={15} sm={20} xs={20}>
          <Search
            placeholder='Add new tag'
            enterButton='Add Tag'
            size='small'
            prefix={<TagsOutlined className='site-form-item-icon' />}
            suffix={
              <Tooltip title='Only Add new tag if already not present!'>
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
            }
          />
        </Col>
        <Col span={24}>
          <Tag color='#1890ff'>Python</Tag>
          <Tag color='#1890ff'>AI</Tag>
          <Tag color='#1890ff'>Java</Tag>
          <Tag color='#1890ff'>Node.js</Tag>
        </Col>
      </Row>
    </Modal>
  );
}

export default EditProfileModal;
