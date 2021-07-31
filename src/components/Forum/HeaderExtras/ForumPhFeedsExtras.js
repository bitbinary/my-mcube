import React from 'react';
import Buttons from 'components/utils/Buttons';
import { PlusOutlined } from '@ant-design/icons';
import { Row, Col, Input, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/Forum/actions';
const { Search } = Input;
const { Option } = Select;
let selectOptions = [
  { key: 'timestamp', value: 'timestamp', label: 'Sort by created date' },
  {
    key: 'last_modified',
    value: 'last_modified',
    label: 'Sort by modified date',
  },
];
export default function ForumPhFeedsExtras() {
  const dispatch = useDispatch();
  const { addPostDraftState, feedSortBy } = useSelector(
    (state) => state.forumReducer,
  );
  const toggleNewPost = () => {
    dispatch({
      type: actions.TOGGLESTATE,
      payload: { label: 'addPostDraftState', value: !addPostDraftState },
    });
  };
  function onChange(value) {
    dispatch({
      type: actions.FORCEUPDATE,
      payload: { item: 'feedSortBy', value: value },
    });
  }

  return (
    <Row align='middle'>
      <Col
        lg={12}
        md={12}
        sm={24}
        xs={24}
        span={12}
        justify='space-between'
        align='end'
      >
        <Select
          style={{ width: 200 }}
          optionFilterProp='children'
          // defaultActiveFirstOption={true}
          defaultValue={feedSortBy}
          onChange={onChange}
          options={selectOptions}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Option value='createdAt'>Sort by Created At</Option>
          <Option value='lastModified'>Sort by Last Modified</Option> */}
        </Select>
      </Col>
      {!addPostDraftState && (
        <Col
          lg={12}
          md={12}
          sm={24}
          xs={24}
          span={12}
          justify='center'
          align='end'
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
