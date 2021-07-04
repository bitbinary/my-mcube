import React from 'react';
import Buttons from 'components/utils/Buttons';
import { PlusOutlined } from '@ant-design/icons';
export default function ForumPgRecomExtras() {
  return <Buttons shape='round' icon={<PlusOutlined />} content='Add Post' />;
}
