import React, { useState } from 'react';
import Editor from 'components/Messages/utils/Editor';
import MessagePreview from './MessagePreview';
import { PageHeader } from 'antd';
import { ArrowLeftOutlined, BarsOutlined } from '@ant-design/icons';
export default function UserMessager({ contact, handleBack, collapsed }) {
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };
  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setNewComment('');
    }, 1000);
  };
  return (
    <div className='messager-wrapper'>
      <PageHeader
        className='site-page-header'
        title={contact.name}
        subTitle={contact.status}
        onBack={handleBack}
        backIcon={collapsed ? <BarsOutlined /> : <ArrowLeftOutlined />}
      />
      <MessagePreview />
      <Editor
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitting={submitting}
        newComment={newComment}
      />
    </div>
  );
}
