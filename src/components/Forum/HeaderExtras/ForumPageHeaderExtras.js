import React from 'react';
import ForumPhSearchExtras from './ForumPhSearchExtras';
import ForumPhFeedsExtras from './ForumPhFeedsExtras';
import ForumPhRecomExtras from './ForumPhRecomExtras';
export default function ForumPageHeaderExtras({ page }) {
  if (page === 'feeds') {
    return <ForumPhFeedsExtras key='extrasFeed' />;
  } else if (page === 'search') {
    return <ForumPhSearchExtras key='extrasSearch' />;
  }
  if (page === 'recommendations') {
    return <ForumPhRecomExtras key='extraRecommendations' />;
  }
}
