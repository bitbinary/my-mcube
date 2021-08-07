import { Space } from 'antd';
import AppTexts from 'components/utils/AppTexts';
import React, { useEffect } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';

export default function MessagePreview({ messages }) {
  const { userId } = useSelector((state) => state.authenticateReducer);
  let messagesEnd = null;
  const scrollToBottom = () => {
    // messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };
  let user_id = `U_${userId}`;
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className='message-preview-pane-container'>
      <div className='message-preview-pane'>
        <Space direction='vertical'>
          {messages &&
            messages.map((message) => (
              <div
                key={message.msg_id}
                className={
                  message.from_user_id === user_id ? 'text-right' : 'text-left'
                }
              >
                <AppTexts
                  content={message.content}
                  className={'messager-preview-message'}
                  containerStyles='messager-preview-message-container'
                />
                <AppTexts
                  containerStyles='message-timestamp-container xsmall'
                  className='small message-timestamp'
                  content={moment(new Date(message.timestamp * 1000))
                    .subtract(0, 'days')
                    .fromNow()}
                />
              </div>
            ))}
        </Space>
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={(el) => {
            messagesEnd = el;
          }}
        ></div>
      </div>
    </div>
  );
}
