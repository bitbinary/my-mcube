import React from 'react';
import { Radio } from 'antd';

export default function ForumPageRadios({ handleChange, ...rest }) {
  return (
    <Radio.Group onChange={(e) => handleChange(e.target.value)} {...rest}>
      <Radio.Button value='Feeds'>Feeds</Radio.Button>
      <Radio.Button value='Search'>Search</Radio.Button>
      <Radio.Button value='Recommendations'>Recommendations</Radio.Button>
    </Radio.Group>
  );
}
