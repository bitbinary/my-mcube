import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/Forum/actions';
import SingleSelect from 'components/utils/SingleSelect';
import { Space, Row } from 'antd';

const optionsType = [
  { value: 'mentor', label: 'Mentors' },
  { value: 'mentees', label: 'Mentees' },
  { value: 'project', label: 'Projects' },
];
export default function ForumPhRecomExtras() {
  const dispatch = useDispatch();
  const { recommselectedtype, loader } = useSelector(
    (state) => state.forumReducer,
  );
  const onValueChangeTypes = (values) => {
    dispatch({
      type: actions.UPDATERECOMTYPES,
      payload: { recommendationsselectedtypes: values },
    });
  };
  // const toggleLoading = () => {
  //   dispatch({
  //     type: actions.TOGGLELOADING,
  //     payload: { loader: !loader },
  //   });
  // };
  return (
    <Row
      lg={20}
      md={20}
      sm={20}
      xs={22}
      justify='space-between'
      align='middle'
      className='forum-page-header-extra-wrapper'
    >
      <Space className='forum-page-header-extra-spacer'>
        <SingleSelect
          defaultValue={recommselectedtype}
          selectOptions={optionsType}
          placeholder='Select Types'
          handleChange={(values) => onValueChangeTypes(values)}
          // tagRender={() => <>{null}</>}
          className='multiselect forum-recom-type-select'
        />
        {/* <Buttons
          type='primary'
          shape='round'
          icon={<SearchOutlined />}
          content='Get Recommendations'
          handleClick={() => toggleLoading()}
        /> */}
      </Space>
    </Row>
  );
}
