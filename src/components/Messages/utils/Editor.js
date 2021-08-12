import React from 'react';
import { Form, Input, Row, Col } from 'antd';
import Buttons from 'components/utils/Buttons';
import { SendOutlined } from '@ant-design/icons';
const { TextArea } = Input;

export default function Editor({
  handleChange,
  handleSubmit,
  submitting,
  newComment,
}) {
  return (
    <Row wrap={false}>
      <Col flex='auto' justify='end'>
        <Form.Item className='message-input-wrapper'>
          <TextArea
            value={newComment}
            onChange={handleChange}
            placeholder='Enter your message here'
            autoSize={{ minRows: 2, maxRows: 2 }}
            className='message-input'
            onPressEnter={handleSubmit}
          />
        </Form.Item>
      </Col>
      <Col flex='none' className='message-send-container'>
        <Buttons
          htmlType='submit'
          loading={submitting}
          handleClick={handleSubmit}
          type='primary'
          className='message-send-button'
          content={<SendOutlined />}
        ></Buttons>
      </Col>
    </Row>
  );
}
