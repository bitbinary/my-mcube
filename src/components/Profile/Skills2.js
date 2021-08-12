import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MultipleSelects from 'components/Profile/utils/multiSelector.js';
import actions from 'redux/Profile/actions';

function Skills2({ user_id }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { userSkillList } = useSelector((state) => state.profileReducer);
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

  function onchange(key, value) {
    setSelectedOptions(key);
    console.log(key);
  }
  return (
    <>
      <MultipleSelects
        userId={U_Id}
        handleChange={onchange}
        addSkills={updateSkills}
      />
    </>
  );
}

export default Skills2;
