import React from 'react';
import { Tabs, BackTop, PageHeader } from 'antd';
import ViewWrapper from 'components/Forum/contentPage/utils/ViewWrapper';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/Forum/actions';
import ForumPageHeaderExtras from './HeaderExtras/ForumPageHeaderExtras';
import ForumPageHeaderSelections from './ForumPageHeaderSelections';
import AppTitles from 'components/utils/AppTitles';
import AppTexts from 'components/utils/AppTexts';
import { useHistory } from 'react-router-dom';
import capitalizeFirstLetter from 'components/tools/capitalize';

const { TabPane } = Tabs;

export default function ForumLayout({ children, activePage }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { forumpage } = useSelector((state) => state.forumReducer);
  const onChange = (value) => {
    history.push({
      pathname: `/${value?.toLowerCase()}`,
    });
    dispatch({
      type: actions.FORUMPAGECHANGE,
      payload: { forumpage: value },
    });
  };
  let page = capitalizeFirstLetter(activePage) || forumpage;
  let headerTitle = page;
  // if (activePage === 'search') headerTitle = 'Search';
  // if (activePage === 'recommendations') headerTitle = 'Recommendations';
  return (
    <ViewWrapper grid={true}>
      <Tabs onTabClick={onChange} className='forum-tabs' centered type='card'>
        <TabPane
          tab={
            <div className='feed-tabs-name'>
              <AppTexts content='Feeds' />
            </div>
          }
          key='feeds'
          className='forum-page-content '
        >
          <PageHeader
            className='forum-page-header'
            title={<AppTitles content={headerTitle} />}
            extra={
              <ForumPageHeaderExtras
                page={activePage ? activePage : forumpage?.toLowerCase()}
              />
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
          key='search'
        >
          <PageHeader
            className='forum-page-header'
            title={<AppTitles content={headerTitle} />}
            extra={
              <ForumPageHeaderExtras
                page={activePage ? activePage : forumpage}
              />
            }
          >
            {/* <ForumPageHeaderSelections page='Search' /> */}
          </PageHeader>
          {children}
          <BackTop />
        </TabPane>

        <TabPane
          tab={
            <div className='feed-tabs-name'>
              <AppTexts content='Recommendations' />
            </div>
          }
          key='recommendations'
        >
          <PageHeader
            className='forum-page-header'
            title={<AppTitles content={headerTitle} />}
            extra={
              <ForumPageHeaderExtras
                page={activePage ? activePage : forumpage?.toLowerCase()}
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
