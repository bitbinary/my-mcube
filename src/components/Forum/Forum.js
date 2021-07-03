import React, { useState } from 'react';
import { Row, Col, PageHeader } from 'antd';
// import { Radio } from 'antd';
import Buttons from 'components/utils/Buttons';
import { PlusOutlined } from '@ant-design/icons';
import ForumPageRadios from './ForumPageRadios';
import ForumPost from './ForumPost';
export default function Forum() {
  const [activePage, setActivePage] = useState('Feeds');
  const onChange = (value) => {
    setActivePage(value);
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
              className='Forum-page-header'
              title={activePage}
              extra={[
                <Buttons
                  type='primary'
                  shape='round'
                  icon={<PlusOutlined />}
                  content='Add Post'
                />,
              ]}
            />
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
                <ForumPost />
                <ForumPost />
                <ForumPost />
                <ForumPost />
                <ForumPost />
                <ForumPost />
                <ForumPost />
                <ForumPost />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
