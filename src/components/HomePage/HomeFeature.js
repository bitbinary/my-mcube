import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import AppTitles from 'components/utils/AppTitles';
import AppTexts from 'components/utils/AppTexts';
// import Buttons from 'components/utils/Buttons';
import SectionDivider from 'components/utils/SectionDivider';
export default function HomeFeature({
  dividerText = '',
  featureImage,
  featureName,
  imageOrientation = 'right',
  featureTitle,
  featureDescription,
}) {
  let imagePosition = imageOrientation === 'left' ? 0 : 1;
  return (
    <Row className='home-page-container' justify='space-between' align='middle'>
      {dividerText ? (
        <SectionDivider
          content={
            <AppTexts
              className='xlarge feature-divider'
              content={dividerText}
            />
          }
          orientation='center'
        />
      ) : null}

      <Col
        lg={12}
        md={12}
        sm={24}
        xs={24}
        justify='space-between'
        align='middle'
        order={1 - imagePosition}
      >
        <Row className='' justify='center' align='middle'>
          <Col lg={24} md={24} sm={24} xs={24}>
            <AppTitles className='large strong' content={featureTitle} />
            <div className='home-page-text-wrapper'>
              <AppTexts className='medium' content={featureDescription} />
              {/* <Buttons type='ghost' size='' content='Get Started' /> */}
            </div>
          </Col>
        </Row>
      </Col>

      <Col
        lg={12}
        md={12}
        sm={24}
        xs={24}
        justify='space-between'
        align='middle'
        order={imagePosition}
      >
        <Row
          className='home-feature-image-wrapper'
          justify='center'
          align='middle'
        >
          <Col lg={16} md={24} sm={24} xs={24}>
            <img
              src={featureImage}
              className='home-feature-image'
              alt={`Features images of ${featureName}`}
              key={featureName}
            />
            {/* <AppTitles className='large' content='Landing Page Hero Heading' /> */}
            {/* <div className='home-page-text-wrapper'>
              <AppTexts
                className='medium'
                content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              />
              <Buttons type='ghost' size='' content='Get Started' />
            </div> */}
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
HomeFeature.propTypes = {
  onEnterChange: PropTypes.func,
};
