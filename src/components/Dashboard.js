import { Layout } from 'antd';
import ContentWrapper from './Navigation/ContentWrapper';
import NavBar from './Navigation/NavBar';

const { Header, Footer, Content } = Layout;
function Dashboard() {
  return (
    <div className='container'>
      <Layout>
        <Header>
          <NavBar></NavBar>
        </Header>
        <Layout className='App-header'>
          {/* <Sider className='primary-color'>Sider</Sider> */}
          <Content style={{ padding: '50px' }}>
            <ContentWrapper></ContentWrapper>
          </Content>
        </Layout>
        <Footer>SaaS-Term2_group3 Copyrights Reserved :P</Footer>
      </Layout>
    </div>
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

export default Dashboard;
