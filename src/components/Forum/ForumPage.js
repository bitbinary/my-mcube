import React from 'react';
import Feeds from './contentPage/Feeds';
import { useSelector } from 'react-redux';
import Search from './contentPage/Search';
import Recommendations from './contentPage/Recommendations';
export default function ForumPage({ activePage }) {
  const { forumpage } = useSelector((state) => state.forumReducer);
  let page = activePage || forumpage?.toLowerCase();
  console.log(page.toLowerCase());
  return (
    <div className='forum-page-wrapper'>
      {page === 'feeds' && <Feeds />}
      {page === 'search' && <Search />}
      {page === 'recommendations' && <Recommendations />}
    </div>
  );
}
