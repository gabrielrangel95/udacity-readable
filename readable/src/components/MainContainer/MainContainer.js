import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import './MainContainer.css';
import { SiderMenu } from '../';

const { Header, Content } = Layout;


class MainContainer extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const {children} = this.props;
    return (
      <Layout className="layout">
        <SiderMenu
          collapsed={this.state.collapsed}
        />
        <Layout>
          <Header className="header-style">
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content className="main-container">
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}


const MainContainerWithRouter = withRouter(MainContainer);
export { MainContainerWithRouter as MainContainer };
