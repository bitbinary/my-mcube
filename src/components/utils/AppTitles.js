import React from 'react';
import { Typography } from 'antd';
const { Text } = Typography;
export default function AppTitles({
  className,
  content = '',
  containerStyles,
  ...rest
}) {
  return (
    <div className='app-titles' style={containerStyles}>
      <Text {...rest} className={className}>
        {content}
      </Text>
    </div>
  );
}
