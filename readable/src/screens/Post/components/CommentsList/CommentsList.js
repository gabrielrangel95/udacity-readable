import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { List } from 'antd';
import PropTypes from 'prop-types';
import { Creators as commentsCreators } from '../../../../redux/ducks/Comments';
import './CommentsList.css';
import { CommentItem } from '../';

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
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getCommentsRequest(id);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  voteComment = (commentId, type) => {
    const { id } = this.props.match.params;
    const parentId = id;
    this.props.voteRequest(commentId, type, parentId);
  }

  render() {
    const { data } = this.props.comments;
    return (
      <div>
        <h1>Comments</h1>
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

