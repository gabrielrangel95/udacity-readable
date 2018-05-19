import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Creators as categoriesCreators } from '../../redux/ducks/Categories';
import './SiderMenu.css';

const { Sider } = Layout;
const fullLogo = require('../../resources/img/full_logo.png');
const marvelLogo = require('../../resources/img/marvel.svg');
const dcLogo = require('../../resources/img/dc.svg');
const discussLogo = require('../../resources/img/di_logo.svg');

class SiderMenu extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    getCategoriesRequest: PropTypes.func.isRequired,
    categories: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        path: PropTypes.string,
      })),
      loading: PropTypes.bool,
    }).isRequired,
  }


  async componentDidMount() {
    this.props.getCategoriesRequest();
    console.log(this.props);
  }

  handleClick = (e) => {
    const path = e.key;
    console.log(path);
    this.props.history.push(`${path}`);
  }

  categorieItemImage = (item) => {
    if (item.path === 'dc') {
      return (
        <img src={dcLogo} className="img-categorie" alt="dc" />
      );
    } else if (item.path === 'marvel') {
      return (
        <img src={marvelLogo} className="img-categorie" alt="marvel" />
      );
    }
    return (
      <img src={discussLogo} className="img-categorie" alt="marvel" />
    );
  }

  render() {
    const { data } = this.props.categories;
    return (
      <Sider
        trigger={null}
        className="sider-menu-layout"
      >
        <div className="logo">
          <img src={fullLogo} className="full-logo" alt="Logo" />
        </div>
        <Menu mode="inline" defaultSelectedKeys={['avisos']} onClick={this.handleClick} className="menu" >
          {
            data.map(item => (
              <Menu.Item key={item.path} className="menu-item">
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
