import React from 'react';
import { Row, Col, PageHeader } from 'antd';
// import { Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/Forum/actions';
import ForumPageRadios from './ForumPageRadios';
import ForumPageHeaderExtras from './ForumPageHeaderExtras';
import ForumPageHeaderSelections from './ForumPageHeaderSelections';
export default function ForumLayout({ children }) {
  const { forumpage } = useSelector((state) => state.forumReducer);
  const dispatch = useDispatch();
  const onChange = (value) => {
    dispatch({
      type: actions.FORUMPAGECHANGE,
      payload: { forumpage: value },
    });
  };

  return (
    <Row className='forum-wrapper' justify='center' align='start'>
      <Col
        lg={20}
        md={20}
        sm={20}
        xs={24}
        justify='space-between'
        align='middle'
        className='forum-container'
      >
        <ForumPageRadios
          className='forum-pageselect-radio'
          defaultValue='Feeds'
          buttonStyle='solid'
          handleChange={(value) => onChange(value)}
        />

        <Row className='forum-page-wrapper' justify='center' align='start'>
          <Col
            lg={24}
            md={24}
            sm={24}
            xs={24}
            justify='space-between'
            align='start'
            className='forum-page-container'
          >
            <PageHeader
              className='forum-page-header'
              title={forumpage}
              extra={<ForumPageHeaderExtras />}
            >
              <ForumPageHeaderSelections page={forumpage} />
            </PageHeader>
            <Row
              className='forum-page-posts-wrapper'
              justify='center'
              align='start'
            >
              <Col
                lg={24}
                md={24}
                sm={24}
                xs={24}
                justify='space-between'
                align='start'
                className='forum-page-posts-container'
              >
                {children}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
