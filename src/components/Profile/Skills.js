import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Tag } from 'antd';
import SectionDivider from '../utils/SectionDivider';
import { Input, Tooltip } from 'antd';
import { InfoCircleOutlined, TagsOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Search } = Input;

function Skills() {
  const [tags, setTags] = useState([]);
  const [tagsList, setTagsList] = useState(null);

  useEffect(() => {
    let tagsList1 = null;
    tagsList1 = tags.map(function (tag) {
      return <Tag color='rgb(43, 43, 183)'>{tag}</Tag>;
    });
    setTagsList(tagsList1);
  }, [tags]);

  function handleChange(value) {
    //console.log(`selected ${value}`);
    setTags(value);
  }

  return (
    <>
      <Row gutter={16}>
        <Col span={18}>
          <Select
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='select skills'
            size='small'
            defaultValue={['Java', 'Data Science']}
            onChange={handleChange}
          >
            <Option value='Java' label='Java'>
              <div className='demo-option-label-item'>Java</div>
            </Option>
            <Option value='Data Science' label='Data Science'>
              <div className='demo-option-label-item'>Data Science</div>
            </Option>
            <Option value='AI' label='AI'>
              <div className='demo-option-label-item'>AI</div>
            </Option>
            <Option value='Python' label='Python'>
              <div className='demo-option-label-item'>Python</div>
            </Option>
          </Select>
        </Col>
        <Col span={6}>
          <Search
            placeholder='Add new tag'
            enterButton='Add Tag'
            size='small'
            prefix={<TagsOutlined className='site-form-item-icon' />}
            suffix={
              <Tooltip title='Only Add new tag if already not present!'>
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
            }
          />
        </Col>
      </Row>
      <SectionDivider />
      <div>
        {/* <Tag color='rgb(43, 43, 183)'>Java</Tag>
        <Tag color='rgb(43, 43, 183)'>Data Science</Tag> */}
        {tagsList}
      </div>
    </>
  );
}

export default Skills;
