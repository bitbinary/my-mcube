import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import AppTitles from 'components/utils/AppTitles';
import AppTexts from 'components/utils/AppTexts';
import useWindowSize from 'components/tools/useWindowSize';
// import Buttons from 'components/utils/Buttons';
import SectionDivider from 'components/utils/SectionDivider';
export default function HomeFeature({
  // eslint-disable-next-line
  dividerTexts = [],
  featureImage,
  featureName,
  imageOrientation = 'right',
  featureTitle,
  featureDescription,
}) {
  const size = useWindowSize();
  let imagePosition = 0;
  if (size.width > 768) {
    imagePosition = imageOrientation === 'left' ? 0 : 1;
  }
  return (
    <Row className='home-page-section' justify='space-between' align='middle'>
      {dividerTexts ? (
        <SectionDivider
          content={
            <>
              {dividerTexts.map((dividerText) => (
                <Col
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  align='center'
                  justify='center'
                >
                  <AppTexts
                    className='xlarge feature-divider'
                    containerStyles={'divider-text'}
                    content={dividerText}
                  />
                </Col>
              ))}
            </>
          }
          orientation='center'
        />
      ) : null}
      <Col
        lg={8}
        md={8}
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
        lg={16}
        md={16}
        sm={24}
        xs={24}
        justify='space-between'
        align='middle'
        order={imagePosition}
        className='home-feature-sections'
      >
        <Row
          className='home-feature-image-wrapper'
          justify='center'
          align='middle'
        >
          <Col lg={16} md={24} sm={12} xs={24}>
            <img
              src={featureImage}
              className='home-feature-image'
              alt={`Features images of ${featureName}`}
              key={featureName}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
HomeFeature.propTypes = {
  onEnterChange: PropTypes.func,
};
