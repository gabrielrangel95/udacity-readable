import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { List } from 'antd';
import PropTypes from 'prop-types';
import { PostItem } from '../../../../components';

import { Creators as postsCreators } from '../../../../redux/ducks/Posts';
import './PostList.css';

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
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 10,
          }}
          renderItem={item => (
            <PostItem
              item={item}
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

