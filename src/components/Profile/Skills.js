import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MultipleSelects from 'components/Profile/utils/multiSelector.js';
import actions from 'redux/Profile/actions';

import { InfoCircleOutlined, TagsOutlined } from '@ant-design/icons';
import { Tooltip, Input, Row, Col, PageHeader } from 'antd';
const { Search } = Input;
function Skills2({ user_id }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { userSkillList } = useSelector((state) => state.profileReducer);
  const [addSkill, setAddSkill] = useState('');
  const { userId } = useSelector((state) => state.authenticateReducer);
  const U_Id = user_id ? user_id : userId;
  const dispatch = useDispatch();
  useEffect(() => {
    setSelectedOptions(userSkillList);
    return () => {};
  }, [userSkillList]);
  function updateSkills() {
    console.log(selectedOptions);

    let resultTags = {};
    for (let i = 0; i < selectedOptions.length; i++) {
      resultTags[String(i)] = selectedOptions[i];
    }
    dispatch({
      type: actions.UPDATEUSERSKILLS,
      payload: {
        user_id: U_Id,
        skills: resultTags,
      },
    });
  }
  function addNewSkillFunc() {
    dispatch({
      type: actions.ADDSKILL,
      payload: {
        skill: addSkill,
      },
    });
  }
  function onchange(key, value) {
    setSelectedOptions(key);
    console.log(key);
  }
  return (
    <>
      <PageHeader className='forum-page-header' title='Skills'></PageHeader>
      <Row gutter={(16, 16)}>
        <Col xs={24} style={{ marginBottom: '40px' }}>
          <Search
            showSearch
            placeholder='Enter the skill name'
            enterButton='Add new Skill'
            value={addSkill}
            onChange={(e) => setAddSkill(e.target.value)}
            onSearch={() => addNewSkillFunc()}
            prefix={<TagsOutlined className='site-form-item-icon' />}
            suffix={
              <Tooltip title='Only Add new tag if already not present!'>
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
            }
          />
        </Col>
        <Col xs={24}>
          <MultipleSelects
            userId={U_Id}
            handleChange={onchange}
            addSkills={updateSkills}
          />
        </Col>
      </Row>
    </>
  );
}

export default Skills2;
