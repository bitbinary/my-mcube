import React from 'react';
import { Row, Col } from 'antd';
export default function ViewWrapper({ children, grid = false }) {
  return (
    <>
      <Row
        lg={grid ? 24 : 24}
        md={grid ? 20 : 24}
        sm={24}
        xs={24}
        justify='center'
        className='view-wrapper'
      >
        <Col
          lg={grid ? 22 : 24}
          md={grid ? 20 : 24}
          sm={24}
          xs={24}
          span={12}
          justify='space-between'
          align='middle'
          className='view-container'
        >
          {children}
        </Col>
      </Row>
    </>
  );
}
