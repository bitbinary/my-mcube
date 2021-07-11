import React from 'react';
import Buttons from 'components/utils/Buttons';
import { SearchOutlined } from '@ant-design/icons';
import { Row, Space } from 'antd';
import MultipleSelects from 'components/utils/MultipleSelects';
import actions from 'redux/Forum/actions';
import { useDispatch, useSelector } from 'react-redux';
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
const optionsType = ['Mentor', 'Mentee', 'Project'];
export default function ForumPhSearchExtras() {
  const dispatch = useDispatch();
  const { searchselectedskills, searchselectedtypes, loader } = useSelector(
    (state) => state.forumReducer,
  );
  const onValueChangeSkills = (values) => {
    dispatch({
      type: actions.UPDATESEARCHSKILLS,
      payload: { searchSkillsSelected: values },
    });
  };
  const onValueChangeTypes = (values) => {
    dispatch({
      type: actions.UPDATESEARCHTYPES,
      payload: { searchselectedtypes: values },
    });
  };
  const toggleLoading = () => {
    dispatch({
      type: actions.TOGGLELOADING,
      payload: { loader: !loader },
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
      <Space className='forum-page-header-extra-spacer'>
        <MultipleSelects
          key='multiselectSkills'
          defaultValue={searchselectedskills}
          selectOptions={options}
          placeholder='Search Skills'
          handleChange={(values) => onValueChangeSkills(values)}
          className='multiselect forum-search-skill-select'
          // tagRender={() => <>{null}</>}
        />
        <MultipleSelects
          key='multiselectTypes'
          defaultValue={searchselectedtypes}
          selectOptions={optionsType}
          placeholder='Search Types'
          handleChange={(values) => onValueChangeTypes(values)}
          // tagRender={() => <>{null}</>}
          className='multiselect forum-search-type-select'
        />
      </Space>
      <Buttons
        type='primary'
        shape='round'
        icon={<SearchOutlined />}
        content='Search'
        handleClick={() => toggleLoading()}
      />
    </Row>
  );
}
