import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { List, Icon, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import { PostModal } from '../';
import './PostItem.css';

const marvelLogo = require('../../resources/img/marvel.svg');
const dcLogo = require('../../resources/img/dc.svg');
const discussLogo = require('../../resources/img/di_logo.svg');


class PostItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      author: PropTypes.string,
      body: PropTypes.string,
      category: PropTypes.string,
      commentCount: PropTypes.number,
      deleted: PropTypes.bool,
      id: PropTypes.string,
      timestamp: PropTypes.number,
      title: PropTypes.string,
      voteScore: PropTypes.number,
    }).isRequired,
    votePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
  }

  state = {
    modalVisible: false,
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
      <a href={`/post/${item.id}`} className="text-item-title">{item.title}</a>
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
        <a href={`/post/${item.id}`} >
          <Icon type="message" className="icon-details" />
        </a>
        {item.commentCount}
      </span>
      <span>
        <Icon type="clock-circle-o" className="icon-details" />
        {new Date(item.timestamp).toDateString()}
      </span>
    </div>
  )

  categorieActions = item => (
    <div className="div-post-actions">
      <span>
        <Popconfirm title="Are you sure edit this post?" onConfirm={() => this.openModal()} onCancel={() => { }} okText="Yes" cancelText="No">
          <a href="/">
            <Icon type="edit" className="icon-details" />
            Edit
          </a>
        </Popconfirm>
      </span>
      <span>
        <Popconfirm title="Are you sure delete this post?" onConfirm={() => this.props.deletePost(item.id)} onCancel={() => { }} okText="Yes" cancelText="No">
          <a href="/">
            <Icon type="delete" className="icon-details" />
            Delete
          </a>
        </Popconfirm>
      </span>
    </div>
  )

  categorieVoteScore = item => (
    <div className="div-score">
      <Icon type="up-square-o" className="icon-score" onClick={() => this.props.votePost(item.id, 'upVote')} />
      <span className="text-score">{item.voteScore}</span>
      <Icon type="down-square-o" className="icon-score" onClick={() => this.props.votePost(item.id, 'downVote')} />
    </div>
  )

  closeModal = () => {
    this.setState({ modalVisible: false });
  }

  openModal = () => {
    this.setState({ modalVisible: true });
  }

  render() {
    const { item } = this.props;
    return (
      <div>
        <PostModal
          visible={this.state.modalVisible}
          onCancel={this.closeModal}
          title="Edit"
          post={item}
        />
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
      </div>
    );
  }
}


const PostItemWithRouter = withRouter(PostItem);
export { PostItemWithRouter as PostItem };

