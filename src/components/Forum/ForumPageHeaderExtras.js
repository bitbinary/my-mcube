import React from 'react';
import ForumPhSearchExtras from './HeaderExtras/ForumPhSearchExtras';
import ForumPhFeedsExtras from './HeaderExtras/ForumPhFeedsExtras';
import ForumPhRecomExtras from './HeaderExtras/ForumPhRecomExtras';
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
