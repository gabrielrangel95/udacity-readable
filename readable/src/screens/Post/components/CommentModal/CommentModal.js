import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Form, Input, message } from 'antd';
import { Creators as commentCreators } from '../../../../redux/ducks/Comments';


const FormItem = Form.Item;


class CommentModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    form: PropTypes.shape({
      validateFieldsAndScroll: PropTypes.func,
    }).isRequired,
    createRequest: PropTypes.func.isRequired,
    modalTitle: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const comment = {
          author: values.author,
          body: values.body,
          parentId: this.props.parentId,
        };
        try {
          await this.props.createRequest(comment);
          message.success('Comment created succesfuly');
          this.props.onCancel();
        } catch (error) {
          message.failure(`Error on creating comment - ${error}`);
        }
      }
    });
  }

  render() {
    const {
      visible, onCancel, form, modalTitle,
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title={modalTitle}
        okText="Comment"
        onCancel={() => onCancel()}
        onOk={this.handleSubmit}
      >
        <Form onSubmit={this.handleSubmit}>
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
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(commentCreators, dispatch);

const ModalConnected = connect(mapStateToProps, mapDispatchToProps)(CommentModal);
const ModalForm = Form.create()(ModalConnected);

export { ModalForm as CommentModal };
