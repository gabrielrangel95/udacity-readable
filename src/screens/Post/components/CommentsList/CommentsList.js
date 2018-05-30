import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { List } from 'antd';
import PropTypes from 'prop-types';
import { Creators as commentsCreators } from '../../../../redux/ducks/Comments';
import './CommentsList.css';
import { CommentItem, CommentModal } from '../';

class CommentsList extends Component {
  static propTypes = {
    getCommentsRequest: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
    comments: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        author: PropTypes.string,
        body: PropTypes.string,
        deleted: PropTypes.bool,
        id: PropTypes.string,
        parentDeleted: PropTypes.bool,
        parentId: PropTypes.string,
        timestamp: PropTypes.number,
        voteScore: PropTypes.number,
      })),
      loading: PropTypes.bool,
    }).isRequired,
    voteRequest: PropTypes.func.isRequired,
    deleteRequest: PropTypes.func.isRequired,
    updateRequest: PropTypes.func.isRequired,
    selectedRequest: PropTypes.func.isRequired,
  }

  state = {
    modalVisible: false,
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getCommentsRequest(id);
  }

  voteComment = (commentId, type) => {
    const { id } = this.props.match.params;
    const parentId = id;
    this.props.voteRequest(commentId, type, parentId);
  }

  deleteComment = (commentId) => {
    const { id } = this.props.match.params;
    const parentId = id;
    this.props.deleteRequest(commentId, parentId);
  }

  updateComment = (comment) => {
    this.props.updateRequest(comment);
  }

  selectedRequest = (comment) => {
    this.props.selectedRequest(comment);
    this.setState({ modalVisible: true });
  }

  closeModal = () => {
    this.setState({ modalVisible: false });
    this.props.selectedRequest(null);
  }

  render() {
    const { data, selected } = this.props.comments;
    return (
      <div>
        <h1>Comments</h1>
       { selected &&
        <CommentModal
          visible={this.state.modalVisible}
          onCancel={this.closeModal}
          modalTitle="Edit"
          parentId={selected.parentId}
          comment={selected}
        />
        }
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
            <CommentItem
              item={item}
              voteComment={this.voteComment}
              deleteComment={this.deleteComment}
              updateComment={this.updateComment}
              selectedRequest={this.selectedRequest}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.comments,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(commentsCreators, dispatch);

const CommentsListConnect = withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentsList));
export { CommentsListConnect as CommentsList };

