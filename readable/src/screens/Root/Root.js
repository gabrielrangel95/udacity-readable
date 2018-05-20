import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Button, Select } from 'antd';
import './Root.css';
import { PostList, NewPostModal } from './components';
import { Creators as postsCreators } from '../../redux/ducks/Posts';

const { Option } = Select;

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

  handleSelectChange = (value) => {
    console.log(`selected ${value}`);
    this.props.sortPostRequest(value);
  }

  render() {
    return (
      <div>
        <h1>All Posts</h1>
        <div className="div-buttons">
          <Select className="div-select-filters" onChange={this.handleSelectChange} placeholder="Filter">
            <Option value="voteScore">voteScore</Option>
            <Option value="timestamp">Date</Option>
          </Select>
          <Button onClick={() => this.openCreateModal()} className="div-button-new-post">New Post</Button>
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

const mapStateToProps = state => ({
  posts: state.posts,
});


const mapDispatchToProps = dispatch =>
  bindActionCreators(postsCreators, dispatch);

const RootWithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
export { RootWithRouter as Root };

