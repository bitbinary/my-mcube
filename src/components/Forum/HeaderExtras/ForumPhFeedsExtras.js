import React from 'react';
import Buttons from 'components/utils/Buttons';
import { PlusOutlined } from '@ant-design/icons';
import { Row, Col, Input, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/Forum/actions';
const { Search } = Input;
// const { Option } = Select;
// let selectOptions = [
//   { key: 'timestamp', value: 'timestamp', label: 'Sort by created date' },
//   {
//     key: 'last_modified',
//     value: 'last_modified',
//     label: 'Sort by modified date',
//   },
// ];
export default function ForumPhFeedsExtras() {
  const dispatch = useDispatch();
  const { addPostDraftState, feedSortBy, feedSearchString } = useSelector(
    (state) => state.forumReducer,
  );
  const toggleNewPost = () => {
    dispatch({
      type: actions.TOGGLESTATE,
      payload: { label: 'addPostDraftState', value: !addPostDraftState },
    });
  };
  // function onChange(value) {
  //   dispatch({
  //     type: actions.FORCEUPDATE,
  //     payload: { item: 'feedSortBy', value: value },
  //   });
  // }

  const updateSearchString = (value) => {
    dispatch({
      type: actions.FORCEUPDATE,
      payload: { item: 'feedSearchString', value: value },
    });
  };
  const doSearch = (value) => {};
  return (
    <Row align='middle'>
      <Col
        lg={24}
        md={24}
        sm={24}
        xs={24}
        span={12}
        justify='space-between'
        align='end'
      >
        <Search
          placeholder='search'
          enterButton
          allowClear
          value={feedSearchString}
          onChange={(e) => updateSearchString(e.target.value)}
          onPressEnter={() => doSearch()}
          // onSearch={() => doSearch()}
        />
      </Col>
      {!addPostDraftState && (
        <Col
          lg={24}
          md={24}
          sm={24}
          xs={24}
          span={12}
          justify='center'
          align='end'
          className='new-post-button'
        >
          <Buttons
            type='primary'
            shape='round'
            icon={<PlusOutlined />}
            content='New Post'
            handleClick={() => toggleNewPost()}
          />
        </Col>
      )}
    </Row>
  );
}
