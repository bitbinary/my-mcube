import React, { useEffect, useState } from 'react';
import { Col, Empty, Row, Select } from 'antd';
import { getRequest } from 'Config/axiosClient';
import searcher from 'components/tools/searcher';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/Profile/actions';
import Buttons from 'components/utils/Buttons';
export default function MultipleSelects({
  selectOptions,
  handleChange,
  userId,
  addSkills,
  ...rest
}) {
  const [data, setdata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [defaultValue, setDefaultValue] = useState([]);
  const { userSkillList, skillList } = useSelector(
    (state) => state.profileReducer,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const response = getRequest('skill');
    response.then((response) => {
      let data = Object.entries(response?.data?.data?.skill_name).map(
        ([index, element]) => ({
          label: element,
          key: index,
          value: element,
        }),
      );
      setdata(data);
      setFilteredData(data);
    });
    dispatch({
      type: actions.GETUSERSKILLS,
      payload: {
        user_id: userId,
      },
    });
    return () => {};
  }, []);

  useEffect(() => {
    let newData = [...filteredData];
    newData = newData.filter((element) =>
      userSkillList.includes(element.value),
    );
    newData = newData.map((element) => {
      return element.value;
    });
    console.log(newData);
    setDefaultValue(newData);
    return () => {};
  }, [userSkillList]);

  useEffect(() => {
    console.log(skillList);
    let data = skillList.map((element, index) => ({
      label: element,
      key: index,
      value: element,
    }));
    setdata(data);
    setFilteredData(data);

    return () => {};
  }, [skillList]);

  const handleSearch = (value) => {
    let searchResult = searcher(value, data, ['label']);
    setFilteredData(searchResult);
  };
  console.log(defaultValue);
  return (
    <>
      <Row>
        <Col sm={24}>
          <Select
            key={filteredData?.length + defaultValue?.length}
            showSearch
            mode='multiple'
            placeholder='Search skill by skill name'
            style={{ minWidth: '200px', width: '100%' }}
            onChange={(value) => handleChange(value)}
            allowClear
            defaultValue={defaultValue}
            options={filteredData}
            {...rest}
          ></Select>
        </Col>
        <Col sm={24} justify='end' align='end'>
          <Buttons
            handleClick={addSkills}
            type='primary'
            shape='round'
            content='Update skills'
          />
        </Col>
      </Row>
    </>
  );
}
