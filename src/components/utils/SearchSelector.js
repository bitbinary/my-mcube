import React, { useEffect, useState } from 'react';
import { Select, Spin } from 'antd';
import { postRequest } from 'Config/axiosClient';

export default function SearchSelector({ handleChange }) {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const response = postRequest('project/list');
    response.then((response) => {
      let data = response.data.data.map((element) => ({
        label: element.project_name,
        key: element.project_id,
        value: element.project_name,
      }));
      setdata(data);
    });
    return () => {};
  }, []);
  //   const handleChange = (value) => {
  //     console.log(value);
  //   };
  return (
    <Select
      labelInValue
      placeholder='Select Project'
      filterOption={false}
      onSearch={() => null}
      style={{ marginTop: '10px', width: '150px' }}
      notFoundContent={false ? <Spin size='small' /> : null}
      onChange={(value) => handleChange(value)}
      options={data}
    />
  );
}
