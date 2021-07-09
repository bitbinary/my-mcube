import React from 'react';
import Feeds from './contentPage/Feeds';
import { useSelector } from 'react-redux';
export default function ForumPage() {
  const { forumpage } = useSelector((state) => state.forumReducer);
  return (
    <div className='forum-page-wrapper'>
      {forumpage === 'Feeds' && <Feeds />}
      {forumpage === 'Search' && <div>{forumpage}</div>}
      {forumpage === 'Recommendations' && <div>{forumpage}</div>}
    </div>
  );
}
