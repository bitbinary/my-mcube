import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import AppTitles from 'components/utils/AppTitles';
import AppTexts from 'components/utils/AppTexts';
import Buttons from 'components/utils/Buttons';
// import { Container, TextWrapper, Content } from './styles';
export default function HomeBanner() {
  return (
    <Row className='home-page-container' justify='space-between' align='middle'>
      <Col
        lg={24}
        md={24}
        sm={24}
        xs={24}
        justify='space-between'
        align='middle'
      >
        <Row className='' justify='center' align='middle'>
          <Col lg={16} md={16} sm={24} xs={24}>
            <AppTitles
              className='xlarge strong home-landing-title'
              content='Landing Page Hero Heading'
            />
            <div className='home-page-text-wrapper'>
              <AppTexts
                className='medium'
                content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              />
              <Buttons type='primary' size='' content='Get Started' />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
    // <Container>
    //   <h6>{t(title)}</h6>
    //   <TextWrapper>
    //     <Content>{t(content)}</Content>
    //   </TextWrapper>
    // </Container>
  );
}
HomeBanner.propTypes = {
  onEnterChange: PropTypes.func,
};
