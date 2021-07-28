import React from 'react';
import { Skeleton, Card, Avatar } from 'antd';
import { ExpandOutlined, UserOutlined } from '@ant-design/icons';
import { getRandomColor } from 'components/tools/colorGenerator';
import AppTexts from 'components/utils/AppTexts';
import Buttons from 'components/utils/Buttons';

const { Meta } = Card;
export default function UserCard({
  city,
  country,
  first_name,
  last_name,
  links,
  pic,
  score,
  state,
  title,
  user_id,
  zipcode,
  loading,
  handleClick,
}) {
  return (
    <div className='user-card-wrapper'>
      <Card
        style={{ width: 300, marginTop: 16 }}
        actions={[
          null,
          <Buttons
            handleClick={() => handleClick('user_id', user_id)}
            content={
              <>
                <ExpandOutlined key='expand' /> View Profile
              </>
            }
          />,
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={
              <Avatar
                icon={<UserOutlined />}
                style={{ backgroundColor: getRandomColor() }}
              />
            }
            title={`${first_name} ${last_name}`}
            description={title}
            style={{ textAlign: 'left' }}
          />
        </Skeleton>
      </Card>
    </div>
  );
}
// data.city
// data.country
// data.first_name
// data.last_name
// data.links
// data.pic
// data.score
// data.state
// data.title
// data.user_id
// data.zipcode
