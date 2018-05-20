import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Creators as categoriesCreators } from '../../redux/ducks/Categories';
import { Creators as postsCreators } from '../../redux/ducks/Posts';
import './SiderMenu.css';

const { Sider } = Layout;
const fullLogo = require('../../resources/img/full_logo.png');
const marvelLogo = require('../../resources/img/marvel.svg');
const dcLogo = require('../../resources/img/dc.svg');
const discussLogo = require('../../resources/img/di_logo.svg');
const allPostsLogo = require('../../resources/img/all_logo.png');

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
    filterCategoryRequest: PropTypes.func.isRequired,
    getPostsRequest: PropTypes.func.isRequired,
  }


  async componentDidMount() {
    this.props.getCategoriesRequest();
  }

  handleClick = (e) => {
    if (e.key === 'all') {
      this.props.getPostsRequest();
    } else {
      this.props.filterCategoryRequest(e.key);
    }
    this.props.history.push(`/${e.key}`);
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
    } else if (item.path === 'discussion') {
      return (
        <img src={discussLogo} className="img-categorie" alt="discussion" />
      );
    }
    return (
      <img src={allPostsLogo} className="img-categorie" alt="all" />
    );
  }

  render() {
    const { data } = this.props.categories;
    const allItem = { path: 'all' };
    return (
      <Sider
        trigger={null}
        className="sider-menu-layout"
      >
        <div className="logo">
          <img src={fullLogo} className="full-logo" alt="Logo" />
        </div>
        {
          data ?
            <Menu mode="inline" onSelect={this.handleClick} className="menu" >
              <Menu.Item key="all" className="menu-item">
                {
                  this.categorieItemImage(allItem)
                }
                <span>All posts</span>
              </Menu.Item>
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
            : <span>Loading</span>
        }
      </Sider>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
});

const mapDispatchToProps = (dispatch) => {
  const boundCategoriesCreators = bindActionCreators(categoriesCreators, dispatch);
  const boundPostsCreatos = bindActionCreators(postsCreators, dispatch);
  const allActionProps = { ...boundCategoriesCreators, ...boundPostsCreatos, dispatch };
  return allActionProps;
};

const SiderMenuWithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(SiderMenu));
export { SiderMenuWithRouter as SiderMenu };
