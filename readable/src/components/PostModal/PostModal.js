import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Form, Input, Radio, message } from 'antd';
import { Creators as postsCreators } from '../../redux/ducks/Posts';


const FormItem = Form.Item;


class PostModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    form: PropTypes.shape({
      validateFieldsAndScroll: PropTypes.func,
      resetFields: PropTypes.func,
    }).isRequired,
    categories: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        path: PropTypes.string,
      })),
      loading: PropTypes.bool,
    }).isRequired,
    createPostRequest: PropTypes.func.isRequired,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const post = {
          author: values.author,
          body: values.body,
          category: values.category,
          title: values.title,
        };
        try {
          await this.props.createPostRequest(post);
          message.success('Post created succesfuly');
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
      visible, onCancel, form, categories,
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Create a new Post"
        okText="Create"
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
            })(<Input />)}
          </FormItem>
          <FormItem className="collection-create-form_last-form-item" label="Category">
            {getFieldDecorator('category', {
              rules: [{ required: true, message: 'Please select one category!' }],
            })(<Radio.Group>
              {
                categories.data.map(item => (
                  <Radio key={item.path} value={item.path} >{item.name}</Radio>
                ))
              }
               </Radio.Group> )}
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

export { PostModalForm as PostModal };
