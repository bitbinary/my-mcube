import React from 'react';
import Buttons from 'components/utils/Buttons';
import { PlusOutlined } from '@ant-design/icons';
export default function ForumPhFeedsExtras() {
  return (
    <Buttons
      type='primary'
      shape='round'
      icon={<PlusOutlined />}
      content='Add Post'
    />
  );
}
