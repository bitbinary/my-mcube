import React from 'react';
import { Divider } from 'antd';

export default function SectionDivider({ content, ...rest }) {
  return <Divider {...rest}>{content}</Divider>;
}
