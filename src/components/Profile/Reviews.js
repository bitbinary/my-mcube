import React, { useState, useEffect } from 'react';
import { Row, Col, List, Avatar, Button, Skeleton } from 'antd';
import reqwest from 'reqwest';
import { UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import SectionDivider from '../utils/SectionDivider';

function Reviews() {
  const count = 3;
  const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

  const [initLoading, setInitLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  let [data, setData] = useState([]);
  let [list, setList] = useState([]);

  useEffect(() => {
    getData((res) => {
      setInitLoading(false);
      data = data.concat(res.results);
      setData(data);
      setList(data);
    });
  }, []);

  /*useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [data]);*/

  const getData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  };

  const onLoadMore = () => {
    setIsLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({ loading: true, name: {} })),
      ),
    );

    getData((res) => {
      data = data.concat(res.results);
      setData(data);
      setList(data);
      setIsLoading(false);
    });
  };

  const loadMore =
    !initLoading && !isLoading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>load more</Button>
      </div>
    ) : null;

  let content =
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently. We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).';

  return (
    <>
      <List
        className='demo-loadmore-list'
        style={{ 'min-height': '350px' }}
        loading={initLoading}
        itemLayout='horizontal'
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <Skeleton avatar title={false} loading={item.loading} active>
            <Row>
              <Col span={22}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: 'rgb(154 160 164)',
                      }}
                      size={50}
                      icon={<UserOutlined />}
                    />
                  }
                  title={<a href='https://ant.design'>{item.name.last}</a>}
                  description='Ant Design, a design language for background applications, is refined by Ant UED Team'
                />
                <div style={{ marginTop: '2px', marginBottom: '30px' }}>
                  {content}
                </div>
              </Col>
              <Col span={2}>
                <Button
                  type='primary'
                  shape='circle'
                  icon={<EditOutlined />}
                  size={20}
                  style={{ margin: '2px' }}
                />
                <Button
                  type='primary'
                  shape='circle'
                  icon={<DeleteOutlined />}
                  size={20}
                  style={{ margin: '2px' }}
                />
              </Col>
            </Row>
            <SectionDivider />
          </Skeleton>
        )}
      />
    </>
  );
}

export default Reviews;
