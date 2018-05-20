import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import './Root.css';
import { PostList, NewPostModal } from './components';

class Root extends Component {
  state = {
    createModalVisible: false,
  }

  onModalCancel = () => {
    this.setState({ createModalVisible: false });
  }

  openCreateModal = () => {
    this.setState({ createModalVisible: true });
  }

  render() {
    return (
      <div>
        <h1>All Posts</h1>
        <div className="div-button-add-post">
          <Button onClick={() => this.openCreateModal()}>New Post</Button>
        </div>
        <PostList />
        <NewPostModal
          visible={this.state.createModalVisible}
          onCancel={this.onModalCancel}
        />
      </div>
    );
  }
}

const RootWithRouter = withRouter(Root);
export { RootWithRouter as Root };

