import React from 'react';
import { Divider } from 'antd';

export default function SectionDivider({ content, ...rest }) {
  console.log(rest);
  return <Divider {...rest}>{content}</Divider>;
}
