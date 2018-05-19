import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Creators as categoriesCreators } from '../../redux/ducks/Categories';
import './SiderMenu.css';

const { Sider } = Layout;
const fullLogo = require('../../resources/img/full_logo.svg');
const shortLogo = require('../../resources/img/shor_logo.svg');

class Categorie {
  name: string,
  path: string,
};

class SiderMenu extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    collapsed: PropTypes.bool.isRequired,
    categoriesRequest: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(Categorie).isRequired,
  }

  async componentDidMount() {
    await this.props.categoriesRequest();
    console.log(this.props);
  }

  handleClick = (e) => {
    this.props.history.push(`/${e.key}`);
  }

  render() {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        className="sider-menu-layout"
      >
        <div className="logo">
          {
            this.props.collapsed ? (
              <img src={shortLogo} className="short-logo" alt="Logo" />
            ) : (
              <img src={fullLogo} className="full-logo" alt="Logo" />
            )
          }
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['avisos']} onClick={this.handleClick}>
          <Menu.Item key="avisos">
            <Icon type="notification" />
            <span>Avisos</span>
          </Menu.Item>
          <Menu.Item key="minha-empresa">
            <Icon type="home" />
            <span>Minha Empresa</span>
          </Menu.Item>
          {
            this.props.categories.length > 0 && (
              this.props.categories.map(categorie => (
                <h2>{categorie.name}</h2>
              ))
            )
          }
        </Menu>
      </Sider>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  loading: state.categories.categories,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(categoriesCreators, dispatch);

const SiderMenuWithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(SiderMenu));
export { SiderMenuWithRouter as SiderMenu };
