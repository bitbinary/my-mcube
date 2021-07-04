import React from 'react';
import { Select } from 'antd';
const { Option } = Select;
export default function MultipleSelects({
  selectOptions,
  handleChange,
  ...rest
}) {
  return (
    <Select
      mode='multiple'
      style={{ width: '100%' }}
      onChange={(value) => handleChange(value)}
      allowClear
      maxTagCount='responsive'
      {...rest}
    >
      {selectOptions.map((tag) => (
        <Option key={tag}>{tag}</Option>
      ))}
    </Select>
  );
}
