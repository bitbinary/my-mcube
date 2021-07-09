import React, { useState } from 'react';
import CommentsContainer from './CommentsContainer';
export default function CommentsWrapper() {
  const [comments, setComments] = useState([]);
  return (
    <div>
      <CommentsContainer />
    </div>
  );
}
