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
const marvelLogo = require('../../resources/img/avengers_logo.svg');
const dcLogo = require('../../resources/img/dc_comics_logo.svg');

class SiderMenu extends Component {
  // static propTypes = {
  //   history: PropTypes.shape({
  //     push: PropTypes.func.isRequired,
  //   }).isRequired,
  //   collapsed: PropTypes.bool.isRequired,
  //   categoriesRequest: PropTypes.func.isRequired,
  //   categories: PropTypes.arrayOf(Categorie).isRequired,
  // }
  state = {
    categories: [],
  }

  async componentDidMount() {
    this.props.getCategoriesRequest();
    console.log(this.props);
  }

  async componentWillReceiveProps(nextprops) {
    console.log(nextprops);
    const { categories } = nextprops.categories.data;
    await this.setState({ categories });
  }

  handleClick = (e) => {
    this.props.history.push(`/${e.key}`);
  }

  categorieItemImage = (item) => {
    if (item.name === 'dc') {
      return (
        <img src={dcLogo} className="img-categorie" alt="dc" />
      );
    } else if (item.name === 'marvel') {
      return (
        <img src={marvelLogo} className="img-categorie" alt="marvel" />
      );
    }
    return (
      <Icon type="message" />
    );
  }

  render() {
    const { data } = this.props.categories;
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
          {
            data.map(item => (
              <Menu.Item key={item.path}>
                {
                  this.categorieItemImage(item)
                }
                <span>{item.name}</span>
              </Menu.Item>
            ))
          }

        </Menu>
      </Sider>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(categoriesCreators, dispatch);

const SiderMenuWithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(SiderMenu));
export { SiderMenuWithRouter as SiderMenu };
