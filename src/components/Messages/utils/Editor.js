import React from 'react';
import { Form, Input, Row, Col } from 'antd';
import Buttons from 'components/utils/Buttons';
import { SendOutlined } from '@ant-design/icons';
const { TextArea } = Input;

export default function Editor({ onChange, onSubmit, submitting, value }) {
  return (
    <Row wrap={false}>
      <Col flex='auto' justify='end'>
        <Form.Item className='message-input-wrapper'>
          <TextArea
            value={value}
            onChange={onChange}
            placeholder='Enter your message here'
            autoSize={{ minRows: 2, maxRows: 2 }}
            className='message-input'
          />
        </Form.Item>
      </Col>
      <Col flex='none'>
        <Buttons
          htmlType='submit'
          loading={submitting}
          handleClick={onSubmit}
          type='primary'
          className='message-send-button'
          content={<SendOutlined />}
        ></Buttons>
      </Col>
    </Row>
  );
}
