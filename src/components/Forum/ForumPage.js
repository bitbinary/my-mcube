import React from 'react';
import Feeds from './contentPage/Feeds';
export default function ForumPage({ forumpage }) {
  if (forumpage === 'Feeds') return <Feeds />;
  if (forumpage === 'Search') return <div>{forumpage}</div>;
  if (forumpage === 'Recommendations') return <div>{forumpage}</div>;
  else return <div>{forumpage}</div>;
}
