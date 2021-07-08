import { Layout, BackTop } from 'antd';
import NavBarPublic from '../Navigation/NavBarPublic';

const { Header, Content, Footer } = Layout;
function PublicLayout({ children }) {
  return (
    <div className='container'>
      <Layout>
        <Header>
          <NavBarPublic></NavBarPublic>
        </Header>
        <Layout className='App-header'>
          {/* <Sider className='primary-color'>Sider</Sider> */}
          <Content style={{}}>{children}</Content>
          <Footer>
            SaaS-Term2_group3 Copyrights Reserved :P <BackTop />
          </Footer>
        </Layout>
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

export default PublicLayout;
