import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './Post.css';
import { Creators as postsCreators } from '../../redux/ducks/Posts';
import { PostItem, PostHeader } from '../../components';

class Post extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
    selected: PropTypes.shape(),
    getSinglePostRequest: PropTypes.func.isRequired,
  }

  static defaultProps = {
    selected: null,
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getSinglePostRequest(id);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    const { selected } = this.props;
    return (
      <div>
        <h1>Post</h1>
        {
          selected && (
            <div className="div-post-selected ">
              <PostHeader />
              <PostItem
                item={selected}
              />
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selected: state.posts.selected,
});


const mapDispatchToProps = dispatch =>
  bindActionCreators(postsCreators, dispatch);

const PostWithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
export { PostWithRouter as Post };

