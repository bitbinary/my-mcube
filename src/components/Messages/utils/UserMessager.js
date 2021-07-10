import React, { useState } from 'react';
import Editor from 'components/Messages/utils/Editor';
import MessagePreview from './MessagePreview';

export default function UserMessager() {
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
