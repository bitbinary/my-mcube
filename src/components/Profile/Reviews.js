import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row,
  Col,
  List,
  Avatar,
  Button,
  Rate,
  Input,
  PageHeader,
  Empty,
} from 'antd';
import actions from 'redux/Profile/actions';
import {
  UserOutlined,
  PlusOutlined,
  CloseCircleOutlined,
  SendOutlined,
} from '@ant-design/icons';
import Buttons from '../utils/Buttons';
import ViewWrapper from 'components/Forum/contentPage/utils/ViewWrapper';
import { getRandomColor } from '../tools/colorGenerator';

function Reviews({ user_id }) {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  const { userReviewsList, userReviewsListTemp } = useSelector(
    (state) => state.profileReducer,
  );
  const { userId } = useSelector((state) => state.authenticateReducer);
  const [newReviewToggle, setNewReviewToggle] = useState(false);
  const [rateUser, setRateUser] = useState(0);
  const [addReview, setAddReview] = useState('');

  useEffect(() => {
    user_id
      ? dispatch({
          type: actions.GETTEMPUSERREVIEWS,
          payload: {
            user_id: user_id,
          },
        })
      : dispatch({
          type: actions.GETUSERREVIEWS,
          payload: {
            user_id: userId,
          },
        });
  }, []);
  useEffect(() => {
    if (user_id) {
      setData(userReviewsListTemp[user_id]);
    } else {
      setData(userReviewsList);
    }
    return () => {};
  }, [userReviewsList, userReviewsListTemp, user_id]);
  const toggleNewReview = () => {
    setNewReviewToggle(!newReviewToggle);
  };

  function addReviewFunc(value) {
    setAddReview(value);
  }

  const rateUserFunc = (value) => {
    setRateUser(value);
  };

  const submitReview = () => {
    dispatch({
      type: actions.ADDUSERREVIEW,
      payload: {
        fromuserID: Number(userId),
        rating: rateUser,
        review: addReview,
        toUserID: Number(user_id),
      },
    });
    setData(userReviewsListTemp[user_id]);
  };

  return (
    <>
      <PageHeader
        className='forum-page-header'
        title='Reviews'
        extra={
          user_id !== undefined
            ? [
                <Button
                  type='primary'
                  shape='round'
                  icon={<PlusOutlined />}
                  content='New Review'
                  onClick={toggleNewReview}
                  disabled={user_id === undefined ? true : false}
                >
                  Add/Update
                </Button>,
              ]
            : []
        }
      ></PageHeader>
      {newReviewToggle && (
        <ViewWrapper>
          <List className='feed-list-wrapper'>
            <List.Item>Add a Review</List.Item>
            <List.Item>
              <TextArea
                placeholder='Add review here!'
                onChange={(e) => addReviewFunc(e.target.value)}
                rows={4}
              />
            </List.Item>
            <List.Item>
              <Rate defaultValue={0} onChange={rateUserFunc} />
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
                  handleClick={submitReview}
                />,
              ]}
            ></List.Item>
          </List>
        </ViewWrapper>
      )}
      {data && data?.length !== 0 ? (
        <List
          className='demo-loadmore-list'
          style={{ minHeight: '350px' }}
          itemLayout='horizontal'
          dataSource={data || []}
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
                    <Rate
                      key={item.rating}
                      defaultValue={item.rating}
                      disabled
                    />
                  </div>
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
              </Row>
            </div>
          )}
        />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{
            height: 60,
          }}
          description={<span>No reviews yet</span>}
        ></Empty>
      )}
    </>
  );
}

export default Reviews;
