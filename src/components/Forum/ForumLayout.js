import React from 'react';
import { Tabs, BackTop, PageHeader } from 'antd';
import ViewWrapper from 'components/Forum/contentPage/utils/ViewWrapper';
import { useDispatch } from 'react-redux';
import actions from 'redux/Forum/actions';
import ForumPageHeaderExtras from './HeaderExtras/ForumPageHeaderExtras';
import ForumPageHeaderSelections from './ForumPageHeaderSelections';
const { TabPane } = Tabs;

export default function ForumLayout({ children }) {
  const dispatch = useDispatch();
  const onChange = (value) => {
    dispatch({
      type: actions.FORUMPAGECHANGE,
      payload: { forumpage: value },
    });
  };

  return (
    <ViewWrapper grid={true}>
      <Tabs onTabClick={onChange} centered type='card'>
        <TabPane tab='Feeds' key='Feeds' className='forum-page-content '>
          <PageHeader
            className='forum-page-header'
            title='Feeds'
            extra={<ForumPageHeaderExtras page='Feeds' />}
          >
            <ForumPageHeaderSelections page='Feeds' />
          </PageHeader>
          {children}
          <BackTop />
        </TabPane>
        <TabPane tab='Search' key='Search'>
          <PageHeader
            className='forum-page-header'
            title='Search'
            extra={<ForumPageHeaderExtras page='Search' />}
          >
            <ForumPageHeaderSelections page='Search' />
          </PageHeader>
          {children}
          <BackTop />
        </TabPane>
        <TabPane tab='Recommendations' key='Recommendations'>
          <PageHeader
            className='forum-page-header'
            title='Recommendations'
            extra={<ForumPageHeaderExtras page='Recommendations' />}
          >
            <ForumPageHeaderSelections page='Recommendations' />
          </PageHeader>
          {children}
          <BackTop />
        </TabPane>
      </Tabs>
    </ViewWrapper>
  );
}
