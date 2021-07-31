import React from 'react';
import ForumPage from './ForumPage';
import ForumLayout from './ForumLayout';
export default function Forum({ activePage }) {
  return (
    <ForumLayout>
      <ForumPage activePage={activePage} />
    </ForumLayout>
  );
}
