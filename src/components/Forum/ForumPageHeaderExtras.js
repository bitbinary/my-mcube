import React from 'react';
import { useSelector } from 'react-redux';
import ForumPhSearchExtras from './ForumPhSearchExtras';
import ForumPhFeedsExtras from './ForumPhFeedsExtras';
import ForumPhRecomExtras from './ForumPhRecomExtras';
export default function ForumPageHeaderExtras() {
  const { forumpage } = useSelector((state) => state.forumReducer);

  if (forumpage === 'Feeds') {
    return <ForumPhFeedsExtras key='extrasFeed' />;
  } else if (forumpage === 'Search') {
    return <ForumPhSearchExtras key='extrasSearch' />;
  }
  if (forumpage === 'Recommendations') {
    return <ForumPhRecomExtras key='extraRecommendations' />;
  }
}
