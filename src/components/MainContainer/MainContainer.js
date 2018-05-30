import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import './MainContainer.css';
import { SiderMenu } from '../';

const { Content } = Layout;


class MainContainer extends Component {
  render() {
    const { children } = this.props;
    return (
      <Layout className="layout">
        <SiderMenu />
        <Layout className="main-layout">
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
