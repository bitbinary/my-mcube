import React from 'react';
import { Row, Col } from 'antd';
export default function ViewWrapper({ children, grid = false }) {
  return (
    <>
      <Row
        lg={24}
        md={24}
        sm={24}
        xs={24}
        justify='center'
        className='view-wrapper'
      >
        <Col
          lg={24}
          md={24}
          sm={24}
          xs={24}
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
