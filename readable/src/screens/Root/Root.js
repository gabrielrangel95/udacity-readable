import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Creators as categoriesCreators } from '../../redux/ducks/Categories';
import './Root.css';


const {
  Header,
  Content,
  Footer,
  Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

class Root extends Component {
  static propTypes = {
    categoriesRequest: PropTypes.func.isRequired,
  }

  state = {
    collapsed: false,
  };

  async componentDidMount() {
    console.log(this.props);
    await this.props.categoriesRequest();
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  loading: state.categories.categories,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(categoriesCreators, dispatch);

const RootWithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
export { RootWithRouter as Root };
