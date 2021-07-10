import React from 'react';
import Feeds from './contentPage/Feeds';
import { useSelector } from 'react-redux';
import Search from './contentPage/Search';
import Recommendations from './contentPage/Recommendations';
export default function ForumPage() {
  const { forumpage } = useSelector((state) => state.forumReducer);
  return (
    <div className='forum-page-wrapper'>
      {forumpage === 'Feeds' && <Feeds />}
      {forumpage === 'Search' && <Search />}
      {forumpage === 'Recommendations' && <Recommendations />}
    </div>
  );
}
