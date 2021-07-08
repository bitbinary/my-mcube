import React, from 'react';
import { useSelector } from 'react-redux';
export default function Feeds() {
  const { contentFeeds } = useSelector((state) => state.forumReducer);


  return <></>;
}
