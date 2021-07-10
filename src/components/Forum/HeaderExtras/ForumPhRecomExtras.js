import React from 'react';
import Buttons from 'components/utils/Buttons';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/Forum/actions';
import SingleSelect from 'components/utils/SingleSelect';
import { Space } from 'antd';

const optionsType = ['Mentors', 'Mentees', 'Projects'];
export default function ForumPhRecomExtras() {
  const dispatch = useDispatch();
  const { recommendationsselectedtypes, loader } = useSelector(
    (state) => state.forumReducer,
  );
  const onValueChangeTypes = (values) => {
    // console.log(values);
    dispatch({
      type: actions.UPDATERECOMTYPES,
      payload: { recommendationsselectedtypes: [values.value] },
    });
  };
  const toggleLoading = () => {
    dispatch({
      type: actions.TOGGLELOADING,
      payload: { loader: !loader },
    });
  };
  return (
    <Space>
      <SingleSelect
        defaultValue={recommendationsselectedtypes}
        selectOptions={optionsType}
        placeholder='Select Types'
        handleChange={(values) => onValueChangeTypes(values)}
        // tagRender={() => <>{null}</>}
        className='multiselect forum-recom-type-select'
      />
      <Buttons
        type='primary'
        shape='round'
        icon={<SearchOutlined />}
        content='Get Recommendations'
        handleClick={() => toggleLoading()}
      />
    </Space>
  );
}
