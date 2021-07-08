import ContentWrapper from 'components/ContentWrapper';
import HomeBanner from 'components/HomePage/HomeBanner';
import HomeFeature from 'components/HomePage/HomeFeature';
import forum from 'images/forum.png';
import search from 'images/search.png';
import recommendation from 'images/recommendation.png';
import chat from 'images/chat.png';
function Home() {
  return (
    <ContentWrapper>
      <HomeBanner
        bannerTitle='Explore Learn Share.'
        bannerDescription='Explore the opportunities that lie ahead, Find out the people who can help you learn, Share knowlegde with other who seek advice'
      ></HomeBanner>

      <HomeFeature
        dividerText="Explore what's inside the box"
        featureImage={forum}
        featureName='Forum'
        featureTitle='Reach out to the community.'
        imageOrientation='right'
        featureDescription='Lorem ipsum dolor sit amet, consectetur adipiscing .'
      ></HomeFeature>
      <HomeFeature
        featureImage={search}
        featureName='Search'
        featureTitle='Find the perfect opportunity'
        featureDescription='Lorem ipsum dolor sit amet, consectetur adipiscing.'
        imageOrientation='left'
      ></HomeFeature>
      <HomeFeature
        featureImage={recommendation}
        featureName='Search'
        featureTitle='We are here to help you with recommendations'
        featureDescription='Lorem ipsum dolor sit amet, consectetur adipiscing.'
        imageOrientation='right'
      ></HomeFeature>
      <HomeFeature
        featureImage={chat}
        featureName='Search'
        featureTitle="Let's talk about it"
        featureDescription='Lorem ipsum dolor sit amet, consectetur adipiscing.'
        imageOrientation='left'
      ></HomeFeature>
    </ContentWrapper>
    // <Menu onClick={handleClick} selectedKeys={[mail]} mode="horizontal">
    //   <Menu.Item key="mail" icon={<MailOutlined />}>
    //     Navigation One
    //   </Menu.Item>
    //   <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
    //     Navigation Two
    //   </Menu.Item>
    //   <SubMenu
    //     key="SubMenu"
    //     icon={<SettingOutlined />}
    //     title="Navigation Three - Submenu"
    //   >
    //     <Menu.ItemGroup title="Item 1">
    //       <Menu.Item key="setting:1">Option 1</Menu.Item>
    //       <Menu.Item key="setting:2">Option 2</Menu.Item>
    //     </Menu.ItemGroup>
    //     <Menu.ItemGroup title="Item 2">
    //       <Menu.Item key="setting:3">Option 3</Menu.Item>
    //       <Menu.Item key="setting:4">Option 4</Menu.Item>
    //     </Menu.ItemGroup>
    //   </SubMenu>
    //   <Menu.Item key="alipay">
    //     <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
    //       Navigation Four - Link
    //     </a>
    //   </Menu.Item>
    // </Menu>
  );
}

export default Home;
