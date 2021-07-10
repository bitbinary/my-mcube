import { Space } from 'antd';
import AppTexts from 'components/utils/AppTexts';
import React from 'react';

export default function MessagePreview({
  messages = [
    { message: 'Hi, How are you ', sender: 'text-left' },
    { message: 'How are you!!? ', sender: 'text-right' },
    { message: 'I am fine, Thanks', sender: 'text-right' },
    { message: 'I am feeling great', sender: 'text-left' },
  ],
}) {
  return (
    <div className='message-preview-pane'>
      <Space direction='vertical'>
        {messages.map((message) => (
          <div className={`${message.sender}`}>
            <AppTexts
              content={message.message}
              className={'messager-preview-message'}
            />
          </div>
        ))}
      </Space>
    </div>
  );
}
