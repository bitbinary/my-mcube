import React from 'react';
import CommentsContainer from './CommentsContainer';
export default function CommentsWrapper({ postId, defaultComments }) {
  return (
    <div>
      <CommentsContainer postId={postId} defaultComments={defaultComments} />
    </div>
  );
}
