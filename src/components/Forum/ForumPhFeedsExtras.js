import React from 'react';
import Buttons from 'components/utils/Buttons';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/Forum/actions';
export default function ForumPhFeedsExtras() {
  const dispatch = useDispatch();
  const { addPostDraftState } = useSelector((state) => state.forumReducer);
  const toggleNewPost = () => {
    dispatch({
      type: actions.TOGGLESTATE,
      payload: { label: 'addPostDraftState', value: !addPostDraftState },
    });
  };
  return (
    <>
      {!addPostDraftState && (
        <Buttons
          type='primary'
          shape='round'
          icon={<PlusOutlined />}
          content='New Post'
          handleClick={() => toggleNewPost()}
        />
      )}
    </>
  );
}
