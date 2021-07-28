import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row,
  Col,
  List,
  Avatar,
  Button,
  Skeleton,
  Collapse,
  Form,
  Input,
} from 'antd';
import actions from 'redux/Profile/actions';
import { UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import SectionDivider from '../utils/SectionDivider';
import { getRandomColor } from '../tools/colorGenerator';

function Reviews() {
  const { Panel } = Collapse;
  const { TextArea } = Input;
  const dispatch = useDispatch();

  const { userReviewsList } = useSelector((state) => state.profileReducer);
  useEffect(() => {
    dispatch({
      type: actions.GETUSERREVIEWS,
      payload: {
        user_id: 1,
      },
    });
  }, []);
  console.log(userReviewsList);

  let content =
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently. We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).';

  return (
    <>
      <Collapse>
        <Panel header='Click to add a review' key='1'>
          <Form
            name='basic'
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              label='Leave a review'
              name='description'
              rules={[
                {
                  required: true,
                  message: 'Please add the review!',
                },
              ]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type='primary' htmlType='submit'>
                Add
              </Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
      <SectionDivider />
      <List
        className='demo-loadmore-list'
        style={{ minHeight: '350px' }}
        itemLayout='horizontal'
        dataSource={userReviewsList}
        renderItem={(item) => (
          <div>
            <Row>
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
                  title={item.first_name + ' ' + item.last_name}
                  description={item.user_title}
                />
                <div style={{ marginTop: '2px', marginBottom: '30px' }}>
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
            <SectionDivider />
          </div>
        )}
      />
    </>
  );
}

export default Reviews;
