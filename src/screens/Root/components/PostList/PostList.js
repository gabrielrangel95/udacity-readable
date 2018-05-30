import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { List, message, Spin } from 'antd';
import PropTypes from 'prop-types';
import { PostItem, PostHeader } from '../../../../components';

import { Creators as postsCreators } from '../../../../redux/ducks/Posts';
import './PostList.css';

class PostList extends Component {
  static propTypes = {
    getPostsRequest: PropTypes.func.isRequired,
    filterCategoryRequest: PropTypes.func.isRequired,
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
    voteRequest: PropTypes.func.isRequired,
    currentList: PropTypes.string.isRequired,
    deleteRequest: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        category: PropTypes.string,
      }),
    }).isRequired,
  }

  componentDidMount() {
    const { category } = this.props.match.params;
    if (!category) {
      this.props.getPostsRequest();
    } else {
      this.props.filterCategoryRequest(category);
    }
  }

  votePost = (postId, option) => {
    let updateType = 'allPosts';
    const category = this.props.currentList;
    if (category === 'all') {
      updateType = 'allPosts';
    } else {
      updateType = 'category';
    }
    this.props.voteRequest(postId, option, updateType, category);
  }

  deletePost = (postId) => {
    let updateType = 'allPosts';
    const category = this.props.currentList;
    if (category === 'all') {
      updateType = 'allPosts';
    } else {
      updateType = 'category';
    }
    this.props.deleteRequest(postId, updateType, category);
    message.success('Post deleted!');
  }


  render() {
    const { data, loading } = this.props.posts;
    if (loading) {
      return (
        <div className="div-loading">
          <Spin size="large" />
        </div>
      );
    }
    return (
      <div>
        <PostHeader />
        <List
          itemLayout="horizontal"
          dataSource={data}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          renderItem={item => (
            <PostItem
              item={item}
              votePost={this.votePost}
              deletePost={this.deletePost}
            />
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

