import React, { useEffect, useState } from 'react';
import { List, Avatar, Space, Skeleton, Tooltip, Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import AppTexts from 'components/utils/AppTexts';
import ViewWrapper from 'components/Forum/contentPage/utils/ViewWrapper';
import CommentsWrapper from 'components/utils/CommentsWrapper';
import moment from 'moment';
import { ExpandOutlined } from '@ant-design/icons';
import { getRandomColor } from 'components/tools/colorGenerator';
import UserModal from 'components/utils/UserModal';

const IconText = ({ icon, text, handleClick }) => (
  <Space onClick={handleClick}>
    {'Comments'}
    {React.createElement(icon)}
    {text}
  </Space>
);

export default function Feed({
  index,
  title,
  description,
  lastModified,
  createdAt,
  postOwner,
  commentCount,
  comments,
  postId,
  firstName,
  lastName,
  handleClick,
  project_id,
  dontRenderViewProject = false,
  ...rest
}) {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [idForModal, setIdForModal] = useState(null);

  const toggleComments = () => {
    setCommentsVisible(!commentsVisible);
  };
  const handleMoreDetails = (type, id) => {
    console.log(id);
    setIdForModal(id);
    setIsUserModalVisible(true);
  };
  const handleCancel = () => {
    setIsUserModalVisible(false);
  };
  return (
    <>
      <UserModal
        key={idForModal}
        isModalVisible={isUserModalVisible}
        userID={idForModal}
        handleCancel={handleCancel}
      />
      <ViewWrapper>
        <List className='feed-list-wrapper'>
          <List.Item
            key={title + index}
            actions={[
              <IconText
                key={commentCount}
                icon={MessageOutlined}
                text={commentCount}
                handleClick={toggleComments}
              />,
              !dontRenderViewProject ? (
                <Button onClick={() => handleClick('project_id', project_id)}>
                  <ExpandOutlined key='expand' />
                  View Project
                </Button>
              ) : null,
            ]}
            className='feed-list-item'
          >
            <Skeleton loading={{ ...rest }?.loading} active avatar>
              <List.Item.Meta
                avatar={
                  <>
                    <Avatar
                      style={{ backgroundColor: getRandomColor(title) }}
                      icon={<UserOutlined />}
                      onClick={() => handleMoreDetails('user_id', postOwner)}
                    />
                  </>
                }
                title={
                  <>
                    <AppTexts
                      containerStyles='nomargin'
                      className='small'
                      content={`${firstName || 'Amel '} ${lastName || 'Johny'}`}
                    ></AppTexts>

                    <Tooltip
                      placement='left'
                      title={moment()
                        .subtract(1, 'days')
                        .format('YYYY-MM-DD HH:mm:ss')}
                    >
                      <AppTexts
                        containerStyles='nomargin'
                        className='xsmall text-light feed-time nomargin'
                        content={moment(new Date(createdAt * 1000))
                          .subtract(0, 'days')
                          .fromNow()}
                      />
                    </Tooltip>
                    <AppTexts className='medium' content={title}></AppTexts>
                  </>
                }
                description={<AppTexts content={description} />}
              />
            </Skeleton>
          </List.Item>
          {commentsVisible && (
            <CommentsWrapper
              postId={postId}
              defaultComments={comments ? comments : []}
            />
          )}
        </List>
      </ViewWrapper>
    </>
  );
}
