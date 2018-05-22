import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { List, Icon } from 'antd';
import PropTypes from 'prop-types';

class CommentItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      author: PropTypes.string,
      body: PropTypes.string,
      deleted: PropTypes.bool,
      id: PropTypes.string,
      parentDeleted: PropTypes.bool,
      parentId: PropTypes.string,
      timestamp: PropTypes.number,
      voteScore: PropTypes.number,
    }).isRequired,
    voteComment: PropTypes.func.isRequired,
  }

  commentRenderText = item => (
    <div className="div-post-texts">
      <span>{item.body}</span>
    </div>
  )

  commentDetails = item => (
    <div className="div-post-details">
      <span>
        <Icon type="user" className="icon-details" />
        {item.author}
      </span>
      <span>
        <Icon type="clock-circle-o" className="icon-details" />
        {new Date(item.timestamp).toDateString()}
      </span>
    </div>
  )

  commentActions = () => (
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

  commentVoteScore = item => (
    <div className="div-score">
      <Icon type="up-square-o" className="icon-score" onClick={() => this.props.voteComment(item.id, 'upVote')} />
      <span className="text-score">{item.voteScore}</span>
      <Icon type="down-square-o" className="icon-score" onClick={() => this.props.voteComment(item.id, 'downVote')} />
    </div>
  )

  render() {
    const { item } = this.props;
    return (
      <List.Item key={item.title} >
        <div>
          {this.commentRenderText(item)}
        </div>
        <div>
          {this.commentDetails(item)}
        </div>
        <div>
          {this.commentActions(item)}
        </div>
        <div>
          {this.commentVoteScore(item)}
        </div>
      </List.Item>
    );
  }
}


const CommentItemWithRouter = withRouter(CommentItem);
export { CommentItemWithRouter as CommentItem };

