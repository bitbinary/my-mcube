import React, { useEffect, useState } from 'react';
import { Empty, Select } from 'antd';
import { getRequest } from 'Config/axiosClient';
import searcher from 'components/tools/searcher';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/Messages/actions';

export default function MessageSearchSelect({ setActive }) {
  const [data, setdata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();
  const { contacts, allUsers, tempContact } = useSelector(
    (state) => state.messageReducer,
  );
  // eslint-disable-next-line
  useEffect(() => {
    const response = getRequest('user/name_list/');
    response.then((response) => {
      let data = response.data.data.map((element) => ({
        label: `${element.first_name} ${element.last_name}`,
        key: element.user_id,
        value: `${element.first_name} ${element.last_name}`,
      }));
      // eslint-disable-next-line
      let existingUsers = [...contacts, ...tempContact].map(
        (contact) => contact.user_id,
      );

      let nonExiting = data.filter((data) => !existingUsers.includes(data.key));
      setdata(nonExiting);
      setFilteredData(nonExiting);
    });
    return () => {};
    // eslint-disable-next-line
  }, [contacts, tempContact]);
  const handleSearch = (value) => {
    let searchResult = searcher(value, data, ['label']);
    setFilteredData(searchResult);
  };
  function handleChange(value, key, label) {
    let selectedUser = allUsers.filter((user) => user.user_id === key.key);
    dispatch({
      type: actions.FORCEUPDATE,
      payload: {
        item: 'tempContact',
        value: [...tempContact, ...selectedUser],
      },
    });
    setActive(selectedUser[0]);
    console.log(selectedUser);
  }

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
      placeholder={'Search user by name'}
      style={{ marginTop: '10px', minWidth: '200px' }}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      options={filteredData}
      onChange={(value, key, label) => handleChange(value, key, label)}
      notFoundContent={<Empty />}
    ></Select>
  );
}
