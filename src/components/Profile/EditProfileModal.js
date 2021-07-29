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
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/Profile/actions';

function EditProfileModal({ isModalVisible, userId, handleCancel }) {
  const { Paragraph, Text } = Typography;
  const { confirm } = Modal;
  const { Search } = Input;

  const { profileData } = useSelector((state) => state.profileReducer);
  const [editFirstName, setFirstName] = useState(
    profileData?.profile?.first_name,
  );
  const [editLastName, setLastName] = useState(profileData?.profile?.last_name);
  const [editEmail, setEmail] = useState(profileData?.profile?.email);
  const [editContactNo, setContactNo] = useState(
    profileData?.profile?.mobile_no,
  );
  const [editCity, setCity] = useState(profileData?.profile?.city);
  const [editState, setState] = useState(profileData?.profile?.state);
  const [editCountry, setCountry] = useState(profileData?.profile?.country);
  const [editZipCode, setZipCode] = useState(profileData?.profile?.zipcode);
  const [editTitle, setTitle] = useState(profileData?.profile?.title);
  const [editLinkedInURL, setLinkedInURL] = useState(
    profileData?.profile?.links,
  );

  const dispatch = useDispatch();

  function showConfirm() {
    confirm({
      title: 'Do you want to save the changes?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch({
          type: actions.EDITUSERDETAILS,
          payload: {
            user_id: userId,
            profile: {
              // mail

              firstName: editFirstName,
              lastName: editLastName,
              contactNumber: editContactNo,
              locationCity: editCity,
              locationState: editState,
              locationCountry: editCountry,
              locationZipCode: editZipCode,
              title: editTitle,
              linkedin: editLinkedInURL,
            },
          },
        });
        dispatch({
          type: actions.GETUSERDETAILS,
          payload: {
            user_id: userId,
          },
        });
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
