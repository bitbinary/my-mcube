import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
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
import { getRequest, postRequest, deleteRequest } from 'Config/axiosClient';
import { getRandomColor } from 'components/tools/colorGenerator';
import { dateToUTC } from 'components/tools/date';
import AppTitles from 'components/utils/AppTitles';
import AppTexts from 'components/utils/AppTexts';
import { useSelector } from 'react-redux';
import Collaborators from 'components/utils/Collaborators';
import Feeds from 'components/Forum/contentPage/Feeds';
function ProjectModal({
  isProjectModalVisible,
  projectId,
  handleProjectModalCancel,
}) {
  const { Paragraph, Text } = Typography;
  const [data, setData] = useState(null);
  const [followLoading, setFollowLoading] = useState(false);
  const [collaborators, setCollaborators] = useState(null);
  const { userId } = useSelector((state) => state.authenticateReducer);
  const U_id = `U_${userId}`;
  function handleFollowUnfollow() {
    setFollowLoading(true);
    const id = projectId.split('_')[1];
    if (
      collaborators &&
      collaborators?.map((collaborator) => collaborator.user_id)?.includes(U_id)
    ) {
      deleteRequest(`project/user_id/${id}/${userId}`)
        .then((res) => {
          getCollaborators(id);
          setFollowLoading(false);
        })
        .catch((e) => {
          setFollowLoading(false);
        });
    } else {
      postRequest(`project/user_id/${id}/${userId}`)
        .then((res) => {
          getCollaborators(id);
          setFollowLoading(false);
        })
        .catch((e) => {
          setFollowLoading(false);
        });
    }
  }
  useEffect(() => {
    setData(null);
    const id = projectId.split('_')[1];

    if (isProjectModalVisible) {
      getRequest(`project/${id}`).then((res) => {
        setData(res.data.data);
      });
      getCollaborators(id);
    }
    return () => {};
  }, [isProjectModalVisible]);
  const getCollaborators = (id) => {
    getRequest(`project/user_id/${id}`).then((res) => {
      setCollaborators(res.data.data);
    });
  };
  const tags = data?.skills?.map((skill) => (
    <Tag color={getRandomColor(skill)}>{skill}</Tag>
  ));

  return (
    <div>
      {data ? (
        <Modal
          title={<AppTitles className='medium' content={data?.title} />}
          visible={isProjectModalVisible}
          onCancel={handleProjectModalCancel}
          // onOk={null}
          className='project-modal-wrapper'
          footer={[
            <Button
              key='submit'
              type='primary'
              loading={followLoading}
              onClick={handleFollowUnfollow}
            >
              {console.log(collaborators)}
              {U_id === data?.created_by
                ? null
                : collaborators
                    ?.map((collaborator) => collaborator.user_id)
                    ?.includes(U_id)
                ? 'Unfollow'
                : 'Follow'}
            </Button>,
          ]}
        >
          <Row gutter={[16, 24]}>
            <Col>
              <Text strong>Description:</Text>
              <Paragraph>{data?.description}</Paragraph>
              <Divider />
              <Text strong>Requirements:</Text>
              <Paragraph>{data?.requirement}</Paragraph>
              <Text strong>Start Date:</Text>
              <Paragraph>{dateToUTC(data?.start_date)} AST</Paragraph>
              <Text strong>End Date:</Text>
              <Paragraph>{dateToUTC(data?.end_date)} AST</Paragraph>
              <Text strong>Location:</Text>
              <Paragraph>{data.location}</Paragraph>
              <Text strong>Project status:</Text>
              <Paragraph>{data.status}</Paragraph>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={24}>
              <Text strong>Skills:</Text>
            </Col>
            <Col style={{ marginTop: '1%' }}>{tags}</Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <AppTexts
                    strong
                    containerStyles='nomargin'
                    content='Created By'
                  />

                  <AppTexts
                    content={
                      <>
                        <Avatar
                          style={{
                            backgroundColor: getRandomColor(data?.first_name),
                          }}
                          size={30}
                          icon={<UserOutlined />}
                        />{' '}
                        {`${data?.first_name} ${data?.last_name}`}
                      </>
                    }
                  />
                </Col>
                <Col span={24} style={{ marginTop: '1%' }}></Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <Text strong>Contributors:</Text>
                </Col>
                <Col span={24} style={{ marginTop: '1%' }}>
                  <Avatar.Group
                    maxCount={2}
                    size='medium'
                    maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                  >
                    {collaborators &&
                      collaborators.map((value) => (
                        <Collaborators value={value} />
                      ))}
                  </Avatar.Group>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row xs={24}>
            <AppTitles className='strong medium' content='Related posts' />
            <Col xs={24}>
              <Feeds projectId={projectId} />
            </Col>
          </Row>
        </Modal>
      ) : null}
    </div>
  );
}

export default ProjectModal;
