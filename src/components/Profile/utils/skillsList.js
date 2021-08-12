import { Space, Tag } from 'antd';
import { getRandomColor } from 'components/tools/colorGenerator';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/Profile/actions';

export default function SkillsList({ userId }) {
  const { userSkillList } = useSelector((state) => state.profileReducer);
  const [skills, setSkills] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: actions.GETUSERSKILLS,
      payload: {
        user_id: userId,
      },
    });
    return () => {};
  }, []);

  useEffect(() => {
    setSkills(userSkillList);
    return () => {};
  }, [userSkillList]);

  let skillsList = (
    <Space wrap>
      {skills?.map((skill) => (
        <Tag color={getRandomColor(skill)}>{skill}</Tag>
      ))}
    </Space>
  );
  return <div>{skillsList}</div>;
}
