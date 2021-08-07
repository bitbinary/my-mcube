import React from 'react';
import { Tabs, BackTop, PageHeader } from 'antd';
import ViewWrapper from 'components/Forum/contentPage/utils/ViewWrapper';
import { useDispatch } from 'react-redux';
import actions from 'redux/Forum/actions';
import ForumPageHeaderExtras from './HeaderExtras/ForumPageHeaderExtras';
import ForumPageHeaderSelections from './ForumPageHeaderSelections';
import AppTitles from 'components/utils/AppTitles';
import AppTexts from 'components/utils/AppTexts';
import { useHistory } from 'react-router-dom';

const { TabPane } = Tabs;

export default function ForumLayout({ children, activePage }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const onChange = (value) => {
    history.push({
      pathname: `/${value.toLowerCase()}`,
    });
    dispatch({
      type: actions.FORUMPAGECHANGE,
      payload: { forumpage: value },
    });
  };
  let headerTitle = 'Feeds';
  if (activePage === 'search') headerTitle = 'Search';
  if (activePage === 'recommendations') headerTitle = 'Recommendations';
  return (
    <ViewWrapper grid={true}>
      <Tabs onTabClick={onChange} className='forum-tabs' centered type='card'>
        <TabPane
          tab={
            <div className='feed-tabs-name'>
              <AppTexts content='Feeds' />
            </div>
          }
          key='Feeds'
          className='forum-page-content '
        >
          <PageHeader
            className='forum-page-header'
            title={<AppTitles content={headerTitle} />}
            extra={
              <ForumPageHeaderExtras page={activePage ? activePage : 'feeds'} />
            }
          >
            <ForumPageHeaderSelections page='Feeds' />
          </PageHeader>
          {children}
          <BackTop />
        </TabPane>
        <TabPane
          tab={
            <div className='feed-tabs-name'>
              <AppTexts content='Search' />
            </div>
          }
          key='Search'
        >
          <PageHeader
            className='forum-page-header'
            title={<AppTitles content={headerTitle} />}
            extra={
              <ForumPageHeaderExtras
                page={activePage ? activePage : 'search'}
              />
            }
          >
            {/* <ForumPageHeaderSelections page='Search' /> */}
          </PageHeader>
          {children}
          <BackTop />
        </TabPane>
        <TabPane tab='Recommendations' key='Recommendations'>
          <PageHeader
            className='forum-page-header'
            title={<AppTitles content={headerTitle} />}
            extra={
              <ForumPageHeaderExtras
                page={activePage ? activePage : 'recommendations'}
              />
            }
          >
            {/* <ForumPageHeaderSelections page='Recommendations' /> */}
          </PageHeader>
          {children}
          <BackTop />
        </TabPane>
      </Tabs>
    </ViewWrapper>
  );
}
