import React from 'react';
import { useSelector } from 'react-redux';
import ForumPhSearchExtras from './ForumPhSearchExtras';
import ForumPhFeedsExtras from './ForumPhFeedsExtras';
import ForumPgRecomExtras from './ForumPgRecomExtras';
export default function ForumPageHeaderExtras() {
  const { forumpage } = useSelector((state) => state.forumReducer);

  if (forumpage === 'Feeds') {
    return <ForumPhFeedsExtras key='extrasFeed' />;
  } else if (forumpage === 'Search') {
    return <ForumPhSearchExtras key='extrasSearch' />;
  }
  if (forumpage === 'Recommendations') {
    return <ForumPgRecomExtras key='extraRecommendations' />;
  }
}
