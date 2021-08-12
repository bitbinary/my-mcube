import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Divider, Modal, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/Profile/actions';

function EditProfileModal({ isModalVisible, userId, handleCancel }) {
  const { Paragraph, Text } = Typography;
  const { confirm } = Modal;
  const { Option } = Select;

  const { profileData } = useSelector((state) => state.profileReducer);
  const [editUsername, setUsername] = useState(profileData?.profile?.username);
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

  // const [interestListComponent, setInterestListComponent] = useState(null);
  // console.log(profileData?.interest?.topic);
  // useEffect(() => {
  //   let interestListComponent1 = null;
  //   interestListComponent1 = profileData?.interest?.topic
  //     .substring(1, profileData?.interest?.topic.length - 1)
  //     .split(',')
  //     .map(function (intr) {
  //       return (
  //         <Option value={intr.substring(1, intr.length - 1)}>
  //           <div className='demo-option-label-item'>
  //             {intr.substring(1, intr.length - 1)}
  //           </div>
  //         </Option>
  //       );
  //     });
  //   setInterestListComponent(interestListComponent1);
  // }, []);

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
              username: String(editUsername),
              first_name: String(editFirstName),
              last_name: String(editLastName),
              email: String(editEmail),
              contact_number: String(editContactNo),
              location_city: String(editCity),
              location_state: String(editState),
              location_country: String(editCountry),
              location_zip_code: String(editZipCode),
              title: String(editTitle),
              linkedin: String(editLinkedInURL),
            },
          },
        });

        handleCancel();
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
          <Text strong>Username:</Text>
        </Col>
        <Col lg={8} md={15} sm={20} xs={20}>
          <Paragraph editable={{ onChange: setUsername }}>
            {editUsername}
          </Paragraph>
        </Col>
        <Col lg={4} md={15} sm={20} xs={20}>
          <Text strong>Title:</Text>
        </Col>
        <Col lg={8} md={15} sm={20} xs={20}>
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
      {/* <Divider />
      <Row gutter={[16, 24]}>
        <Col lg={4} md={15} sm={20} xs={20}>
          <Text strong>Interests:</Text>
        </Col>
        <Col lg={12} md={15} sm={20} xs={20}>
          {interestListComponent && (
            <Select
              mode='multiple'
              style={{ width: '80%' }}
              placeholder='select skills'
            >
              {interestListComponent}
            </Select>
          )}
        </Col>
      </Row> */}
    </Modal>
  );
}

export default EditProfileModal;
