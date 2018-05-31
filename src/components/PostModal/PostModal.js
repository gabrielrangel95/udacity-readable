import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Modal, Form, Input, Radio, message } from 'antd';
import { Creators as postsCreators } from '../../redux/ducks/Posts';


const FormItem = Form.Item;


class PostModal extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    form: PropTypes.shape({
      validateFieldsAndScroll: PropTypes.func,
      resetFields: PropTypes.func,
      setFieldsValue: PropTypes.func,
    }).isRequired,
    categories: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        path: PropTypes.string,
      })),
      loading: PropTypes.bool,
    }).isRequired,
    createPostRequest: PropTypes.func.isRequired,
    updatePostRequest: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    post: PropTypes.shape({
      author: PropTypes.string,
      body: PropTypes.string,
      category: PropTypes.string,
      commentCount: PropTypes.number,
      deleted: PropTypes.bool,
      id: PropTypes.string,
      timestamp: PropTypes.number,
      title: PropTypes.string,
      voteScore: PropTypes.number,
    }),
  };

  static defaultProps = {
    post: null,
  }


  componentDidMount() {
    const { post } = this.props;
    console.log(this.props)
    if (post) {
      this.props.form.setFieldsValue({
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category,
      });
    }
  }

  handleSubmit = async (e) => {
    const currentList = this.props.match.params.category;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        try {
          if (this.props.title === 'Edit') {
            const post = {
              id: this.props.post.id,
              body: values.body,
              title: values.title,
              category: this.props.post.category,
            };
            await this.props.updatePostRequest(post, currentList);
            message.success('Post updated succesfuly');
          } else {
            const post = {
              author: values.author,
              body: values.body,
              category: values.category,
              title: values.title,
            };
            await this.props.createPostRequest(post, currentList);
            message.success('Post created succesfuly');
          }
          this.props.onCancel();
          this.props.form.resetFields();
        } catch (error) {
          message.failure(`Error on creating post - ${error}`);
        }
      }
    });
  }

  render() {
    const {
      visible, onCancel, form, categories, title,
    } = this.props;
    const { getFieldDecorator } = form;
    const editing = title === 'Edit';
    return (
      <Modal
        visible={visible}
        title={`${title} Post`}
        okText={title}
        onCancel={() => onCancel()}
        onOk={this.handleSubmit}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Post Title">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input the title of post!' }],
            })(<Input />)}
          </FormItem>
          <FormItem label="Body">
            {getFieldDecorator('body', {
              rules: [{ required: true, message: 'Please input the body of post!' }],
            })(<Input />)}
          </FormItem>
          <FormItem label="Author">
            {getFieldDecorator('author', {
              rules: [{ required: true, message: 'Please input your name!' }],
            })(<Input disabled={editing} />)}
          </FormItem>
          <FormItem className="collection-create-form_last-form-item" label="Category">
            {getFieldDecorator('category', {
              rules: [{ required: true, message: 'Please select one category!' }],
            })(<Radio.Group disabled={editing}>
              {
                categories.data.map(item => (
                  <Radio key={item.path} value={item.path} >{item.name}</Radio>
                ))
              }
            </Radio.Group>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(postsCreators, dispatch);

const PostModalConnected = connect(mapStateToProps, mapDispatchToProps)(PostModal);
const PostModalForm = Form.create()(PostModalConnected);
const PostModalWithRouter = withRouter(PostModalForm)
export { PostModalWithRouter as PostModal };
