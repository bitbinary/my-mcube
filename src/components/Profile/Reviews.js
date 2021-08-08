import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row,
  Col,
  List,
  Avatar,
  Button,
  Rate,
  Collapse,
  Form,
  Input,
  PageHeader,
} from 'antd';
import actions from 'redux/Profile/actions';
import {
  UserOutlined,
  EditOutlined,
  PlusOutlined,
  CloseCircleOutlined,
  SendOutlined,
} from '@ant-design/icons';
import SectionDivider from '../utils/SectionDivider';
import Buttons from '../utils/Buttons';
import ViewWrapper from 'components/Forum/contentPage/utils/ViewWrapper';
import { getRandomColor } from '../tools/colorGenerator';

function Reviews() {
  const { Panel } = Collapse;
  const { TextArea } = Input;
  const dispatch = useDispatch();

  const { userReviewsList } = useSelector((state) => state.profileReducer);
  const { userId } = useSelector((state) => state.authenticateReducer);
  const [newReviewToggle, setNewReviewToggle] = useState(false);
  useEffect(() => {
    dispatch({
      type: actions.GETUSERREVIEWS,
      payload: {
        user_id: userId,
      },
    });
  }, []);

  const toggleNewReview = () => {
    setNewReviewToggle(!newReviewToggle);
  };

  return (
    <>
      <PageHeader
        title='Reviews'
        subTitle='User Reviews'
        extra={[
          <Button
            type='primary'
            shape='round'
            icon={<PlusOutlined />}
            content='New Review'
            onClick={toggleNewReview}
          >
            Add Review
          </Button>,
        ]}
      ></PageHeader>
      {newReviewToggle && (
        <ViewWrapper>
          <List className='feed-list-wrapper'>
            <List.Item>Add a Review</List.Item>
            <List.Item>
              <TextArea placeholder='Add review here!' rows={4} />
            </List.Item>
            <List.Item
              key='new review'
              className='feed-list-item'
              actions={[
                <Buttons
                  type='primary'
                  shape='round'
                  icon={<CloseCircleOutlined />}
                  content='Close'
                  handleClick={toggleNewReview}
                />,
                <Buttons
                  type='primary'
                  shape='round'
                  icon={<SendOutlined />}
                  content='Add Review'
                  //handleClick={() => submitReview()}
                />,
              ]}
            ></List.Item>
          </List>
        </ViewWrapper>
      )}
      <List
        className='demo-loadmore-list'
        style={{ minHeight: '350px' }}
        itemLayout='horizontal'
        dataSource={userReviewsList}
        renderItem={(item) => (
          <div className='list-card'>
            <Row className='feedback-itam'>
              <Col span={22}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: getRandomColor(item.first_name),
                      }}
                      size={50}
                      icon={<UserOutlined />}
                    />
                  }
                  title={`${item.first_name} ${item.last_name}`}
                  description={item.user_title}
                />
                <div
                  style={{
                    paddingLeft: '65px',
                    marginTop: '2px',
                    marginBottom: '10px',
                  }}
                >
                  {item.review_text}
                </div>
              </Col>
              <Col span={2}>
                {
                  <Button
                    type='primary'
                    shape='circle'
                    icon={<EditOutlined />}
                    size={20}
                    style={{ margin: '2px' }}
                  />
                }
                {/* <Button
                  type='primary'
                  shape='circle'
                  icon={<DeleteOutlined />}
                  size={20}
                  style={{ margin: '2px' }}
                /> */}
              </Col>
            </Row>
          </div>
        )}
      />
    </>
  );
}

export default Reviews;
