import React from 'react';
// import { Radio } from 'antd';
// import ForumPost from './ForumPost';
import ForumPageWrapper from './ForumPageWrapper';
import ForumPage from './ForumPage';
import ForumLayout from './ForumLayout';
export default function Forum() {
  return (
    <ForumLayout>
      <ForumPageWrapper>
        <ForumPage />
      </ForumPageWrapper>
    </ForumLayout>
  );
}
