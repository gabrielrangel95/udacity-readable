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
      setFieldsValue: PropTypes.func,
    }).isRequired,
    createRequest: PropTypes.func.isRequired,
    updateRequest: PropTypes.func.isRequired,
    modalTitle: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    comment: PropTypes.shape({
      author: PropTypes.string,
      body: PropTypes.string,
      deleted: PropTypes.bool,
      id: PropTypes.string,
      parentDeleted: PropTypes.bool,
      parentId: PropTypes.string,
      timestamp: PropTypes.number,
      voteScore: PropTypes.number,
    }),

  };

  static defaultProps = {
    comment: null,
  }

  componentDidMount() {
    const { comment } = this.props;
    if (comment) {
      this.props.form.setFieldsValue({
        body: comment.body,
        author: comment.author,
      });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        try {
          if (this.props.modalTitle === 'Edit') {
            const comment = {
              body: values.body,
              parentId: this.props.parentId,
              id: this.props.comment.id,
            };
            await this.props.updateRequest(comment);
            message.success('Comment updated succesfuly');
          } else {
            const comment = {
              author: values.author,
              body: values.body,
              parentId: this.props.parentId,
            };
            await this.props.createRequest(comment);
            message.success('Comment created succesfuly');
          }
          this.props.onCancel();
          this.props.form.resetFields();
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
    const editing = modalTitle === 'Edit';
    return (
      <Modal
        visible={visible}
        title={`${modalTitle} comment`}
        okText={modalTitle}
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
            })(<Input disabled={editing} />)}
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
