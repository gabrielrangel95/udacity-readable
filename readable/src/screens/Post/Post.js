import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './Post.css';
import { Creators as postsCreators } from '../../redux/ducks/Posts';
import { PostItem, PostHeader } from '../../components';
import { CommentsList, CommentModal } from './components';

class Post extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
    selected: PropTypes.shape(),
    getSinglePostRequest: PropTypes.func.isRequired,
    voteRequest: PropTypes.func.isRequired,
  }

  static defaultProps = {
    selected: null,
  }

  state = {
    modalVisible: false,
    madalTitle: 'New Comment',
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getSinglePostRequest(id);
  }

  votePost = (postId, option) => {
    const updateType = 'single';
    this.props.voteRequest(postId, option, updateType);
  }

  openCreateModal = () => {
    this.setState({ modalVisible: true, madalTitle: 'New Comment' });
  }

  closeModal = () => {
    this.setState({ modalVisible: false });
  }


  render() {
    const { selected } = this.props;
    const { id } = this.props.match.params;
    return (
      <div>
        <h1>Post</h1>
        <div className="div-button-add-comment">
          <Button type="danger" onClick={() => this.openCreateModal()}>New Comment</Button>
        </div>
        {
          selected && (
            <div>
              <CommentModal
                visible={this.state.modalVisible}
                modalTitle={this.state.madalTitle}
                onCancel={this.closeModal}
                parentId={id}
              />
              <div className="div-post-selected ">
                <PostHeader />
                <PostItem
                  item={selected}
                  votePost={this.votePost}
                />
              </div>
              <div className="div-coment-list">
                <CommentsList />
              </div>
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

