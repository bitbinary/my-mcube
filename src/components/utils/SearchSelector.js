import React, { useEffect, useState } from 'react';
import { Empty, Select } from 'antd';
import { postRequest } from 'Config/axiosClient';
import searcher from 'components/tools/searcher';

export default function SearchSelector({ handleChange }) {
  const [data, setdata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const response = postRequest('project/list');
    response.then((response) => {
      let data = response.data.data.map((element) => ({
        label: element.project_name,
        key: element.project_id,
        value: element.project_name,
      }));
      console.log(data);
      setdata(data);
      setFilteredData(data);
    });
    return () => {};
  }, []);
  const handleSearch = (value) => {
    let searchResult = searcher(value, data, ['label']);
    console.log(searchResult);
    setFilteredData(searchResult);
  };

  //   <Select
  //     labelInValue
  //     placeholder='Select Project'
  //     filterOption={false}
  //     onSearch={() => null}
  //     style={}
  //     notFoundContent={false ? <Spin size='small' /> : null}
  //     onChange={(value, key) => handleChange(value.value, key.key)}
  //     options={data}
  //   />

  return (
    <Select
      showSearch
      placeholder={'Search Project by Title'}
      style={{ marginTop: '10px', width: '150px' }}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      options={filteredData}
      onChange={(value, key) => handleChange(value.value, key.key)}
      notFoundContent={<Empty />}
    ></Select>
  );
}
