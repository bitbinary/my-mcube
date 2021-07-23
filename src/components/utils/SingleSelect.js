import React from 'react';
import { Select } from 'antd';
export default function SingleSelect({
  selectOptions,
  handleChange,
  defaultValue,
  ...rest
}) {
  return (
    <Select
      options={selectOptions}
      defaultValue={[defaultValue]}
      onChange={(value) => handleChange(value)}
      {...rest}
    ></Select>
  );
}
