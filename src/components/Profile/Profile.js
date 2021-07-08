import { Row, Col, Tag, Button } from 'antd';
import AppTitles from 'components/utils/AppTitles';
import AppTabs from './AppTabs.js';
import { HomeTwoTone } from '@ant-design/icons';
import { Avatar } from 'antd';
import {
  UserOutlined,
  WechatOutlined,
  MailOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';

function Profile() {
  return (
    <>
      <div>
        <Row
          style={{
            backgroundColor: 'rgb(154 160 164);',
            height: '140px',
          }}
        >
          <Col span={4}>
            <div style={{ display: 'flex', margin: '5px', padding: '5px' }}>
              <Avatar
                style={{
                  backgroundColor: 'rgb(154 160 164)',
                }}
                size={185}
                icon={<UserOutlined />}
              />
            </div>
          </Col>

          <Col span={15}>
            <div>
              <AppTitles
                className='large'
                content='Navya Vashisht'
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'rgb(24 144 255)',
                }}
              />
              <AppTitles
                className='small'
                content='Master of Information Technology - UNSW'
                style={{ color: 'rgb(0 0 0)' }}
              />
              <div>
                <Tag color='magenta'>Data Science</Tag>
                <Tag color='cyan'>Java</Tag>
                <Tag color='lime'>AI</Tag>
                <Tag color='orange'>Data Science</Tag>
              </div>
            </div>
          </Col>
          <Col span={3}>
            <span>
              <AppTitles
                content={
                  <HomeTwoTone style={{ fontSize: '25px' }} size='30px' />
                }
                style={{ fontWeight: 'bold' }}
              />
            </span>
            <AppTitles
              size='small'
              content='Location: UNSW, Kensington, Sydney, NSW'
            />
            <Button
              type='dashed'
              shape='round'
              icon={<WechatOutlined />}
              size={20}
              style={{ margin: '4px' }}
            />
            <Button
              type='dashed'
              shape='round'
              icon={<MailOutlined />}
              size={20}
              style={{ margin: '4px' }}
            />
            <Button
              type='dashed'
              shape='round'
              icon={<LinkedinOutlined />}
              size={20}
              style={{ margin: '4px' }}
            />
          </Col>
        </Row>
      </div>
      <Row>
        <AppTabs />
      </Row>
    </>
  );
}

export default Profile;
