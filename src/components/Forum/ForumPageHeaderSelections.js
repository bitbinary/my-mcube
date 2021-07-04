import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/Forum/actions';
import { Row, Col, Tag } from 'antd';
export default function ForumPageHeaderSelections() {
  const { forumpage, searchselectedskills, searchselectedtypes } = useSelector(
    (state) => state.forumReducer,
  );
  const dispatch = useDispatch();

  const removeSkill = (skill) => {
    let newlist = [...searchselectedskills];
    const index = newlist.indexOf(skill);
    if (index > -1) {
      newlist.splice(index, 1);
    }
    dispatch({
      type: actions.UPDATESEARCHSKILLS,
      payload: { searchSkillsSelected: newlist },
    });
  };
  const removeType = (type) => {
    let newlist = [...searchselectedtypes];
    const index = newlist.indexOf(type);
    if (index > -1) {
      newlist.splice(index, 1);
    }
    dispatch({
      type: actions.UPDATESEARCHTYPES,
      payload: { searchselectedtypes: newlist },
    });
  };
  if (forumpage === 'Feeds') {
    return (
      <ForumPageHeaderSelectionView
        removeTagSkills={(skill) => removeSkill(skill)}
        removeTagTypes={(type) => removeType(type)}
        key='selectionsFeed'
      />
    );
  } else if (forumpage === 'Search') {
    return (
      <ForumPageHeaderSelectionView
        key='selectionsSearch'
        skills={searchselectedskills}
        types={searchselectedtypes}
        removeTagSkills={(skill) => removeSkill(skill)}
        removeTagTypes={(type) => removeType(type)}
      />
    );
  }
  if (forumpage === 'Recommendations') {
    return (
      <ForumPageHeaderSelectionView
        key='selectionsRecommendations'
        types={searchselectedtypes}
        removeTagSkills={(skill) => removeSkill(skill)}
        removeTagTypes={(type) => removeType(type)}
      />
    );
  }
}

function ForumPageHeaderSelectionView({
  removeTagSkills,
  removeTagTypes,
  ...rest
}) {
  return (
    <Row justify='start' align='start'>
      <Col lg={20} md={20} sm={20} xs={24} justify='start' align='top'>
        <div>
          {rest.skills?.map((skill) => (
            <Tag
              //   closable
              onClose={() => removeTagSkills(skill)}
              key={skill}
              color='blue'
            >
              {skill}
            </Tag>
          ))}
          {rest.types?.map((type) => (
            <Tag
              //   closable
              onClose={() => removeTagTypes(type)}
              key={type}
              color='green'
            >
              {type}
            </Tag>
          ))}
        </div>
      </Col>
    </Row>
  );
}
