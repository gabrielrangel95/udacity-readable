import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { List, Icon } from 'antd';
import PropTypes from 'prop-types';

import { Creators as postsCreators } from '../../../../redux/ducks/Posts';
import './PostList.css';

const marvelLogo = require('../../../../resources/img/marvel.svg');
const dcLogo = require('../../../../resources/img/dc.svg');
const discussLogo = require('../../../../resources/img/di_logo.svg');


class PostList extends Component {
  static propTypes = {
    getPostsRequest: PropTypes.func.isRequired,
    posts: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        author: PropTypes.string,
        body: PropTypes.string,
        category: PropTypes.string,
        commentCount: PropTypes.number,
        deleted: PropTypes.bool,
        id: PropTypes.string,
        timestamp: PropTypes.number,
        title: PropTypes.string,
        voteScore: PropTypes.number,
      })),
      loading: PropTypes.bool,
    }).isRequired,
  }

  componentDidMount() {
    this.props.getPostsRequest();
  }


  categorieItemImage = (item) => {
    if (item.category === 'dc') {
      return (
        <div className="div-categorie">
          <img src={dcLogo} className="image-categorie" alt="dc" />
          <span className="text-categorie">{item.category}</span>
        </div>
      );
    } else if (item.category === 'marvel') {
      return (
        <div className="div-categorie">
          <img src={marvelLogo} className="image-categorie" alt="marvelLogo" />
          <span className="text-categorie">{item.category}</span>
        </div>
      );
    }
    return (
      <div className="div-categorie">
        <img src={discussLogo} className="image-categorie" alt="discussLogo" />
        <span className="text-categorie">{item.category}</span>
      </div>
    );
  }

  categorieRenderText = item => (
    <div className="div-post-texts">
      <span className="text-item-title">{item.title}</span>
      <span>{item.body}</span>
    </div>
  )

  categorieDetails = item => (
    <div className="div-post-details">
      <span>
        <Icon type="user" className="icon-details" />
        {item.author}
      </span>
      <span>
        <Icon type="message" className="icon-details" />
        {item.commentCount}
      </span>
      <span>
        <Icon type="clock-circle-o" className="icon-details" />
        {new Date(item.timestamp).toDateString()}
      </span>
    </div>
  )

  categorieActions = () => (
    <div className="div-post-actions">
      <span>
        <Icon type="edit" className="icon-details" />
        Edit
      </span>
      <span>
        <Icon type="delete" className="icon-details" />
        Delete
      </span>
    </div>
  )

  categorieVoteScore = item => (
    <div className="div-score">
      <Icon type="up-square-o" className="icon-score" />
      <span className="text-score">{item.voteScore}</span>
      <Icon type="down-square-o" className="icon-score" />
    </div>
  )

  render() {
    const { data } = this.props.posts;
    return (
      <div>
        <div>
          <List.Item>
            <div className="title-categorie">
              <span>Category</span>
            </div>
            <div className="title-description">
              <span>Description</span>
            </div>
            <div className="title-details">
              <span>Details</span>
            </div>
            <div className="title-score">
              <span>Score</span>
            </div>
            <div className="title-actions">
              <span>Actions</span>
            </div>
          </List.Item>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.title} >
              <div>
                {this.categorieItemImage(item)}
              </div>
              <div>
                {this.categorieRenderText(item)}
              </div>
              <div>
                {this.categorieDetails(item)}
              </div>
              <div>
                {this.categorieVoteScore(item)}
              </div>
              <div>
                {this.categorieActions(item)}
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(postsCreators, dispatch);

const PostListWithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));
export { PostListWithRouter as PostList };

