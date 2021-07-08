import React from 'react';
import Feeds from './contentPage/Feeds';
import { useSelector } from 'react-redux';
export default function ForumPage() {
  const { forumpage } = useSelector((state) => state.forumReducer);
  if (forumpage === 'Feeds') return <Feeds />;
  if (forumpage === 'Search') return <div>{forumpage}</div>;
  if (forumpage === 'Recommendations') return <div>{forumpage}</div>;
  else return <div>{forumpage}</div>;
}
