import React, { useState } from 'react';
import Buttons from 'components/utils/Buttons';
import { SearchOutlined } from '@ant-design/icons';
import { Row, Space, Input } from 'antd';
import MultipleSelects from 'components/utils/MultipleSelects';
import actions from 'redux/Forum/actions';
import { useDispatch, useSelector } from 'react-redux';

const { Search } = Input;
const options = [
  'JavaScript',
  'Python',
  'C',
  'Java',
  'Go',
  'Perl',
  'Ruby',
  'Swift',
  'Scala',
  'PHP',
  'C++',
  'R',
  'Objective-C',
  'SQL',
  'Arduino ',
  'MATLAB',
  'Rust',
  'TypeScript',
  'Kotlin',
  'CSS',
  'Groovy',
  'Dart',
  'Assembly Language',
  'PowerShell',
  'Julia',
  'Scratch',
  'COBOL',
  'Fortran',
  'ABAP',
  'Scheme',
  'Shell',
  'Prolog',
  'VBScript',
  'Haskell',
  'Delphi',
  'Hack',
  'Pascal',
  'Ada',
  'Lua',
  'Visual Basic',
  'Lisp',
  'Bash',
  'Clojure',
  'MQL4',
  'Apex',
  'LabVIEW',
  'ABL',
  'D',
  'SAS',
  'Logo',
];

export default function ForumPhSearchExtras() {
  const dispatch = useDispatch();
  const { searchLoading, searchString } = useSelector(
    (state) => state.forumReducer,
  );
  // const [loading, setLoading] = useState(false);

  const doSearch = () => {
    console.log('going to search');
    dispatch({
      type: actions.TOGGLESTATE,
      payload: { label: 'searchLoading', value: true },
    });
    console.log('going to search');
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
      <Space className='forum-page-header-extra-spacer'></Space>
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
