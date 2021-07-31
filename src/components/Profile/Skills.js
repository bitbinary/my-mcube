import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Select, Tag, Button, PageHeader } from 'antd';
import SectionDivider from '../utils/SectionDivider';
import { Input, Tooltip, notification } from 'antd';
import { InfoCircleOutlined, TagsOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/Profile/actions';
import { getRandomColor } from '../tools/colorGenerator';

const { Option } = Select;
const { Search } = Input;

function Skills({ user_id }) {
  const [tags, setTags] = useState([]);
  const [tagsList, setTagsList] = useState(null);
  const [skillListComponent, setSkillListComponent] = useState(null);
  const [addSkill, setAddSkill] = useState('');
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.authenticateReducer);

  const { skillList, skillErrorMessage, skillDisplayError, userSkillList } =
    useSelector((state) => state.profileReducer);

  useEffect(() => {
    dispatch({
      type: actions.GETSKILLS,
    });
    dispatch({
      type: actions.GETUSERSKILLS,
      payload: {
        user_id: 7,
        //user_id: user_id ? user_id : userId,
      },
    });
  }, []);
  useEffect(async () => {
    dispatch({
      type: actions.GETSKILLS,
    });
    dispatch({
      type: actions.GETUSERSKILLS,
      payload: {
        user_id: user_id ? user_id : userId,
      },
    });
  }, [user_id]);

  useEffect(() => {
    let SkillListComponent1 = null;
    SkillListComponent1 = skillList.map(function (skill) {
      return (
        <Option value={skill}>
          <div className='demo-option-label-item'>{skill}</div>
        </Option>
      );
    });
    setSkillListComponent(SkillListComponent1);
  }, [skillList]);

  useEffect(() => {
    let tagsList1 = null;
    tagsList1 = tags.map(function (tag, index) {
      return (
        <Tag key={index} color={getRandomColor(tag)}>
          {tag}
        </Tag>
      );
    });
    setTagsList(tagsList1);
  }, [tags]);

  function handleChange(value) {
    //console.log(`selected ${value}`);
    setTags(value);
  }

  function addNewSkillFunc() {
    dispatch({
      type: actions.ADDSKILL,
      payload: {
        skill: addSkill,
      },
    });
    dispatch({
      type: actions.GETSKILLS,
    });
  }

  const updateUserSkillList = () => {
    // dispatch({
    //   type: actions.ADDSKILL,
    //   payload: {
    //     : ,
    //   },
    // });
  };

  const openNotification = (type, description) => {
    notification[type]({
      message: type,
      description: description,
      placement: 'bottomRight',
    });
  };

  //ASK AMEL
  /* if (skillDisplayError === true) {
    openNotification('success', skillErrorMessage);
  } else if (skillDisplayError ===  false){
    openNotification('error', skillErrorMessage);
  }*/

  return (
    <>
      <PageHeader
        className='forum-page-header skill-options'
        // extra={<ForumPageHeaderExtras page='Feeds' />}
      >
        <Row gutter={16} className=''>
          <Col span={18}>
            {skillList?.length > 0 && (
              <Select
                mode='multiple'
                style={{ width: '80%' }}
                placeholder='select skills'
                defaultValue={userSkillList}
                onChange={handleChange}
              >
                {skillListComponent}
              </Select>
            )}
            <Button type='primary' onClick={updateUserSkillList}>
              Add Skills
            </Button>
          </Col>
          <Col span={6}>
            <Search
              placeholder='Add new tag'
              enterButton='Add Tag'
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
        </Row>
      </PageHeader>

      <SectionDivider />
      <div className='list-card'>{tagsList}</div>
    </>
  );
}

export default Skills;
