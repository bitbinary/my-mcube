import React from 'react';
import { Typography } from 'antd';
const { Text } = Typography;
export default function AppTitles({ className, content = '', ...rest }) {
  return (
    <div className='app-titles'>
      <Text {...rest} className={className}>
        {content}
      </Text>
    </div>
  );
}
