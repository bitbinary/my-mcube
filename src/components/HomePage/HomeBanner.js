import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import AppTitles from 'components/utils/AppTitles';
import AppTexts from 'components/utils/AppTexts';
import Buttons from 'components/utils/Buttons';
import { useHistory } from 'react-router-dom';
import bannerVideo from 'assets/homeBgVideo.mp4';
import bannerimg from 'banner.jpg';
// import { Container, TextWrapper, Content } from './styles';
export default function HomeBanner({ bannerTitle, bannerDescription }) {
  const history = useHistory();
  const goToDashboard = () => {
    history.push('/dashboard');
  };
  return (
    <Row className='home-page-section' justify='space-between' align='middle'>
      <div className='home-banner-video-container'>
        <video
          playsInline
          autoPlay
          muted
          loop
          poster={bannerimg}
          id='bgvid'
          className='home-banner-video'
        >
          <source src={bannerVideo} type='video/mp4' />
        </video>
        <div className='banner-video-tint'></div>
      </div>
      <Col
        lg={24}
        md={24}
        sm={24}
        xs={24}
        justify='space-between'
        align='middle'
      >
        <Row className='' justify='center' align='middle'>
          <Col
            lg={20}
            md={20}
            sm={24}
            xs={24}
            className='home-banner-container'
          >
            <AppTitles
              className='xlarge xstrong home-landing-title text-white'
              content={bannerTitle}
            />
            <div className='home-page-text-wrapper'>
              <AppTexts
                className='medium  text-white'
                content={bannerDescription}
              />
            </div>
            <Buttons
              handleClick={() => goToDashboard()}
              type='primary'
              size=''
              content='Get Started'
            />
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
