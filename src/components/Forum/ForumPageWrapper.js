import React, { Children, isValidElement, cloneElement } from 'react';
import { useSelector } from 'react-redux';

export default function ForumPageWrapper({ children }) {
  const { forumpage } = useSelector((state) => state.forumReducer);

  const childrenWithProps = Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a TS error too.
    if (isValidElement(child)) {
      return cloneElement(child, { forumpage });
    }

    return child;
  });
  return childrenWithProps;
}
