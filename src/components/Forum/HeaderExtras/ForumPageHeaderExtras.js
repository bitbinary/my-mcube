import React from 'react';
import ForumPhSearchExtras from './ForumPhSearchExtras';
import ForumPhFeedsExtras from './ForumPhFeedsExtras';
import ForumPhRecomExtras from './ForumPhRecomExtras';
export default function ForumPageHeaderExtras({ page }) {
  if (page === 'Feeds') {
    return <ForumPhFeedsExtras key='extrasFeed' />;
  } else if (page === 'Search') {
    return <ForumPhSearchExtras key='extrasSearch' />;
  }
  if (page === 'Recommendations') {
    return <ForumPhRecomExtras key='extraRecommendations' />;
  }
}
