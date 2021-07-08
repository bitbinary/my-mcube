import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/Forum/actions';
import { Row, Col, Tag, Form, Input, InputNumber } from 'antd';
import Buttons from 'components/utils/Buttons';
import { SendOutlined } from '@ant-design/icons';
export default function ForumPageHeaderSelections({ page }) {
  const {
    searchselectedskills,
    searchselectedtypes,
    // recommendationsselectedtypes,
  } = useSelector((state) => state.forumReducer);
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
  // const removeRecomType = (type) => {
  //   let newlist = [...recommendationsselectedtypes];
  //   const index = newlist.indexOf(type);
  //   if (index > -1) {
  //     newlist.splice(index, 1);
  //   }
  //   dispatch({
  //     type: actions.UPDATESEARCHTYPES,
  //     payload: { recommendationsselectedtypes: newlist },
  //   });
  // };
  if (page === 'Feeds') {
    return <ForumPageHeaderAddPost />;
  } else if (page === 'Search') {
    return (
      <ForumPageHeaderSelectionViewTags
        key='selectionsSearch'
        skills={searchselectedskills}
        types={searchselectedtypes}
        removeTagSkills={(skill) => removeSkill(skill)}
        removeTagTypes={(type) => removeType(type)}
      />
    );
  }
  if (page === 'Recommendations') {
    return <></>;
  }
}

function ForumPageHeaderSelectionViewTags({
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
const validateMessages = {
  // eslint-disable-next-line
  required: '${label} is required!',
};
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
function ForumPageHeaderAddPost({ ...rest }) {
  const toggleNewPost = () => {
    dispatch({
      type: actions.TOGGLESTATE,
      payload: { label: 'addPostDraftState', value: !addPostDraftState },
    });
  };
  const submitForm = (values) => {
    // eslint-disable-next-line
    console.log(values);
  };
  const { addPostDraftState } = useSelector((state) => state.forumReducer);
  const dispatch = useDispatch();

  return (
    <Row justify='start' align='start'>
      <Col lg={20} md={20} sm={20} xs={24} justify='start' align='top'>
        {addPostDraftState && (
          <div>
            <Form
              {...layout}
              name='new-post'
              onFinish={submitForm}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={['post', 'title']}
                label='Title'
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['post', 'description']}
                label='Description'
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['post', 'relatedProjectId']}
                label='Related Project'
                rules={[
                  {
                    type: 'number',
                    min: 0,
                    max: 99,
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item className='new-post-submit'>
                <Buttons
                  type='primary'
                  shape='round'
                  htmlType='submit'
                  icon={<SendOutlined />}
                  content='Add Post'
                  handleClick={toggleNewPost}
                />
              </Form.Item>
            </Form>
          </div>
        )}
      </Col>
    </Row>
  );
}
