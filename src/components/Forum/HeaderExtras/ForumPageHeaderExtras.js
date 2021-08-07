import React from 'react';
import ForumPhSearchExtras from './ForumPhSearchExtras';
import ForumPhFeedsExtras from './ForumPhFeedsExtras';
import ForumPhRecomExtras from './ForumPhRecomExtras';
import { useSelector } from 'react-redux';
export default function ForumPageHeaderExtras({ page }) {
  const { searchData } = useSelector((state) => state.forumReducer);
  if (page === 'feeds') {
    return <ForumPhFeedsExtras key='extrasFeed' />;
  } else if (page === 'search') {
    return (
      searchData.length !== 0 && <ForumPhSearchExtras key='extrasSearch' />
    );
  }
  if (page === 'recommendations') {
    return <ForumPhRecomExtras key='extraRecommendations' />;
  }
}
