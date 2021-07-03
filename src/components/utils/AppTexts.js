import React from 'react';
import { Typography } from 'antd';
const { Text } = Typography;
export default function AppTexts({ className, content = '', ...rest }) {
  return (
    <div className='app-texts'>
      <Text {...rest} className={className}>
        {content}
      </Text>
    </div>
  );
}
