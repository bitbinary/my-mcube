import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/Forum/actions';
import {
  Row,
  Col,
  Tag,
  Form,
  Input,
  InputNumber,
  List,
  Avatar,
  Space,
  Skeleton,
  Tooltip,
  Divider,
} from 'antd';
import Buttons from 'components/utils/Buttons';
import { SendOutlined, CloseCircleOutlined } from '@ant-design/icons';
import SearchSelector from 'components/utils/SearchSelector';
import { UserOutlined } from '@ant-design/icons';
import AppTexts from 'components/utils/AppTexts';
import ViewWrapper from 'components/Forum/contentPage/utils/ViewWrapper';
import moment from 'moment';
import AppTitles from 'components/utils/AppTitles';
const { TextArea } = Input;
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

function ForumPageHeaderAddPost({ ...rest }) {
  const toggleNewPost = () => {
    dispatch({
      type: actions.TOGGLESTATE,
      payload: { label: 'addPostDraftState', value: !addPostDraftState },
    });
  };
  const [content, setcontent] = useState('');
  const [title, settitle] = useState('');
  const [projectId, setprojectId] = useState('');
  const { addPostDraftState, addPostLoading } = useSelector(
    (state) => state.forumReducer,
  );
  const { userId } = useSelector((state) => state.authenticateReducer);
  const dispatch = useDispatch();
  const submitPost = () => {
    dispatch({
      type: actions.TOGGLESTATE,
      payload: { label: 'addPostLoading', value: true },
    });

    dispatch({
      type: actions.ADDPOST,
      payload: {
        content: content,
        user_id: Number(userId),
        title: title,
        project_id: Number(projectId.split('_')[1]),
      },
    });
  };
  const pojectTitle = (values) => {
    // eslint-disable-next-line
    settitle(values);
  };
  const pojectDescription = (values) => {
    // eslint-disable-next-line
    setcontent(values);
  };
  const projectSelection = (value, key) => {
    // eslint-disable-next-line
    setprojectId(key);
  };
  const defaultText =
    'The Career Ready Mentoring Program connects UNSW students from their second year of study onwards with established industry professionals, providing students with a significant opportunity to focus on career development during the transition from study to work.';
  return addPostDraftState ? (
    <ViewWrapper>
      <AppTitles
        className='strong'
        content='New Post'
        containerStyles={{ textAlign: 'left' }}
      />
      <List className='feed-list-wrapper'>
        <List.Item
          key='new post'
          className='feed-list-item'
          actions={[
            <Buttons
              type='primary'
              shape='round'
              icon={<CloseCircleOutlined />}
              content='Close'
              handleClick={toggleNewPost}
            />,
            <Buttons
              type='primary'
              shape='round'
              loading={addPostLoading}
              htmlType='submit'
              icon={<SendOutlined />}
              content='Add Post'
              handleClick={() => submitPost()}
            />,
          ]}
        >
          <Skeleton loading={false} active avatar>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={
                <>
                  <Input
                    placeholder='Your Post Title goes here'
                    onChange={(e) => {
                      pojectTitle(e.target.value);
                    }}
                  />
                  <Divider />
                  {/* <Tooltip
                    title={moment()
                      .subtract(1, 'days')
                      .format('YYYY-MM-DD HH:mm:ss')}
                  >
                    <AppTexts
                      content={moment().subtract(1, 'seconds').fromNow()}
                    />
                  </Tooltip> */}
                </>
              }
              description={
                <>
                  <TextArea
                    placeholder='Your post description goes here'
                    rows={4}
                    onChange={(e) => {
                      pojectDescription(e.target.value);
                    }}
                  />
                  <Divider />
                  <SearchSelector
                    handleChange={(values, key) =>
                      projectSelection(values, key)
                    }
                  />
                </>
              }
            />
          </Skeleton>
        </List.Item>
      </List>
    </ViewWrapper>
  ) : null;
}
