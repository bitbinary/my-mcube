import React from 'react';
import { Typography } from 'antd';
const { Text } = Typography;
export default function AppTexts({
  className,
  content = '',
  containerStyles = {},
  ...rest
}) {
  return (
    <div className={`app-texts ${containerStyles}`}>
      <Text {...rest} className={className}>
        {content}
      </Text>
    </div>
  );
}
