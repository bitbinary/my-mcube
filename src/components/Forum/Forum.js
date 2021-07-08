import React from 'react';
import ForumPage from './ForumPage';
import ForumLayout from './ForumLayout';
export default function Forum() {
  console.log('loading Forum');
  return (
    <ForumLayout>
      <ForumPage />
    </ForumLayout>
  );
}
