import React from 'react';
import { Row, Input } from 'antd';
import actions from 'redux/Forum/actions';
import { useDispatch, useSelector } from 'react-redux';

const { Search } = Input;

export default function ForumPhSearchExtras() {
  const dispatch = useDispatch();
  const { searchLoading, searchString } = useSelector(
    (state) => state.forumReducer,
  );
  // const [loading, setLoading] = useState(false);

  const doSearch = () => {
    dispatch({
      type: actions.TOGGLESTATE,
      payload: { label: 'searchLoading', value: true },
    });
    dispatch({
      type: actions.SEARCHFEEDS,
      params: { searchString: searchString },
    });
  };
  const updateSearchString = (value) => {
    dispatch({
      type: actions.UPDATESEARCHSTRING,
      searchString: value,
    });
  };
  return (
    <Row
      lg={20}
      md={20}
      sm={20}
      xs={24}
      justify='space-between'
      align='middle'
      className='forum-page-header-extra-wrapper'
    >
      <Search
        placeholder='Input search string'
        loading={searchLoading}
        enterButton
        allowClear
        value={searchString}
        onChange={(e) => updateSearchString(e.target.value)}
        onPressEnter={() => doSearch()}
        onSearch={() => doSearch()}
      />
    </Row>
  );
}
