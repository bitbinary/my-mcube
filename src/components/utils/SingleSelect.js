import React from 'react';
import { Select } from 'antd';
const { Option } = Select;
export default function SingleSelect({ selectOptions, handleChange, ...rest }) {
  return (
    <Select labelInValue onChange={(value) => handleChange(value)} {...rest}>
      {selectOptions.map((tag) => (
        <Option key={tag}>{tag}</Option>
      ))}
    </Select>
  );
}
