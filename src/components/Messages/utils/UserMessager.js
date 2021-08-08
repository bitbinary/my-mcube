import React, { useState, useEffect } from 'react';
import Editor from 'components/Messages/utils/Editor';
import MessagePreview from './MessagePreview';
import { Empty, notification, PageHeader } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/Messages/actions';
import { useInterval } from 'components/tools/useInterval';
import logoimg from 'assets/logo/medium.png';

import {
  ArrowLeftOutlined,
  BarsOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import Buttons from 'components/utils/Buttons';
import AppTexts from 'components/utils/AppTexts';
export default function UserMessager({ contact, handleBack, collapsed }) {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.authenticateReducer);
  const { messages } = useSelector((state) => state.messageReducer);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState('');
  useEffect(() => {
    dispatch({
      type: actions.GET_MESSAGES,
      toUser: contact.user_id.split('_')[1],
      fromUser: userId,
    });
    return () => {};
  }, []);
  useEffect(() => {
    dispatch({
      type: actions.GET_MESSAGES,
      toUser: contact.user_id.split('_')[1],
      fromUser: userId,
    });
    return () => {};
  }, [contact]);
  useInterval(() => {
    // put your interval code here.
    dispatch({
      type: actions.GET_MESSAGES,
      toUser: contact.user_id.split('_')[1],
      fromUser: userId,
    });
    return () => {};
  }, 1000 * 1);
  const handleChange = (e) => {
    setNewComment(e.target.value);
  };
  const handleReloadChat = (e) => {
    dispatch({
      type: actions.GET_MESSAGES,
      toUser: contact.user_id.split('_')[1],
      fromUser: userId,
    });
  };
  const handleSubmit = () => {
    if (newComment.length === 0) {
      notification['info']({
        message: 'Please enter message',
        // description: response?.data?.message,
        placement: 'bottomRight',
      });
      return;
    }
    setSubmitting(true);
    dispatch({
      type: actions.POSTMESSAGE,
      payload: {
        Content: newComment,
        from_user_id: Number(userId),
        to_user_id: Number(contact.user_id.split('_')[1]),
      },
    });
    setSubmitting(false);
    setNewComment('');
  };
  return (
    <div className='messager-wrapper'>
      <PageHeader
        className='site-page-header'
        title={`${contact?.first_name} ${contact?.last_name}`}
        extra={[
          <Buttons
            type='primary'
            shape='round'
            handleClick={handleReloadChat}
            content={<RedoOutlined />}
          />,
        ]}
        subTitle={contact?.status}
        onBack={handleBack}
        backIcon={collapsed ? <BarsOutlined /> : <ArrowLeftOutlined />}
      />
      {messages[contact.user_id.split('_')[1]] && (
        <MessagePreview messages={messages[contact.user_id.split('_')[1]]} />
      )}
      {!messages[contact.user_id.split('_')[1]] && (
        <Empty
          className='empty-chat'
          image={logoimg}
          imageStyle={{
            height: 60,
          }}
          description={
            <AppTexts className='strong' content='Waiting for messages...' />
          }
        ></Empty>
      )}
      <Editor
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitting={submitting}
        newComment={newComment}
      />
    </div>
  );
}
