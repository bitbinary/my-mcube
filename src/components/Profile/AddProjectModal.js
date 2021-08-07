import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/Profile/actions';
import TextArea from 'antd/lib/input/TextArea';
import { ExclamationCircleOutlined } from '@ant-design/icons';

function AddProjectModal({
  isAddProjectModalVisible,
  handleAddProjectModalCancel,
}) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { Option } = Select;
  const { confirm } = Modal;
  const { skillList, skillErrorMessage, skillDisplayError } = useSelector(
    (state) => state.profileReducer,
  );
  const { userId } = useSelector((state) => state.authenticateReducer);
  const [skillListComponent, setSkillListComponent] = useState(null);
  const [projectStartDate, setProjectStartDate] = useState(null);
  const [projectEndDate, setProjectEndDate] = useState(null);

  useEffect(() => {
    if (skillList?.length === 0) {
      dispatch({
        type: actions.GETSKILLS,
      });
    }
  }, []);

  useEffect(() => {
    let SkillListComponent1 = null;
    SkillListComponent1 = skillList.map(function (skill) {
      return (
        <Option value={skill}>
          <div className='demo-option-label-item'>{skill}</div>
        </Option>
      );
    });
    setSkillListComponent(SkillListComponent1);
  }, [skillList]);

  const getStartDate = (date, dateString) => {
    var newdate = new Date(dateString);
    var epochDate = newdate.getTime();
    setProjectStartDate(epochDate);
  };

  const getEndDate = (date, dateString) => {
    var newdate = new Date(dateString);
    var epochDate = newdate.getTime();
    setProjectEndDate(epochDate);
  };

  const showConfirm = (values) => {
    confirm({
      title: 'Do you want to create the project?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        form
          .validateFields()
          .then((values) => {
            dispatch({
              type: actions.CREATEUSERPROJECT,
              payload: {
                user_id: userId,
                project_details: {
                  project_title: values.title,
                  project_desc: values.description,
                  project_status: values.status,
                  project_req: values.requirements,
                  project_start_date: String(projectStartDate),
                  project_end_date: String(projectEndDate),
                  project_tags: values.required_skills,
                  project_location: values.location,
                },
              },
            });
            dispatch({
              type: actions.GETUSERPROJECTS,
              payload: {
                user_id: userId,
              },
            });
            handleAddProjectModalCancel();
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      },
    });
  };

  return (
    <Modal
      title='Add Project Modal'
      visible={isAddProjectModalVisible}
      width='60%'
      onCancel={handleAddProjectModalCancel}
      footer={[
        <Button
          key='submit'
          type='primary'
          loading={false}
          htmlType='submit'
          onClick={() => {
            form.validateFields().then((values) => showConfirm(values));
          }}
        >
          Create Project
        </Button>,
        <Button
          type='danger'
          loading={false}
          onClick={handleAddProjectModalCancel}
        >
          Close
        </Button>,
      ]}
    >
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout='horizontal'
      >
        <Form.Item
          name='title'
          label='Title'
          rules={[
            {
              required: true,
              message: 'Please input project title!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='description'
          label='Description'
          rules={[
            {
              required: true,
              message: 'Please input project description!',
            },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          name='status'
          label='Status'
          rules={[
            {
              required: true,
              message: 'Please select project status!',
            },
          ]}
        >
          <Select>
            <Select.Option value='to start'>Start</Select.Option>
            <Select.Option value='ongoing'>In Progress</Select.Option>
            <Select.Option value='completed'>Complete</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='requirements'
          label='Requirements'
          rules={[
            {
              required: true,
              message: 'Please input project requirements!',
            },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          name='start_date'
          label='Start Date'
          rules={[
            {
              required: true,
              message: 'Please input project start date!',
            },
          ]}
        >
          <DatePicker onChange={getStartDate} />
        </Form.Item>
        <Form.Item
          name='end_date'
          label='End Date'
          rules={[
            {
              required: true,
              message: 'Please input project end date!',
            },
          ]}
        >
          <DatePicker onChange={getEndDate} />
        </Form.Item>
        {skillList?.length > 0 && (
          <Form.Item
            name='required_skills'
            label='Required Skills'
            rules={[
              {
                required: true,
                message: 'Please add required skills!',
              },
            ]}
          >
            <Select
              mode='multiple'
              style={{ width: '80%' }}
              placeholder='select skills'
            >
              {skillListComponent}
            </Select>
          </Form.Item>
        )}
        <Form.Item
          name='location'
          label='Location'
          rules={[
            {
              required: true,
              message: 'Please input project location!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddProjectModal;
